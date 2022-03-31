import React from "react";
import { useMaxLocations } from "../hooks";
import ScorecardsStyle from "./Scorecards.style";
import {
  useCurrentContext,
  useLocationData,
} from "@hyperobjekt/react-dashboard";
import { Typography } from "@mui/material";
import SearchScorecard from "./components/SearchScorecard";
import { Box } from "@mui/system";
import LocationScorecard from "./components/LocationScorecard";

const Scorecards = () => {
  const { year, bubbleMetric, choroplethMetric } = useCurrentContext();
  const maxLocations = useMaxLocations();
  const locations = useLocationData(maxLocations);
  const showAddLocation = locations.length < maxLocations;
  const handleDismissLocation = () => {};
  return (
    <ScorecardsStyle id="scorecards-section">
      <div className="body__content">
        <Typography
          className="scorecards__heading"
          component="h2"
          variant="overline"
        >
          Displaying eviction statistics for {year}
        </Typography>
        <Box className="scorecards__cards">
          {locations.map((location) => (
            <LocationScorecard
              key={location.id}
              data={location}
              onDismiss={handleDismissLocation}
            />
          ))}
          {showAddLocation && <SearchScorecard />}
        </Box>
      </div>
    </ScorecardsStyle>
  );
};

export default Scorecards;
