import clsx from "clsx";
import React from "react";
import { Tooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Circle } from "@mui/icons-material";

const LocationDetails = ({ data, i }) => {
  const { y, yLow, yHigh, name, color } = data;
  // console.log({ i, isNatAvg, c: yPx });
  const boundsOn = yLow || yHigh;
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
          {y}%
        </Typography>
        {boundsOn && (
          <Box className="bounds" display="flex" flexDirection="column">
            <Typography variant="caption">MIN: {yLow}%</Typography>
            <Typography variant="caption">MAX: {yHigh}%</Typography>
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
  if (!tooltipData?.data?.length) return null;
  // console.log({ tooltipData });

  // NOTE: TooltipWithBounds currently generates findDOMNode warning.
  // https://github.com/airbnb/visx/issues/737
  // TODO: implement fix when released
  return (
    <TooltipWithBounds
      key={Math.random()}
      top={tooltipTop}
      left={tooltipLeft + 80}
      style={{ ...defaultStyles }}
    >
      <Box className="charts__tooltip">
        {tooltipData.data.map((data, i) => (
          <Box className="location-details" key={i}>
            <LocationDetails data={data} i={i} />
          </Box>
        ))}
      </Box>
    </TooltipWithBounds>
  );
};

export default ChartTooltip;
