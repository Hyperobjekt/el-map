import React, { useState } from 'react';
import ChartsStyle from './Charts.style';
import { ChartControls, LineChart } from './components';
import {
  useCurrentContext,
  useLocationData,
  useRemoveLocation,
  useLang,
} from '@hyperobjekt/react-dashboard';
import { useMaxLocations } from '../hooks';
import { Box } from '@mui/system';
import { LocationHeader } from '../components';
import { getColorForIndex } from '../utils';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import clsx from 'clsx';

const Charts = () => {
  const [natAvgActive, setNatAvgActive] = useState(false);
  const [confidenceActive, setConfidenceActive] = useState(false);

  // const { bubbleMetric } = useCurrentContext(); // { bubbleMetric, choroplethMetric, year, region_id, ... }
  const maxLocations = useMaxLocations();
  const locations = useLocationData(maxLocations);

  const removeLocation = useRemoveLocation();
  const handleDismissLocation = (location) => (event) => {
    removeLocation(location);
  };

  // hide if no locations
  // returning early breaks React due to hooks
  const style = {};
  if (!locations.length) style.display = 'none';
  return (
    <ChartsStyle className="charts__root" sx={style}>
      <ChartControls
        className="charts__controls"
        confidenceActive={confidenceActive}
        setConfidenceActive={setConfidenceActive}
      />
      <div className="charts__chart-wrapper body__content">
        <ParentSize className="charts__line-chart-sizer">
          {({ width, height }) => (
            <LineChart
              className="charts__line-chart"
              locations={locations}
              natAvgActive={natAvgActive}
              confidenceActive={confidenceActive}
              width={width}
              height={400}
              margin={{
                left: 80,
                right: 20,
                // top: 60,
                top: 10,
                bottom: 50,
              }}
            />
          )}
        </ParentSize>
        <Box className="charts__legend">
          {locations.map(({ GEOID, n, pl }, i) => (
            <LocationHeader
              key={GEOID}
              marker
              name={n}
              parentName={pl}
              color={getColorForIndex(i)}
              onDismiss={handleDismissLocation(GEOID)}
            />
          ))}
          {/* TODO: what if no natavg for metric? */}
          <LocationHeader
            marker
            name={useLang('NATIONAL_AVERAGE')}
            className={clsx('charts__nat-avg-legend-item', {
              active: natAvgActive,
            })}
            onDismiss={() => setNatAvgActive(!natAvgActive)}
            color={getColorForIndex(natAvgActive ? -1 : Infinity)}
          />
        </Box>
      </div>
    </ChartsStyle>
  );
};

export default Charts;
