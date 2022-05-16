import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useLineData from "../hooks/useLineData";
import {
  useBubbleContext,
  useAppConfig,
  useLang,
} from "@hyperobjekt/react-dashboard";
import { GridRows } from "@visx/grid";
import { Threshold } from "@visx/threshold";
import { withTooltip } from "@visx/tooltip";
import { localPoint } from "@visx/event";

import { scaleLinear } from "@visx/scale";
import { AxisLeft, Axis } from "@visx/axis";
import { Group } from "@visx/group";
import { LinePath } from "@visx/shape";
import { getColorForIndex, isNumber } from "../../utils";
import { csvParse } from "d3-dsv";

import useConfidenceIntervalData from "../hooks/useConfidenceIntervalData";
// import useNationalAverageData from "../hooks/useNationalAverageData";
import TooltipLine from "./TooltipLine";
import ChartTooltip from "./ChartTooltip";

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

const LINE_WIDTH = 4;

// // TODO: move
// const display_map = {
//   efr: "Eviction Filing Rate (%)",
//   ejr: "Eviction Judgment Rate (%)",
//   tr: "Households Threatened Rate (%)",
// };

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
    : getExtremeFromLines(confidenceIntervals, Math.max, (d) => d.yHigh);
  const nMax = !natAvgActive
    ? -Infinity
    : getExtremeFromLine(natAvgLine, Math.max, (d) => d.y);

  const max = Math.max(...[lMax, nMax, cMax]) * 1.1;
  // console.log("change scale y!", max, lMax, cMax, nMax);

  return scaleLinear({
    domain: [min, max],
    range: [yMax, 0],
  });
};

/* COMPONENT */
const LineChart = withTooltip(
  ({
    locations,
    onHover,
    className,
    width,
    height,
    margin,
    natAvgActive,
    confidenceActive,

    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    tooltipOpen,
    updateTooltip,
    ...props
  }) => {
    // if (!locations.length) return null;

    const [natAvgData, setNatAvgData] = useState([]);
    // console.log(locations, "!");
    const { metric_id } = useBubbleContext();
    const avgUrl = useAppConfig("national_data");
    const metricKey = useAppConfig("metric_abbrev_map")[metric_id];

    // fetch national average data on load
    // TODO implement as useNationalAverageData?
    useEffect(() => {
      // useNationalAverageData(metric_id, avgUrl, metricKey)
      fetch(avgUrl).then((response) => {
        response.text().then((data) => {
          setNatAvgData(csvParse(data));
        });
      });
    }, []);

    // get data for various lines
    const natAvgLine = useMemo(() => {
      if (!natAvgActive) return [];
      // TODO: what if metric not included?
      return natAvgData
        .map((d) => ({
          x: Number(d.year),
          y: d[metricKey] ? Number(d[metricKey]) : null,
        }))
        .filter(({ y }) => isNumber(y));
    }, [metricKey, natAvgActive, natAvgData]);

    // TODO: nat_avg_active, conf_int_active
    // console.log("MI: ", metric_id);
    const lines = useLineData(metric_id);
    const confidenceIntervals = useConfidenceIntervalData(metric_id);

    // get chart scales
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    // console.log("L: ", { lines, yMax });
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

    // if (!lines || !lines.length) return null;

    // NOTE: be sure to update dependency array.
    // TODO: Better not to wrap in useCallback?
    const handleTooltip = useCallback(
      (e) => {
        const { x } = localPoint(e) || { x: 0 };
        if (x < margin.left || x > width - margin.right) return;

        // const x0 = xScale.invert(x);
        const x0 = xScale.invert(x - margin.left);
        const year = Math.round(x0);
        // console.log({ x0, year })

        const theLines = [...lines];
        if (natAvgActive)
          theLines.push({
            data: natAvgLine,
            isNatAvg: true,
            name: "National Average",
          });

        const tooltipData = { year };
        tooltipData.data = theLines
          .map(({ data, isNatAvg, GEOID, name }, i) => {
            const { y } =
              data.find(({ x }) => String(x) === String(year)) || {};

            let yLow = null;
            let yHigh = null;
            if (confidenceActive && GEOID) {
              const confInt = confidenceIntervals.find(
                (ci) => ci.GEOID === GEOID
              );
              const confIntYr =
                confInt &&
                confInt.data.find(({ x }) => String(x) === String(year));
              yLow = confIntYr && confIntYr.yLow;
              yHigh = confIntYr && confIntYr.yHigh;
            }
            // console.log(i, y);
            const color = getColorForIndex(isNatAvg ? -1 : i);
            const yPx = isNumber(y) && yScale(y);
            return { y, yLow, yHigh, yPx, isNatAvg, name, color };
          })
          .filter(({ y }) => isNumber(y));

        // yPx px are measured from top, so min is highest
        const tooltipTop = Math.min(...tooltipData.data.map((d) => d.yPx));
        // console.log({ tooltipTop });
        showTooltip({
          tooltipData,
          tooltipLeft: xScale(year),
          tooltipTop,
        });
      },
      [showTooltip, lines, natAvgActive, confidenceActive]
    );

    // console.log({ xMax });
    return (
      <div className={clsx("line-chart__root", className)}>
        <svg
          height={height}
          width={width}
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={() => hideTooltip()}
        >
          <Group left={margin.left} top={margin.top} right={margin.right}>
            {/* <line x1={0} x2={xMax} y1={0} y2={0} strokeWidth={3} stroke="white" />
          <line x1={0} x2={xMax} y1={yMax} y2={yMax} strokeWidth={3} stroke="white" /> */}
            {xMax > 0 && (
              <rect
                x={0}
                y={0}
                width={xMax}
                height={yMax}
                stroke="white"
                strokeWidth={2}
                fill="none"
              />
            )}
            {/* TODO: formalize values? */}
            <text
              className="line-chart__y-label"
              x={-235}
              y={-40}
              transform="rotate(-90)"
              fontSize={14}
            >
              {useLang(`METRIC_${metric_id}`) + " (%)"}
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
                    key={`threshold-${i}`}
                    id={`${name}-threshold`}
                    data={data}
                    x={(d) => xScale(d.x)}
                    y0={(d) => yScale(d.yLow)}
                    y1={(d) => yScale(d.yHigh)}
                    clipAboveTo={0}
                    clipBelowTo={yMax}
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
                  x={(d) => xScale(d.x)}
                  y={(d) => yScale(d.y)}
                  stroke={getColorForIndex(i)}
                  strokeWidth={LINE_WIDTH}
                  strokeOpacity={1}
                />
              );
            })}
            {natAvgActive && !!natAvgLine.length && (
              <LinePath
                data={natAvgLine}
                x={(d) => xScale(d.x)}
                y={(d) => yScale(d.y)}
                stroke={getColorForIndex(-1)}
                strokeWidth={LINE_WIDTH}
                strokeOpacity={1}
              />
            )}
            <TooltipLine
              tooltipData={tooltipData}
              tooltipLeft={tooltipLeft}
              tooltipTop={tooltipTop}
              yMax={yMax}
            />
          </Group>
        </svg>

        <ChartTooltip
          tooltipData={tooltipData}
          tooltipLeft={tooltipLeft}
          tooltipTop={tooltipTop}
          width={width}
          yMax={yMax}
        />
      </div>
    );
  }
);

export default LineChart;
