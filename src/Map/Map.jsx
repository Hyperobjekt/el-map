import { MapGL, ZoomToBoundsControl } from "@hyperobjekt/mapgl";
import "@hyperobjekt/mapgl/dist/style.css";
import { useCallback, useRef } from "react";
import { MapControls, MapLegend } from "./components";
import { MapSectionStyles } from "./Map.style";
import {
  useMapSources,
  useChoroplethMapLayers,
  useBubbleMapLayers,
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

const TOKEN = `pk.eyJ1IjoiaHlwZXJvYmpla3QiLCJhIjoiY2pzZ3Bnd3piMGV6YTQzbjVqa3Z3dHQxZyJ9.rHobqsY_BjkNbqNQS4DNYw`;

// bounds for continental US
const US_BOUNDS = [
  [-130, 24],
  [-65, 50],
];

const MAP_STYLE = "mapbox://styles/hyperobjekt/cke1roqr302yq19jnlpc8dgr9";

const Map = (props) => {
  const ref = useRef();
  const sources = useMapSources();
  const choroplethLayers = useChoroplethMapLayers();
  // drop interactivity from bubble layers
  const bubbleLayers = useBubbleMapLayers()?.map((layer) => ({
    ...layer,
    interactive: false,
  }));
  // callback function to add / remove a selected location
  const toggleSelected = useToggleLocation();
  // true if the page is scrolled
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  // fly to feature on click if it's not selected and toggle "selected" status
  const handleClick = useCallback(
    ({ features, lngLat }) => {
      const partFeature = features?.[0];
      const geoid = partFeature?.properties?.GEOID;
      if (!partFeature || !geoid || !lngLat) return;
      // retrieve all data from tilesets for the GEOID
      getTileData({ geoid, lngLat, multiYear: true }).then((data) => {
        data && toggleSelected(data);
      });
    },
    [toggleSelected]
  );
  // blur map when the page is scrolled
  const springProps = useSpring({
    backdropFilter: isScrolled ? "blur(4px)" : "blur(0px)",
    opacity: isScrolled ? 1 : 0,
    background: "rgba(255,255,255,0.666)",
    config: config.slow,
  });

  return (
    <MapSectionStyles>
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
      <div className="map__fixed-wrapper">
        <MapGL
          ref={ref}
          mapboxAccessToken={TOKEN}
          bounds={US_BOUNDS}
          mapStyle={MAP_STYLE}
          sources={sources}
          layers={[...choroplethLayers, ...bubbleLayers]}
          onClick={handleClick}
          {...props}
        >
          <GeolocateControl />
          <NavigationControl />
          <ZoomToBoundsControl bounds={US_BOUNDS} />
        </MapGL>
        <MapLegend />
      </div>
      <MapCards />
      <MapControls />
      <ViewMoreButton show={!isScrolled} className="map__view-more" />
    </MapSectionStyles>
  );
};

export default Map;
