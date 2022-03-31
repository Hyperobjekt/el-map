import { MapGL, ZoomToBoundsControl, useMapStore } from "@hyperobjekt/mapgl";
import "@hyperobjekt/mapgl/dist/style.css";
import { useCallback, useEffect, useRef } from "react";
import { MapControls, MapLegend } from "./components";
import MapStyle from "./Map.style";
import {
  useMapSources,
  useChoroplethMapLayers,
  useBubbleMapLayers,
} from "@hyperobjekt/react-dashboard";
import { GeolocateControl, NavigationControl } from "react-map-gl";
import { useToggleLocation } from "@hyperobjekt/react-dashboard";
import { animated, config, useSpring } from "@react-spring/web";
import { Button, useScrollTrigger } from "@mui/material";
import clsx from "clsx";
import BackToMapButton from "./components/BackToMapButton";
import ViewMoreButton from "./components/ViewMoreButton";

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
    ({ features }) => {
      const partFeature = features?.[0];
      if (!partFeature) return;
      toggleSelected(partFeature);
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
    <MapStyle>
      <animated.div
        className={clsx("map__scroll-overlay", {
          "map__scroll-overlay--active": isScrolled,
        })}
        style={springProps}
      >
        <BackToMapButton />
      </animated.div>
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
      <MapControls />
      <MapLegend />
      <ViewMoreButton show={!isScrolled} className="map__view-more" />
    </MapStyle>
  );
};

export default Map;
