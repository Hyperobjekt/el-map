import { Switch, Typography, Select, useMediaQuery, Box } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { BubbleSelect } from "../../Controls";
import { PRIMARY_COLOR } from "../../theme";

const ChartControls = ({
  // activeMetric,
  // onMetricChange,
  // onToggleMarginOfError,
  className,
  confidenceActive,
  setConfidenceActive,
  ...props
}) => {
  console.log("CONTROLS CA ", confidenceActive);
  const isMobile = useMediaQuery("(max-width: 600px)"); // = theme.breakpoints.down("sm");

  const selectProps = isMobile
    ? {
        // showLabel: true,
        SelectComponent: Select,
      }
    : {};
  return (
    <div className={clsx("chart-controls__root", className)} {...props}>
      <div className="body__content">
        <BubbleSelect {...selectProps} />
        <Typography display="inline" pl={1} variant="h4">
          by Year
        </Typography>
        {/* TODO: what if no confints for metric? */}
        <Box display="inline" position="absolute" right="0" pr={3}>
          <Switch
            checked={confidenceActive}
            onChange={() => setConfidenceActive(!confidenceActive)}
          />
          <Typography display="inline" variant="body2">
            CONFIDENCE INTERVAL
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default ChartControls;
