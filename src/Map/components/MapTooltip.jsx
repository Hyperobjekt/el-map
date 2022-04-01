import React, { useRef } from "react";
import { useMetricsWithData, useMousePosition } from "../../hooks";
import { animated, useSpring } from "@react-spring/web";
import { useMapState } from "@hyperobjekt/mapgl";
import { Typography } from "@mui/material";
import { useCurrentContext, useLang } from "@hyperobjekt/react-dashboard";
import { Box } from "@mui/system";
const MapTooltip = () => {
  const { x, y } = useMousePosition();
  const hoveredFeature = useMapState("hoveredFeature");
  const data = hoveredFeature?.properties;
  const { bubbleMetric } = useCurrentContext();
  const dataRef = useRef(null);
  if (data) dataRef.current = data;
  const metrics = useMetricsWithData(dataRef.current, [bubbleMetric]);
  const tooltipDescription = useLang(`TOOLTIP_${bubbleMetric}`, {
    value: metrics[0].formattedValue,
  });
  // animated props for positioning + showing and hiding tooltip
  const wrapperProps = useSpring({
    x: x,
    y: y,
    opacity: hoveredFeature ? 1 : 0,
  });
  // keep a ref to the data so we can gracefully fade out tooltip

  return (
    <animated.div className="map__tooltip-wrapper" style={wrapperProps}>
      <div className="map__tooltip">
        <Box display="flex" flexDirection="column" gap={0.75}>
          <Typography className="map__tooltip-name" variant="h5">
            {dataRef.current?.n}
          </Typography>
          <Typography className="map__tooltip-parent" variant="captionBold">
            {dataRef.current?.pl}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={0.5}>
          <Typography variant="caption" className="map__tooltip-description">
            {tooltipDescription}
          </Typography>
        </Box>
      </div>
    </animated.div>
  );
};

export default MapTooltip;
