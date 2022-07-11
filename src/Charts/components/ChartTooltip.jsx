import clsx from 'clsx';
import React from 'react';
import { Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { usePreviousProps } from '@mui/utils';
import { getFormattedValues } from '../../components/utils';

const tooltipWidth = 240;

const LocationDetails = ({ data, i }) => {
  const { y, yLow, yHigh, name, color } = data;
  const { fMin, fMax, fVal, meaningfulCI } = getFormattedValues({
    format: 'percent_value',
    value: y,
    min: yLow,
    max: yHigh,
  });

  return (
    <>
      <Circle
        className="indicator"
        style={{
          color,
        }}
      ></Circle>
      <Typography variant="h3" className="name">
        {name}
      </Typography>
      <Box className="values" display="flex">
        <Typography variant="body2" className="y-value">
          {fVal}
        </Typography>
        {meaningfulCI && (
          <Box className="bounds" display="flex" flexDirection="column">
            <Typography variant="caption">MIN: {fMin}</Typography>
            <Typography variant="caption">MAX: {fMax}</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

const ChartTooltip = ({
  // tooltipData = {
  //   data: [
  //     { y: "22", yLow: "12", yHigh: "43", name: "Madison County" },
  //     { y: "22.32", yLow: "12", yHigh: "43", name: "Colorado" },
  //     {
  //       y: "22.32",
  //       yLow: "12",
  //       yHigh: "43",
  //       isNatAvg: true,
  //       name: "National Average",
  //     },
  //   ],
  // },
  // tooltipLeft = 300,
  // tooltipTop = 50,
  tooltipData,
  tooltipLeft,
  tooltipTop,
  width,
  yMax,
  ...props
}) => {
  // if (!tooltipData?.data?.length) return null;

  // use previous data so tooltip fades out in place when hover ends
  const prevTop = usePreviousProps(tooltipTop);
  const top = tooltipTop || prevTop;
  const prevLeft = usePreviousProps(tooltipLeft);
  let left = (tooltipLeft || prevLeft) + 80;
  if (window.innerWidth < left + tooltipWidth + 60) {
    // move left if tooltip would overflow screen
    // TODO: determine why TooltipWithBounds isn't working
    left -= tooltipWidth + 20;
  }
  const prevData = usePreviousProps(tooltipData?.data);
  const data = tooltipData?.data || prevData;

  // NOTE: TooltipWithBounds currently generates findDOMNode warning.
  // https://github.com/airbnb/visx/issues/737
  // TODO: implement fix when released
  return (
    <Tooltip // TooltipWithBounds
      // key={Math.random()}
      // key={tooltipData?.data?.length ? 1 : 0}
      top={top}
      left={left}
      style={{
        ...defaultStyles,
        transition: 'all 0.25s ease-out',
        opacity: tooltipData?.data?.length ? 1 : 0,
      }}
    >
      <Box className="charts__tooltip">
        {!!data?.length &&
          data.map((d, i) => (
            <Box className="location-details" key={i}>
              <LocationDetails data={d} i={i} />
            </Box>
          ))}
      </Box>
    </Tooltip>
  );
};

export default ChartTooltip;
