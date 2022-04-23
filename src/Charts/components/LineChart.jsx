import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import useLineData from "../hooks/useLineData";
import { useBubbleContext, useAppConfig } from "@hyperobjekt/react-dashboard";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  AnimatedAreaSeries,
  XYChart,
  // Tooltip,
} from "@visx/xychart";
import { GridRows } from "@visx/grid";
import { Threshold } from "@visx/threshold";
import { Tooltip } from "@visx/tooltip";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom, AxisTop, Axis } from "@visx/axis";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { getColorForIndex } from "../../utils";
import { defaultStyles } from "@visx/tooltip";
import { csvParse } from "d3-dsv";

import useConfidenceIntervalData from "../hooks/useConfidenceIntervalData";
import useNationalAverageData from "../hooks/useNationalAverageData";
import { display } from "@mui/system";

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

const getExtremeFromLine = (lineData, mathFn, accessor) => {
  return mathFn(...lineData.map(accessor));
};

const getExtremeFromLines = (lines, mathFn, accessor) => {
  return mathFn(
    ...lines.map((l) => getExtremeFromLine(l.data, mathFn, accessor))
  );
};

// TODO: move
const display_map = {
  efr: "Eviction Filing Rate (%)",
  ejr: "Eviction Judgment Rate (%)",
  tr: "Households Threatened Rate (%)",
};

const getXscale = ({ lines, natAvgActive, natAvgLine, xMax }) => {
  const lMin = getExtremeFromLines(lines, Math.min, (d) => Number(d.x));
  const nMin = !natAvgActive
    ? Infinity
    : getExtremeFromLine(natAvgLine, Math.min, (d) => Number(d.x));
  const min = Math.min(lMin, nMin);

  const lMax = getExtremeFromLines(lines, Math.max, (d) => Number(d.x));
  const nMax = !natAvgActive
    ? -Infinity
    : getExtremeFromLine(natAvgLine, Math.max, (d) => Number(d.x));
  const max = Math.max(lMax, nMax);

  // console.log("change scale x!", min, max);
  return scaleLinear({
    domain: [min, max],
    range: [0, xMax],
  });
};

const getYscale = ({
  lines,
  confidenceActive,
  confidenceIntervals,
  natAvgActive,
  natAvgLine,
  yMax,
}) => {
  // pin 0 to 0
  const min = 0;

  const lMax = getExtremeFromLines(lines, Math.max, (d) => d.y);
  const cMax = !confidenceActive
    ? -Infinity
    : getExtremeFromLines(confidenceIntervals, Math.max, (d) => d.y1);
  const nMax = !natAvgActive
    ? -Infinity
    : getExtremeFromLine(natAvgLine, Math.max, (d) => d.y);

  const max = Math.max(...[lMax, nMax, cMax]) * 1.1;
  console.log("change scale y!", max, lMax, cMax, nMax);

  return scaleLinear({
    domain: [min, max],
    range: [yMax, 0],
  });
};

const LineChart = ({
  locations,
  onHover,
  className,
  width,
  height,
  margin,
  natAvgActive,
  confidenceActive,
  ...props
}) => {
  const [natAvgData, setNatAvgData] = useState([]);
  console.log(locations, "!");
  const { metric_id } = useBubbleContext();
  const avgUrl = useAppConfig("national_data");
  const metricKey = useAppConfig("metric_abbrev_map")[metric_id];
  useEffect(() => {
    // useNationalAverageData(metric_id, avgUrl, metricKey)
    fetch(avgUrl).then((response) => {
      response.text().then((data) => {
        // const proc = csvParse(data)
        // console.log("je: ", proc, data);
        setNatAvgData(csvParse(data));
      });
    });
  }, []);

  // TODO: nat_avg_active, conf_int_active
  console.log("MI: ", metric_id);
  const lines = useLineData(metric_id);

  const confidenceIntervals = useConfidenceIntervalData(metric_id);
  const natAvgLine = useMemo(() => {
    if (!natAvgActive) return [];
    // TODO: what if metric not included?
    return natAvgData.map((d) => ({
      x: Number(d.year),
      y: d[metricKey] ? Number(d[metricKey]) : null,
    }));
  }, [metricKey, natAvgActive, natAvgData]);

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  console.log("L: ", lines, props);
  const xScale = useMemo(
    () => getXscale({ lines, natAvgActive, natAvgLine, xMax }),
    [lines, metric_id, natAvgActive]
  );

  const yScale = useMemo(
    () =>
      getYscale({
        lines,
        confidenceActive,
        confidenceIntervals,
        natAvgActive,
        natAvgLine,
        yMax,
      }),
    [natAvgActive, lines, confidenceActive, metric_id]
  );

  console.log("LINES", lines);
  console.log("NAL", natAvgLine);

  // if (!lines || !lines.length) return null;

  return (
    <div className={clsx("line-chart__root", className)} {...props}>
      <svg height={height} width={width}>
        <Group left={margin.left} top={margin.top} right={margin.right}>
          {/* <line x1={0} x2={xMax} y1={0} y2={0} strokeWidth={3} stroke="white" />
          <line x1={0} x2={xMax} y1={yMax} y2={yMax} strokeWidth={3} stroke="white" /> */}
          <rect
            x={0}
            y={0}
            width={xMax}
            height={yMax}
            stroke="white"
            strokeWidth={2}
            fill="none"
          />
          <text
            className="line-chart__y-label"
            x={-235}
            y={-40}
            transform="rotate(-90)"
            fontSize={14}
          >
            {display_map[metric_id] || metric_id}
          </text>
          <AxisLeft
            scale={yScale}
            numTicks={4}
            stroke="white"
            tickFormat={(d) => String(d)}
            tickStroke={0}
            strokeWidth={2}
          />
          <GridRows
            scale={yScale}
            width={xMax}
            height={yMax}
            stroke="white"
            strokeWidth={1}
            numTicks={4}
          />
          <Axis
            top={yMax}
            scale={xScale}
            stroke="white"
            tickFormat={(d) => String(d)}
            tickStroke={0}
            numTicks={4}
          />
          {confidenceActive &&
            confidenceIntervals.map(({ name, data }, i) => {
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
                    fill: getColorForIndex(i) + "20",
                  }}
                  aboveAreaProps={{
                    display: "none",
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
                strokeWidth={3}
                strokeOpacity={1}
              />
            );
          })}
          {natAvgActive && (
            <LinePath
              // key={"LinePath" + i}
              data={natAvgLine}
              // curve={curveBasis}
              x={(d) => xScale(d.x)}
              y={(d) => yScale(d.y)}
              stroke={getColorForIndex(-1)}
              strokeWidth={3}
              strokeOpacity={1}
            />
          )}
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
