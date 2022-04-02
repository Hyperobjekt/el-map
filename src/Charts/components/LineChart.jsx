import clsx from "clsx";
import React from "react";
import useLineData from "../hooks/useLineData";
import { useBubbleContext } from "@hyperobjekt/react-dashboard";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from "@visx/xychart";
import { getColorForIndex } from "../../utils";
import { defaultStyles } from "@visx/tooltip";

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

const LineChart = ({ locations, onHover, className, ...props }) => {
  const { metric_id } = useBubbleContext();
  const lines = useLineData(metric_id);
  return (
    <div className={clsx("line-chart__root", className)} {...props}>
      <XYChart
        height={400}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        {lines.map(({ GEOID, name, parent, data }, i) => {
          return (
            <AnimatedLineSeries
              key={GEOID}
              dataKey={name}
              data={data}
              stroke={getColorForIndex(i)}
              {...accessors}
            />
          );
        })}
        <Tooltip
          style={{ ...defaultStyles, zIndex: 1000 }}
          showVerticalCrosshair
          showSeriesGlyphs
          verticalCrosshairStyle={{
            stroke: "rgba(0, 0, 0, 0.1)",
          }}
          renderTooltip={(tooltipProps) => {
            console.log("toop tip data", tooltipProps);
            const { tooltipData, colorScale } = tooltipProps;
            return (
              <div>
                <div
                  style={{ color: colorScale(tooltipData.nearestDatum.key) }}
                >
                  {tooltipData.nearestDatum.key}
                </div>
                {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                {", "}
                {accessors.yAccessor(tooltipData.nearestDatum.datum)}
              </div>
            );
          }}
        />
      </XYChart>
    </div>
  );
};

export default LineChart;
