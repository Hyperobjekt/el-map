import React from 'react';
import { useMaxLocations } from '../hooks';
import ScorecardsStyle from './Scorecards.style';
import {
  useCurrentContext,
  useLocationData,
  useRemoveLocation,
  useLang,
} from '@hyperobjekt/react-dashboard';
import { Typography } from '@mui/material';
import SearchScorecard from './components/SearchScorecard';
import { Box } from '@mui/system';
import LocationScorecard from './components/LocationScorecard';
import { getColorForIndex } from '../utils';

const Scorecards = () => {
  const { year } = useCurrentContext();
  const maxLocations = useMaxLocations();
  const locations = useLocationData(maxLocations);
  const showAddLocation = locations.length < maxLocations;
  const removeLocation = useRemoveLocation();
  const handleDismissLocation = (location) => () => {
    removeLocation(location);
  };

  if (!locations.length) return null;
  return (
    <ScorecardsStyle id="scorecards-section">
      <div className="body__content">
        <Typography className="scorecards__heading" component="h2" variant="overline">
          {useLang('HEADER_STATISTICS', { year })}
        </Typography>
        <Box className="scorecards__cards">
          {locations.map((location, i) => (
            <LocationScorecard
              key={location.GEOID}
              geoid={location.GEOID}
              className="scorecards__card"
              data={location}
              color={getColorForIndex(i)}
              onDismiss={handleDismissLocation(location)}
            />
          ))}
          {showAddLocation && (
            <SearchScorecard className="scorecards__card scorecards__card--search" />
          )}
        </Box>
      </div>
    </ScorecardsStyle>
  );
};

export default Scorecards;
