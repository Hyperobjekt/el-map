import { Box, Paper } from "@mui/material";
import clsx from "clsx";
import React from "react";
import {
  ChoroplethSelect,
  BubbleSelect,
  RegionSelect,
  YearSelect,
} from "../../Controls";
import { MapControlsStyles } from "./MapControls.style";
import DataMode from "./DataMode";

const MapControls = ({ className, ...props }) => {
  return (
    <MapControlsStyles className={clsx("map-controls", className)} {...props}>
      <Paper>
        <DataMode ButtonProps={{ sx: { mr: -1, pl: 2, pr: 2 } }} />
        <div class="divider" />
        <Box className="map-controls__selectors">
          <BubbleSelect />
          <span> and </span>
          <ChoroplethSelect />
          <span> for </span>
          <RegionSelect />
          <span> in </span>
          <YearSelect />
        </Box>
      </Paper>
    </MapControlsStyles>
  );
};

export default MapControls;
