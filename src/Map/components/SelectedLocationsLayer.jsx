import React from "react";
import { Layer, Source } from "react-map-gl";
import { useLocationFeature } from "@hyperobjekt/react-dashboard";
import { getColorForIndex } from "../../utils";

/**
 * Returns a GeoJSON source for the 3 most recent selected locations.
 * Adds colors based on index.
 * @param {*} locations
 * @returns
 */
const getLocationsSource = (locations) => {
  const lastLocations = locations.slice(-3);
  const locationsWithColor = lastLocations.map((location, i) => {
    const color = getColorForIndex(i);
    return {
      ...location,
      properties: {
        ...location.properties,
        color,
      },
    };
  });
  return {
    id: "selected-locations",
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: locationsWithColor,
    },
  };
};

// White casing on selected locations
const SELECTED_CASING = {
  id: "highlight-outline",
  type: "line",
  source: "selected-locations",
  layout: {},
  paint: {
    "line-width": 5,
    "line-opacity": 0.75,
    "line-color": "#ffffff",
  },
};

// Colored outline for selected locations
const SELECTED_OUTLINE = {
  id: "highlight",
  type: "line",
  source: "selected-locations",
  layout: {},
  paint: {
    "line-width": 2,
    "line-opacity": 0.9,
    "line-color": ["get", "color"],
  },
};

/**
 * Renders the 3 most recent selected locations
 */
const SelectedLocationsLayer = () => {
  const locations = useLocationFeature();
  const locationsSource = getLocationsSource(locations);
  return (
    <Source {...locationsSource}>
      <Layer {...SELECTED_OUTLINE} beforeId="settlement-subdivision-label" />
      <Layer {...SELECTED_CASING} beforeId="highlight" />
    </Source>
  );
};

export default SelectedLocationsLayer;
