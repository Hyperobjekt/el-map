import { Box, Paper, Select, useMediaQuery } from "@mui/material";
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
import { animated, useSpring } from "@react-spring/web";
import useMobileControls from "../../hooks/useMobileControls";

const Wrapper = animated(MapControlsStyles);

const MapControls = ({ className, ...props }) => {
  const isMobile = useMediaQuery("(max-width: 600px)"); // = theme.breakpoints.down("sm");
  const [mobileControls] = useMobileControls();
  // uses a different select component for mobile and shows the label
  const selectProps = isMobile
    ? {
        showLabel: true,
        SelectComponent: Select,
      }
    : {};
  const isHidden = isMobile && !mobileControls;
  // TODO: add `visibility: hidden` if isHidden
  const springProps = useSpring({
    y: isHidden ? "-100%" : "0%",
  });
  return (
    <Wrapper
      className={clsx("map-controls", className)}
      style={springProps}
      {...props}
    >
      <Paper className="map-controls__paper">
        <DataMode />
        <div className="divider" />
        <Box className="map-controls__selectors">
          <BubbleSelect {...selectProps} />
          <span> and </span>
          <ChoroplethSelect {...selectProps} />
          <span> for </span>
          <RegionSelect {...selectProps} />
          <span> in </span>
          <YearSelect {...selectProps} />
        </Box>
      </Paper>
    </Wrapper>
  );
};

export default MapControls;
