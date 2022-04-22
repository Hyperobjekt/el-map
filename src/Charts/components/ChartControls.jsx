import { Switch, Typography, useMediaQuery } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { BubbleSelect } from "../../Controls";

const ChartControls = ({
  activeMetric,
  onMetricChange,
  onToggleMarginOfError,
  className,
  confidenceActive,
  setConfidenceActive,
  ...props
}) => {
  console.log("CONTROLS CA ", confidenceActive);
  const isMobile = useMediaQuery("(max-width: 600px)"); // = theme.breakpoints.down("sm");

  const selectProps = isMobile
    ? {
        showLabel: true,
        SelectComponent: Select,
      }
    : {};
  return (
    <div className={clsx("chart-controls__root", className)} {...props}>
      <div className="body__content">
        <BubbleSelect {...selectProps} />
        <Typography sx={{ display: "inline", pl: 1 }} variant="h3">
          by Year
        </Typography>
        <Switch
          checked={confidenceActive}
          onChange={() => setConfidenceActive(!confidenceActive)}
        />
      </div>
    </div>
  );
};

export default ChartControls;
