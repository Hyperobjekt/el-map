import MapGL, { ZoomToBoundsControl } from "@hyperobjekt/mapgl";
import "@hyperobjekt/mapgl/dist/style.css";
import { useRef } from "react";
import { MapControls, MapLegend } from "./components";
import MapStyle from "./Map.style";
import {
  useMapSources,
  useChoroplethMapLayers,
  useBubbleMapLayers,
} from "@hyperobjekt/react-dashboard";
import { GeolocateControl, NavigationControl } from "react-map-gl";
import { useMapState } from "@hyperobjekt/mapgl";

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
  const bubbleLayers = useBubbleMapLayers();
  const selectedFeature = useMapState("selectedFeature");
  console.log(selectedFeature);
  return (
    <MapStyle>
      <MapGL
        ref={ref}
        mapboxAccessToken={TOKEN}
        bounds={US_BOUNDS}
        mapStyle={MAP_STYLE}
        sources={sources}
        layers={[...choroplethLayers, ...bubbleLayers]}
        {...props}
      >
        <GeolocateControl />
        <NavigationControl />
        <ZoomToBoundsControl bounds={US_BOUNDS} />
      </MapGL>
      <MapControls />
      <MapLegend />
    </MapStyle>
  );
};

export default Map;
