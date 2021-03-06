import { MapGL, ZoomToBoundsControl } from '@hyperobjekt/mapgl';
import '@hyperobjekt/mapgl/dist/style.css';
import { useCallback, useRef, useState } from 'react';
import { MapControls, MapLegend, MapTooltip } from './components';
import { MapSectionStyles } from './Map.style';
import {
  useMapSources,
  useChoroplethMapLayers,
  useBubbleMapLayers,
  useDashboardStore,
  useLocationData,
} from '@hyperobjekt/react-dashboard';
import { GeolocateControl, NavigationControl } from 'react-map-gl';
import { useToggleLocation } from '@hyperobjekt/react-dashboard';
import { animated, config, useSpring } from '@react-spring/web';
import { useScrollTrigger } from '@mui/material';
import clsx from 'clsx';
import BackToMapButton from './components/BackToMapButton';
import ViewMoreButton from './components/ViewMoreButton';
import MapCards from './components/MapCards';
import { getTileData } from '../Data';
import StateOutlineLayer from './components/StateOutlineLayer';
import SelectedLocationsLayer from './components/SelectedLocationsLayer';
import CityLabelsLayer, { CITY_LABELS } from './components/CityLabelsLayer';
import useDataMode from '../hooks/useDataMode';
import useHasSelectedLocations from '../hooks/useHasSelectedLocations';
import useMobileVhFix from '../hooks/useMobileVhFix';
import useMaxLocations from '../hooks/useMaxLocations';
import MapAutoSwitch from './components/MapAutoSwitch';
import { useAutoSwitch } from '../hooks';
import _ from 'lodash';
import { ENVIRONMENT, trackEvent } from '../utils';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

// bounds for continental US
const US_BOUNDS = [
  [-130, 24],
  [-65, 50],
];

const ALASKA_BOUNDS = [
  [-175, 51.21],
  [-135, 71.37],
];

const HAWAII_BOUNDS = [
  [-160, 18.910361],
  [-154, 23.402123],
];

const MAP_STYLE = 'mapbox://styles/hyperobjekt/cl007w05t000414oaog417i9s';

const trackSelectionEvent = ({ data, locations, dataMode }) => {
  const locationSelected = `${data.properties.n}, ${data.properties.pl || ''}`;
  const evData = {
    locationFindingMethod: 'map',
    locationSelectedLevel: data.properties.region,
    datasetType: dataMode,
  };
  trackEvent('locationSelection', { ...evData, locationSelected });

  if (locations.length > 0) {
    const [ev, dimension] =
      locations.length === 1
        ? ['secondaryLocationSelection', 'secondaryLocation']
        : ['tertiaryLocationSelection', 'tertiaryLocation'];

    trackEvent(ev, { ...evData, [dimension]: locationSelected });
  }
};

const Map = (props) => {
  const [loaded, setLoaded] = useState(false);

  const rootEl = useRef();
  const ref = useRef();

  const embed = useDashboardStore((state) => state.embed);

  const hasLocations = useHasSelectedLocations();
  const maxLocations = useMaxLocations();
  const locations = useLocationData(maxLocations);

  const [dataMode] = useDataMode();
  const sources = useMapSources();
  const choroplethLayers = useChoroplethMapLayers();
  // drop interactivity from bubble layers
  const bubbleLayers = useBubbleMapLayers()?.map((layer) => ({
    ...layer,
    // TODO: fix bug in react-dashboard that is not adding proper `beforeId`
    beforeId: 'waterway-label',
    interactive: false,
  }));
  const [autoSwitch] = useAutoSwitch();
  // callback function to add / remove a selected location
  const toggleSelected = useToggleLocation();
  // true if the page is scrolled
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    // FF on Android can't scroll up to 0 (min is ~.3px), so gets stuck w/ threshold = 0
    threshold: 1,
  });
  useMobileVhFix(rootEl);
  // fly to feature on click if it's not selected and toggle "selected" status
  const handleClick = useCallback(
    ({ features, lngLat }) => {
      if (embed) return;

      const partFeature = features?.[0];
      const geoid = partFeature?.properties?.GEOID;
      if (!partFeature || !geoid || !lngLat) return;
      // retrieve all data from tilesets for the GEOID
      getTileData({ geoid, lngLat, dataMode }).then((data) => {
        // TODO: should we be using name? see county below Pennington ND
        !!data?.properties?.n && toggleSelected(data);

        !!data?.properties?.n && trackSelectionEvent({ data, locations, dataMode });
      });
    },
    [toggleSelected, dataMode],
  );

  const handleZoom = useCallback(
    _.debounce(() => {
      const zoomLevel = _.get(sources, [0, 'id'], '').split('-')[0];
      trackEvent('zoomUse', { zoomLevel });
    }, 1000),
    [sources],
  );

  // blur map when the page is scrolled
  const springProps = useSpring({
    backdropFilter: isScrolled ? 'blur(4px)' : 'blur(0px)',
    opacity: isScrolled ? 1 : 0,
    background: 'rgba(255,255,255,0.666)',
    config: config.slow,
  });
  return (
    <MapSectionStyles
      ref={rootEl}
      className={clsx('map__root', 'fill-vh', {
        'map__root--locations': hasLocations,
        'map__root--embed': embed,
      })}
    >
      <animated.div
        className={clsx('map__scroll-overlay', {
          'map__scroll-overlay--active': isScrolled,
        })}
        style={springProps}
      >
        <BackToMapButton />
        <div id="target-scorecards" style={{ position: 'absolute', bottom: 180 }} />
      </animated.div>
      <div className="map__content">
        <div className="map__fixed-wrapper">
          <MapGL
            ref={ref}
            onZoom={handleZoom}
            mapboxAccessToken={ENVIRONMENT.MB_TOKEN}
            bounds={US_BOUNDS}
            mapStyle={MAP_STYLE}
            sources={sources}
            layers={[...choroplethLayers, ...bubbleLayers]}
            onClick={handleClick}
            onLoad={setLoaded}
            {...props}
          >
            <GeolocateControl />
            <NavigationControl showCompass={false} />
            {!embed && (
              <>
                <ZoomToBoundsControl
                  bounds={US_BOUNDS}
                  title="Zoom to continental US"
                  // TODO: add aria-label to ZoomToBoundsControl props
                  aria-label="Zoom to continental US"
                  className="map__bounds map__bounds--us"
                />
                <ZoomToBoundsControl
                  bounds={ALASKA_BOUNDS}
                  title="Zoom to Alaska"
                  aria-label="Zoom to Alaska"
                  className="map__bounds map__bounds--ak"
                />
                <ZoomToBoundsControl
                  bounds={HAWAII_BOUNDS}
                  title="Zoom to Hawaii"
                  aria-label="Zoom to Hawaii"
                  className="map__bounds map__bounds--hi"
                />
              </>
            )}
            <StateOutlineLayer />
            {!embed && <SelectedLocationsLayer />}
            <CityLabelsLayer />
          </MapGL>
          <MapLegend />
        </div>
        {!loaded && (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              display: 'flex',
              zIndex: 10,
            }}
          >
            <CircularProgress sx={{ m: 'auto' }} />
          </Box>
        )}
        {!embed && <MapCards />}
        {!embed && <MapControls />}
        <MapTooltip />
        {!embed && <ViewMoreButton show={!isScrolled} className="map__view-more" />}
      </div>
      {!embed && autoSwitch && <MapAutoSwitch />}
    </MapSectionStyles>
  );
};

export default Map;
