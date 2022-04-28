import clsx from "clsx";
import React, { useEffect, useState } from "react";
import {
  useRemoveLocation,
  useLocationStore,
} from "@hyperobjekt/react-dashboard";
import MapLocationCard from "./MapLocationCard";
import { MapCardsStyles } from "./MapCards.style";
import { useLocationFeatures } from "../../hooks";
import { useMapFlyToBounds, useMapFlyToFeature } from "@hyperobjekt/mapgl";
import useDataMode from "../../hooks/useDataMode";
import centroid from "@turf/centroid";
import { getTileData } from "../../Data";
import { usePreviousProps } from "@mui/utils";

const MapCards = ({ className, ...props }) => {
  const [expanded, setExpanded] = useState(false);
  const [dataMode] = useDataMode();
  const locations = useLocationFeatures();
  const setLocationState = useLocationStore((state) => state.set);
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

  // refetch data on mode changes
  const prevDataMode = usePreviousProps(dataMode);
  useEffect(() => {
    // do nothing if the data mode has not changed
    if (typeof prevDataMode !== "string" || dataMode === prevDataMode) return;
    const newLocations = locations.map((feature) => {
      const geoid = feature.properties.GEOID;
      const coords = centroid(feature)?.geometry?.coordinates;
      const lngLat = { lng: coords[0], lat: coords[1] };
      return getTileData({ geoid, lngLat, dataMode });
    });
    Promise.all(newLocations).then((features) => {
      setLocationState({ selected: features });
    });
  }, [dataMode, locations, setLocationState]);

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
