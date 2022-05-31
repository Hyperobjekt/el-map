import { MapGL, ZoomToBoundsControl } from "@hyperobjekt/mapgl";
import "@hyperobjekt/mapgl/dist/style.css";
import { useCallback, useRef } from "react";
import { MapControls, MapLegend, MapTooltip } from "./components";
import { MapSectionStyles } from "./Map.style";
import {
  useMapSources,
  useChoroplethMapLayers,
  useBubbleMapLayers,
  useDashboardStore,
} from "@hyperobjekt/react-dashboard";
import { GeolocateControl, NavigationControl } from "react-map-gl";
import { useToggleLocation } from "@hyperobjekt/react-dashboard";
import { animated, config, useSpring } from "@react-spring/web";
import { useScrollTrigger } from "@mui/material";
import clsx from "clsx";
import BackToMapButton from "./components/BackToMapButton";
import ViewMoreButton from "./components/ViewMoreButton";
import MapCards from "./components/MapCards";
import { getTileData } from "../Data";
import StateOutlineLayer from "./components/StateOutlineLayer";
import SelectedLocationsLayer from "./components/SelectedLocationsLayer";
import CityLabelsLayer, { CITY_LABELS } from "./components/CityLabelsLayer";
import useDataMode from "../hooks/useDataMode";
import useHasSelectedLocations from "../hooks/useHasSelectedLocations";
import useMobileVhFix from "../hooks/useMobileVhFix";
import MapAutoSwitch from "./components/MapAutoSwitch";
import { useAutoSwitch } from "../hooks";
import _ from "lodash";

const TOKEN = `pk.eyJ1IjoiaHlwZXJvYmpla3QiLCJhIjoiY2pzZ3Bnd3piMGV6YTQzbjVqa3Z3dHQxZyJ9.rHobqsY_BjkNbqNQS4DNYw`;

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

const MAP_STYLE = "mapbox://styles/hyperobjekt/cl007w05t000414oaog417i9s";

const Map = (props) => {
  const rootEl = useRef();
  const ref = useRef();

  const embed = useDashboardStore((state) => state.embed);
  // console.log({ embed })

  const hasLocations = useHasSelectedLocations();
  const [dataMode] = useDataMode();
  const sources = useMapSources();
  const choroplethLayers = useChoroplethMapLayers();
  // drop interactivity from bubble layers
  const bubbleLayers = useBubbleMapLayers()?.map((layer) => ({
    ...layer,
    // TODO: fix bug in react-dashboard that is not adding proper `beforeId`
    beforeId: "waterway-label",
    interactive: false,
  }));
  const [autoSwitch] = useAutoSwitch();
  // callback function to add / remove a selected location
  const toggleSelected = useToggleLocation();
  // true if the page is scrolled
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  useMobileVhFix(rootEl);
  // fly to feature on click if it's not selected and toggle "selected" status
  const handleClick = useCallback(
    ({ features, lngLat }) => {
      if (embed) return;

      const partFeature = features?.[0];
      const geoid = partFeature?.properties?.GEOID;
      // console.log({ features, partFeature })
      if (!partFeature || !geoid || !lngLat) return;
      // retrieve all data from tilesets for the GEOID
      // console.log("map", { geoid, lngLat, dataMode });
      getTileData({ geoid, lngLat, dataMode }).then((data) => {
        // console.log({data})
        !_.isEmpty(data?.properties) && toggleSelected(data);
      });
    },
    [toggleSelected, dataMode]
  );
  // blur map when the page is scrolled
  const springProps = useSpring({
    backdropFilter: isScrolled ? "blur(4px)" : "blur(0px)",
    opacity: isScrolled ? 1 : 0,
    background: "rgba(255,255,255,0.666)",
    config: config.slow,
  });
  return (
    <MapSectionStyles
      ref={rootEl}
      className={clsx("map__root", "fill-vh", {
        "map__root--locations": hasLocations,
        "map__root--embed": embed,
      })}
    >
      <animated.div
        className={clsx("map__scroll-overlay", {
          "map__scroll-overlay--active": isScrolled,
        })}
        style={springProps}
      >
        <BackToMapButton />
        <div
          id="target-scorecards"
          style={{ position: "absolute", bottom: 180 }}
        />
      </animated.div>
      <div className="map__content">
        <div className="map__fixed-wrapper">
          <MapGL
            ref={ref}
            mapboxAccessToken={TOKEN}
            // mapboxAccessToken={process.env.MAPBOX_TOKEN}
            bounds={US_BOUNDS}
            mapStyle={MAP_STYLE}
            sources={sources}
            layers={[...choroplethLayers, ...bubbleLayers]}
            onClick={handleClick}
            {...props}
          >
            <GeolocateControl />
            <NavigationControl showCompass={false} />
            {!embed && (
              <>
                <ZoomToBoundsControl
                  bounds={US_BOUNDS}
                  title="Zoom to continental US"
                  className="map__bounds map__bounds--us"
                />
                <ZoomToBoundsControl
                  bounds={ALASKA_BOUNDS}
                  title="Zoom to Alaska"
                  className="map__bounds map__bounds--ak"
                />
                <ZoomToBoundsControl
                  bounds={HAWAII_BOUNDS}
                  title="Zoom to Hawaii"
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
        {!embed && <MapCards />}
        {!embed && <MapControls />}
        <MapTooltip />
        {!embed && (
          <ViewMoreButton show={!isScrolled} className="map__view-more" />
        )}
      </div>
      {!embed && autoSwitch && <MapAutoSwitch />}
    </MapSectionStyles>
  );
};

export default Map;
