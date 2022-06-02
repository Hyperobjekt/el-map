import clsx from "clsx";
import React from "react";
import { Group } from "@visx/group";
import { Line } from "@visx/shape";

const tooltipLineExtension = 25;
const tooltipLineYearBuffer = 17;
const tooltipLineYearWidth = 32;

/* COMPONENT */
const TooltipLine = ({
  tooltipData,
  tooltipLeft,
  tooltipTop,
  yMax,
  ...props
}) => {
  if (!tooltipData) return null;
  return (
    <Group>
      <Line
        from={{ x: tooltipLeft, y: 0 }}
        to={{ x: tooltipLeft, y: yMax + tooltipLineExtension }}
        stroke={"gray"}
        strokeWidth={1}
        pointerEvents="none"
        strokeDasharray="3,3"
      />
      {tooltipData.data.map(({ yPx, color }, i) => (
        <circle
          key={i}
          cx={tooltipLeft}
          cy={yPx}
          r={5}
          fill={color}
          fillOpacity={1}
          pointerEvents="none"
        />
      ))}
      <text
        className="charts__tooltip-line-year"
        y={yMax + tooltipLineExtension + tooltipLineYearBuffer}
        x={tooltipLeft}
        style={{
          transform: `translateX(${-tooltipLineYearWidth / 2}px)`,
        }}
      >
        {tooltipData.year}
      </text>
    </Group>
  );
};

export default TooltipLine;
