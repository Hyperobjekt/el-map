import clsx from "clsx";
import React from "react";
import { Tooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { getColorForIndex } from "../../utils";
import { Circle } from "@mui/icons-material";

const LocationDetails = ({ data, i }) => {
  const { y, yLow, yHigh, name, isNatAvg } = data;
  const color = getColorForIndex(isNatAvg ? -1 : i);
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
            <Typography variant="caption">MAX: {yHigh}%</Typography>
            <Typography variant="caption">MIN: {yLow}%</Typography>
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
  if (!tooltipData) return null;
  // console.log({ tooltipData });
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
