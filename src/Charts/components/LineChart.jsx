import clsx from "clsx";
import React, { useMemo } from "react";
import useLineData from "../hooks/useLineData";
import { useBubbleContext } from "@hyperobjekt/react-dashboard";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  AnimatedAreaSeries,
  XYChart,
  // Tooltip,
} from "@visx/xychart";
import { Threshold } from "@visx/threshold";
import { Tooltip } from "@visx/tooltip";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom, AxisTop, Axis } from "@visx/axis";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { getColorForIndex } from "../../utils";
import { defaultStyles } from "@visx/tooltip";
import useConfidenceIntervalData from "../hooks/useConfidenceIntervalData";

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

const getExtremeFromLines = (lines, mathFn, accessor) => {
  return mathFn(...lines.map((l) => mathFn(...l.data.map(accessor))));
};

const LineChart = ({
  locations,
  onHover,
  className,
  width,
  height,
  margin,
  ...props
}) => {
  const { metric_id } = useBubbleContext();
  // TODO: nat_avg_active, conf_int_active
  const lines = useLineData(metric_id);
  const confidenceIntervals = useConfidenceIntervalData(metric_id);

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  // console.log("L: ", lines, props);
  const xScale = useMemo(() =>
    scaleLinear(
      {
        domain: [
          getExtremeFromLines(lines, Math.min, (d) => Number(d.x)),
          getExtremeFromLines(lines, Math.max, (d) => Number(d.x)),
        ],
        // range: [62, 595]
        range: [0, xMax],
      },
      [lines]
    )
  );
  const yScale = useMemo(() =>
    scaleLinear(
      {
        domain: [
          Math.min(
            getExtremeFromLines(lines, Math.min, (d) => d.y),
            getExtremeFromLines(confidenceIntervals, Math.min, (d) => d.y0)
          ),
          Math.max(
            getExtremeFromLines(lines, Math.max, (d) => d.y),
            getExtremeFromLines(confidenceIntervals, Math.max, (d) => d.y1)
          ),
        ],
        // range: [340, 10]
        range: [yMax, 0],
      },
      [lines]
    )
  );

  return (
    <div className={clsx("line-chart__root", className)} {...props}>
      {/* TODO: insert conf_int_chart */}
      {/* <XYChart
        height={400}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        {lines.map(({ GEOID, name, parent, data }, i) => {
          return (
                 <>
          <Threshold
            id={`${name}-threshold`}
            data={data}
            x={d => console.log(xScale(d.x)) ||  xScale(d.x)}
            y0={(d) => console.log("y0", yScale(d.y * .9)) || yScale(d.y * .9)}
            // y0={(d) => console.log("y0", d.y * 0.5) || d.y * 0.5}
            y1={(d) => console.log("y1", yScale(d.y * 1.1)) || yScale(d.y * 1.1)}
            // y1={(d) => console.log("y1", d.y * 1.5) || d.y * 1.5}
            clipAboveTo={0}
            clipBelowTo={400}
            // curve={curveBasis}
            belowAreaProps={{
              fill: 'violet',
              fillOpacity: 0.4,
            }}
            aboveAreaProps={{
              fill: 'green',
              fillOpacity: 0.4,
            }}
          />
          <LinePath
            data={data}
            // curve={curveBasis}
            x={d => xScale(d.x)}
            y={(d) => yScale(d.y)}
            stroke="#222"
            strokeWidth={1.5}
            strokeOpacity={0.8}
            strokeDasharray="1,2"
          />
            <AnimatedLineSeries
              key={GEOID}
              dataKey={name}
              data={data}
              stroke={getColorForIndex(i)}
              {...accessors}
              />
              </>
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
      </XYChart> */}
      <svg height={height} width={width}>
        {/* <rect x={0} y={0} width={width} height={height} fill={background} rx={14} /> */}
        <Group left={margin.left} top={margin.top} right={margin.right}>
          {/* <GridRows scale={temperatureScale} width={xMax} height={yMax} stroke="#e0e0e0" />
          <GridColumns scale={timeScale} width={xMax} height={yMax} stroke="#e0e0e0" /> */}
          {/* <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" /> */}
          {/* <AxisBottom top={yMax} scale={timeScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft scale={temperatureScale} /> */}
          <text x={-210} y={-40} transform="rotate(-90)" fontSize={10}>
            (The Metrix)
          </text>
          {/* <AnimatedAxis orientation="bottom" />
          <AnimatedGrid columns={false} numTicks={4} /> */}
          <AxisLeft scale={yScale} />
          {/* <AxisBottom scale={xScale} /> */}
          <Axis top={yMax} scale={xScale} tickFormat={(d) => String(d)} />
          {confidenceIntervals.map(({ name, data }, i) => {
            return (
              <Threshold
                key={"Threshold" + i}
                id={`${name}-threshold`}
                data={data}
                x={(d) => xScale(d.x)}
                y0={(d) => yScale(d.y0)}
                // y0={(d) => console.log("y0", d.y * 0.5) || d.y * 0.5}
                y1={(d) => yScale(d.y1)}
                // y1={(d) => console.log("y1", d.y * 1.5) || d.y * 1.5}
                clipAboveTo={0}
                clipBelowTo={yMax}
                // curve={curveBasis}
                belowAreaProps={{
                  // fill: "violet",
                  // fillOpacity: 0.4,

                  // fill: "#f4f7f9",
                  stroke: "#f4f7f9",
                  strokeWidth: 0.1,
                  // stroke: "none"
                  fill: getColorForIndex(i) + "11",
                  // fill: "transparent"
                  // fillOpacity: 0.4,
                }}
                aboveAreaProps={{
                  // fill: "#f4f7f9",
                  // stroke: "#f4f7f9",
                  // strokeWidth: 0.1,
                  // stroke: "none"
                  fill: getColorForIndex(i) + "11",
                  // fillOpacity: 0.4,
                }}
              />
            );
          })}
          {lines.map(({ GEOID, name, parent, data }, i) => {
            return (
              <LinePath
                key={"LinePath" + i}
                data={data}
                // curve={curveBasis}
                x={(d) => xScale(d.x)}
                y={(d) => yScale(d.y)}
                stroke={getColorForIndex(i)}
                strokeWidth={2}
                strokeOpacity={1}
              />
            );
          })}
          {/* <Tooltip
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
          /> */}
        </Group>
      </svg>
    </div>
  );
};

export default LineChart;
