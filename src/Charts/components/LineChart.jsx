import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useLineData from '../hooks/useLineData';
import { useBubbleContext, useLang } from '@hyperobjekt/react-dashboard';
import { GridRows } from '@visx/grid';
import { Threshold } from '@visx/threshold';
import { withTooltip } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { scaleLinear } from '@visx/scale';
import { AxisLeft, Axis } from '@visx/axis';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { getColorForIndex, isNumber, getNatAvgLine, getOpacityInHex } from '../../utils';
import useConfidenceIntervalData from '../hooks/useConfidenceIntervalData';
import useNationalAverageData from '../hooks/useNationalAverageData';
import TooltipLine from './TooltipLine';
import ChartTooltip from './ChartTooltip';

const LINE_WIDTH = 4;
// ratio of chart height : max value plotted
const Y_BUFFER = 1.1;

// find min/max value in a line
const getExtremeFromLine = (lineData, mathFn, accessor) => {
  return mathFn(...lineData.map(accessor));
};

// find min/max value in an array of lines
const getExtremeFromLines = (lines, mathFn, accessor) => {
  return mathFn(...lines.map((l) => getExtremeFromLine(l.data, mathFn, accessor)));
};

// calculate x scale for chart
const getXscale = ({ lines, natAvgActive, natAvgLine, xMax }) => {
  const activeLines = [...lines];
  if (natAvgActive) activeLines.push({ data: natAvgLine });

  const min = getExtremeFromLines(activeLines, Math.min, (d) => Number(d.x));
  const max = getExtremeFromLines(activeLines, Math.max, (d) => Number(d.x));

  return scaleLinear({
    domain: [min, max],
    range: [0, xMax],
  });
};

// calculate y scale for chart
const getYscale = ({
  lines,
  confidenceActive,
  confidenceIntervals,
  natAvgActive,
  natAvgLine,
  yMax,
}) => {
  // pin to 0
  const min = 0;
  const activeLines = [...lines];
  if (natAvgActive) activeLines.push({ data: natAvgLine });
  if (confidenceActive) activeLines.push(...confidenceIntervals);

  // look for yHigh from confidenceIntervals, y from lines, fallback to 0
  const maxVal = getExtremeFromLines(activeLines, Math.max, (d) => d.yHigh || d.y || 0);

  // give chart some "breathing room" above highest plotted value
  const max = maxVal * Y_BUFFER;

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
    const { metric_id } = useBubbleContext();
    const natAvgName = useLang('NATIONAL_AVERAGE');
    const yAxisLabel = useLang(`METRIC_${metric_id}`) + ' (%)';
    // if (!locations.length) return null;

    const natAvgData = useNationalAverageData();
    const natAvgLine = !natAvgActive ? [] : getNatAvgLine({ data: natAvgData, metric_id });

    const lines = useLineData(metric_id);
    const confidenceIntervals = useConfidenceIntervalData(metric_id);

    // get chart scales, recalc only if relevant source values change
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    const xScale = useMemo(
      () => getXscale({ lines, natAvgActive, natAvgLine, xMax }),
      [lines, metric_id, natAvgActive],
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
      [natAvgActive, lines, confidenceActive, metric_id],
    );

    // NOTE: be sure to update dependency array.
    const handleTooltip = useCallback(
      (e) => {
        const { x } = localPoint(e) || { x: 0 };
        if (x < margin.left || x > width - margin.right) return;

        // const x0 = xScale.invert(x);
        const x0 = xScale.invert(x - margin.left);
        const year = Math.round(x0);

        const activeLines = [...lines];
        if (natAvgActive)
          activeLines.push({
            data: natAvgLine,
            isNatAvg: true,
            name: natAvgName,
          });

        const tooltipData = { year };
        tooltipData.data = activeLines
          .map(({ data, isNatAvg, GEOID, name }, i) => {
            const { y } = data.find(({ x }) => String(x) === String(year)) || {};

            let yLow = null;
            let yHigh = null;
            if (confidenceActive && GEOID) {
              const confInt = confidenceIntervals.find((ci) => ci.GEOID === GEOID);
              const confIntYr = confInt && confInt.data.find(({ x }) => String(x) === String(year));
              yLow = confIntYr && confIntYr.yLow;
              yHigh = confIntYr && confIntYr.yHigh;
            }
            const color = getColorForIndex(isNatAvg ? -1 : i);
            const yPx = isNumber(y) && yScale(y);
            return { y, yLow, yHigh, yPx, isNatAvg, name, color };
          })
          .filter(({ y }) => isNumber(y));

        // yPx px are measured from top, so min is highest
        const tooltipTop = Math.min(...tooltipData.data.map((d) => d.yPx));
        showTooltip({
          tooltipData,
          tooltipLeft: xScale(year),
          tooltipTop,
        });
      },
      [showTooltip, lines, natAvgActive, confidenceActive],
    );

    const opac = getOpacityInHex(0.13);
    return (
      <div className={clsx('line-chart__root', className)}>
        <svg
          height={height}
          width={width}
          onTouchStart={handleTooltip}
          onTouchMove={handleTooltip}
          onMouseMove={handleTooltip}
          onMouseLeave={hideTooltip}
        >
          <Group left={margin.left} top={margin.top} right={margin.right}>
            {/* add border */}
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
            {/* add y-axis label */}
            {/* TODO: formalize values? */}
            <text
              className="line-chart__y-label"
              x={-300}
              y={-40}
              transform="rotate(-90)"
              fontSize={14}
            >
              {yAxisLabel}
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
                      fill: getColorForIndex(i) + opac,
                    }}
                    // TODO: determine why we need both
                    aboveAreaProps={{
                      fill: getColorForIndex(i) + opac,
                    }}
                  />
                );
              })}
            {lines.map(({ GEOID, name, parent, data }, i) => {
              return (
                <LinePath
                  key={'LinePath' + i}
                  data={data}
                  x={(d) => xScale(d.x)}
                  y={(d) => yScale(d.y)}
                  // defined={() => {}}
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
  },
);

export default LineChart;
