import { Box, IconButton, Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { Close, Marker } from "../../Icons";

const ChartLegendItem = ({
  name,
  parentName,
  value,
  color,
  onDismiss,
  className,
  ...props
}) => {
  return (
    <div className={clsx("chart-legend-item__root", className)} {...props}>
      <Marker style={{ color }} />
      <Box display="flex" flexDirection="column">
        <Typography variant="h3">{name}</Typography>
        <Typography variant="body2">{parentName}</Typography>
      </Box>
      <IconButton onClick={onDismiss}>
        <Close aria-label={`Remove ${name}`} />
      </IconButton>
    </div>
  );
};

export default ChartLegendItem;
