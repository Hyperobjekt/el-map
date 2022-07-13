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
  const natAvgName = useLang('NATIONAL_AVERAGE');

  const [natAvgActive, setNatAvgActive] = useState(false);
  const [confidenceActive, setConfidenceActive] = useState(false);

  const maxLocations = useMaxLocations();
  const locations = useLocationData(maxLocations);

  const removeLocation = useRemoveLocation();
  const handleDismissLocation = (location) => (event) => {
    removeLocation(location);
  };

  if (!locations.length) return null;
  return (
    <ChartsStyle className="charts__root">
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
              // TODO: formalize values?
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
          <LocationHeader
            marker
            name={natAvgName}
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
