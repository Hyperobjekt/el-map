import React, { useState } from "react";
import ChartsStyle from "./Charts.style";
import { ChartControls, LineChart } from "./components";
import {
  useCurrentContext,
  useLocationData,
  useRemoveLocation,
} from "@hyperobjekt/react-dashboard";
import { useMaxLocations } from "../hooks";
import { Box } from "@mui/system";
import { LocationHeader } from "../components";
import { getColorForIndex } from "../utils";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import clsx from "clsx";

const Charts = () => {
  const [natAvgActive, setNatAvgActive] = useState(false);
  const [confidenceActive, setConfidenceActive] = useState(false);
  console.log("CHART CA ", confidenceActive);

  const { bubbleMetric } = useCurrentContext(); // { bubbleMetric, choroplethMetric, year, region_id, ... }
  const maxLocations = useMaxLocations();
  const locations = useLocationData(maxLocations);
  const removeLocation = useRemoveLocation();
  // TODO: implement handlers
  const handleDismissLocation = (location) => (event) => {
    removeLocation(location);
  };
  const handleChartHover = () => {};
  const handleToggleMarginOfError = () => {};
  const handleMetricChange = () => {};
  return (
    <ChartsStyle className="charts__root">
      <ChartControls
        className="charts__controls"
        activeMetric={bubbleMetric}
        confidenceActive={confidenceActive}
        setConfidenceActive={setConfidenceActive}
        onMetricChange={handleMetricChange}
        onToggleMarginOfError={handleToggleMarginOfError}
      />
      <div className="charts__chart-wrapper body__content">
        <ParentSize>
          {({ width, height }) => (
            <LineChart
              className="charts__line-chart"
              locations={locations}
              natAvgActive={natAvgActive}
              confidenceActive={confidenceActive}
              onHover={handleChartHover}
              width={width}
              height={400}
              margin={{
                left: 80,
                right: 20,
                top: 60,
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
            name="National Average"
            className={clsx("charts__nat-avg-legend-item", {
              active: natAvgActive,
            })}
            onDismiss={() => setNatAvgActive(!natAvgActive)}
            // onClick={(e) => console.log(e) || setNatAvgActive(false)}
            color={getColorForIndex(natAvgActive ? -1 : -5)}
          />
        </Box>
      </div>
    </ChartsStyle>
  );
};

export default Charts;
