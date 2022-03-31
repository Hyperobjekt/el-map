import { Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";

const ChartControls = ({
  activeMetric,
  onMetricChange,
  onToggleMarginOfError,
  className,
  ...props
}) => {
  return (
    <div className={clsx("chart-controls__root", className)} {...props}>
      <div className="body__content">
        <Typography variant="h3">Eviction Filing Rate by Year</Typography>
      </div>
    </div>
  );
};

export default ChartControls;
