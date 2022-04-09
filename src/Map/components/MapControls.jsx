import { Box, Button, Paper, Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";
import {
  ChoroplethSelect,
  BubbleSelect,
  RegionSelect,
  YearSelect,
} from "../../Controls";
import useDataMode from "../../hooks/useDataMode";
import { useLang } from "@hyperobjekt/react-dashboard";

const MapControls = ({ className, ...props }) => {
  const [dataMode, setDataMode] = useDataMode();
  const handleModeSwitch = () => {
    const newMode = dataMode === "modelled" ? "raw" : "modelled";
    setDataMode(newMode);
  };
  const buttonLabel = useLang(`BUTTON_${dataMode}`);
  return (
    <Box className={clsx("controls", className)} {...props}>
      <Paper sx={{ p: 2, display: "flex", borderRadius: `2px 0 0  2px` }}>
        <Box className="controls__selectors">
          <BubbleSelect />
          <span> and </span>
          <ChoroplethSelect />
          <span> for </span>
          <RegionSelect />
          <span> in </span>
          <YearSelect />
        </Box>
      </Paper>
      {/* TODO */}
      <Box className="controls__actions">
        <Button
          sx={{
            ml: `-1px`,
            height: "100%",
            borderRadius: `0 2px 2px 0`,
            pointerEvents: "all",
          }}
          variant="contained"
          className="controls__data-options"
          onClick={handleModeSwitch}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default MapControls;
