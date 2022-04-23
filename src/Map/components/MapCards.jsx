import clsx from "clsx";
import React, { useState } from "react";
import { useRemoveLocation } from "@hyperobjekt/react-dashboard";
import MapLocationCard from "./MapLocationCard";
import { MapCardsStyles } from "./MapCards.style";
import { useLocationFeatures } from "../../hooks";
import { useMapFlyToBounds, useMapFlyToFeature } from "@hyperobjekt/mapgl";

const MapCards = ({ className, ...props }) => {
  const [expanded, setExpanded] = useState(false);
  const locations = useLocationFeatures();
  console.log("LLLLL", locations)
  const removeLocation = useRemoveLocation();
  const flyToBounds = useMapFlyToBounds();
  const flyToFeature = useMapFlyToFeature();
  const handleDismissLocation = (location) => () => {
    removeLocation(location);
  };
  const handleMouseEnter = () => {
    setExpanded(true);
  };
  const handleMouseLeave = () => {
    setExpanded(false);
  };
  const handleHeaderClick = (locationFeature) => () => {
    if (!locationFeature) return;
    // fly to bbox if it exists (more accurate)
    const bbox = locationFeature?.bbox;
    if (bbox?.length === 4) {
      const bounds = [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ];
      return flyToBounds(bounds);
    }
    // fallback fly to feature if there is no bbox
    flyToFeature(locationFeature);
  };
  return (
    <MapCardsStyles
      className={clsx("map-cards__root", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {locations.map((locationFeature, i) => {
        const location = locationFeature.properties;
        return (
          <MapLocationCard
            key={location.GEOID}
            className="map-cards__card"
            expanded={expanded}
            data={location}
            total={locations.length}
            index={i}
            onDismiss={handleDismissLocation(location)}
            onHeaderClick={handleHeaderClick(locationFeature)}
          />
        );
      })}
    </MapCardsStyles>
  );
};

export default MapCards;
