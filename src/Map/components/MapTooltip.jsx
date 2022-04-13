import React, { useRef } from "react";
import { useMetricsWithData, useMousePosition } from "../../hooks";
import { animated, useSpring } from "@react-spring/web";
import { useMapState } from "@hyperobjekt/mapgl";
import { Divider, Typography } from "@mui/material";
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
  const descriptionKey = Number.isFinite(metrics[0].value)
    ? `TOOLTIP_${bubbleMetric}`
    : "TOOLTIP_UNAVAILABLE";
  const tooltipDescription = useLang(descriptionKey, {
    value: metrics[0].formattedValue,
  });
  const tooltipHint = useLang("TOOLTIP_HINT");
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
        <Box display="flex" flexDirection="column" gap={0.75}>
          <Typography variant="caption" className="map__tooltip-description">
            {tooltipDescription}
          </Typography>
          <Divider />
          <Typography variant="caption" className="map__tooltip-hint">
            {tooltipHint}
          </Typography>
        </Box>
      </div>
    </animated.div>
  );
};

export default MapTooltip;
