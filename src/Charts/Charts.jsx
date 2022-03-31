import React from "react";
import ChartsStyle from "./Charts.style";
import { ChartControls, ChartLegendItem, LineChart } from "./components";
import {
  useCurrentContext,
  useLocationData,
} from "@hyperobjekt/react-dashboard";
import { useMaxLocations } from "../hooks";
import { Box } from "@mui/system";

const Charts = () => {
  const { bubbleMetric } = useCurrentContext();
  const maxLocations = useMaxLocations();
  const locations = useLocationData(maxLocations);
  // TODO: implement handlers
  const handleDismissLocation = () => {};
  const handleChartHover = () => {};
  const handleToggleMarginOfError = () => {};
  const handleMetricChange = () => {};
  console.log({ locations });
  return (
    <ChartsStyle className="charts__root">
      <ChartControls
        className="charts__controls"
        activeMetric={bubbleMetric}
        onMetricChange={handleMetricChange}
        onToggleMarginOfError={handleToggleMarginOfError}
      />
      <div className="charts__chart-wrapper body__content">
        <LineChart
          className="charts__line-chart"
          locations={locations}
          onHover={handleChartHover}
        />
        <Box className="charts__legend">
          {locations.map(({ GEOID, n, pl, color }) => (
            <ChartLegendItem
              key={GEOID}
              name={n}
              parentName={pl}
              color={color}
              onDismiss={handleDismissLocation}
            />
          ))}
          <ChartLegendItem name="United States" color="#94aabd" />
        </Box>
      </div>
    </ChartsStyle>
  );
};

export default Charts;
