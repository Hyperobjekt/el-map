import clsx from "clsx";
import React, { useState } from "react";
import { useRemoveLocation } from "@hyperobjekt/react-dashboard";
import MapLocationCard from "./MapLocationCard";
import useFullLocationData from "../../hooks/useFullLocationData";
import { MapCardsStyles } from "../Map.style";

const MapCards = ({ className, ...props }) => {
  const [expanded, setExpanded] = useState(false);
  const locations = useFullLocationData();
  const removeLocation = useRemoveLocation();
  const handleDismissLocation = (location) => () => {
    removeLocation(location);
  };
  const handleMouseEnter = () => {
    setExpanded(true);
  };
  const handleMouseLeave = () => {
    setExpanded(false);
  };
  return (
    <MapCardsStyles
      className={clsx("map-cards__root", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {locations.map((location, i) => (
        <MapLocationCard
          key={location.GEOID}
          className="map-cards__card"
          expanded={expanded}
          data={location}
          total={locations.length}
          index={i}
          onDismiss={handleDismissLocation(location)}
        />
      ))}
    </MapCardsStyles>
  );
};

export default MapCards;
