import { Box, Paper } from "@mui/material";
import clsx from "clsx";
import React from "react";
import {
  ChoroplethSelect,
  BubbleSelect,
  RegionSelect,
  YearSelect,
} from "../../Controls";
import { MapControlsStyles } from "../Map.style";
import DataModeModal from "./DataModeModal";

const MapControls = ({ className, ...props }) => {
  return (
    <MapControlsStyles className={clsx("map-controls", className)} {...props}>
      <Paper>
        <Box className="map-controls__selectors">
          <BubbleSelect />
          <span> and </span>
          <ChoroplethSelect />
          <span> for </span>
          <RegionSelect />
          <span> in </span>
          <YearSelect />
        </Box>
        <DataModeModal />
      </Paper>
      <Box className="map-controls__actions"></Box>
    </MapControlsStyles>
  );
};

export default MapControls;
