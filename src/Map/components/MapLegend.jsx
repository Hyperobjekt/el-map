import { Box, Divider, Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";
import MapLegendStyle, { VerticalDivider } from "./MapLegend.style";
import {
  useChoroplethScale,
  useBubbleScale,
  useCurrentContext,
  useMetricConfig,
  useBubbleContext,
} from "@hyperobjekt/react-dashboard";
import { Scale } from "@hyperobjekt/scales";

const BubbleItem = ({ label, color, size, stroke, ...props }) => {
  return (
    <Box className="legend__bubble" {...props}>
      <Typography className="legend__bubble-label" variant="caption">
        {label}
      </Typography>
      <div className="legend__bubble-container">
        <div
          className="legend__bubble-circle"
          style={{
            width: size,
            height: size,
            background: color,
            borderColor: stroke,
            borderRadius: size,
          }}
        />
      </div>
    </Box>
  );
};

const MapLegendSection = ({ label, children, className, ...props }) => {
  return (
    <Box className={clsx("legend__section", className)} {...props}>
      <Typography className="legend__section-title" variant="captionBold">
        {label}
      </Typography>
      {children}
    </Box>
  );
};

const MapLegendBubbleSection = () => {
  const bubbleContext = useBubbleContext();
  const { name: bubbleLabel, formatter } = useMetricConfig(
    bubbleContext.metric_id
  );
  const { chunks, color, ...rest } = useBubbleScale(bubbleContext, {
    scale: "bubble",
    nice: true,
  });
  const sizes = [8, 14, 21];
  return (
    <MapLegendSection label="Bubble Size">
      <Box className="legend__bubbles">
        <BubbleItem label="No Data" color="#fff" stroke="#ccc" size={6} />
        {chunks.map((value, i) => {
          return (
            <BubbleItem
              key={i}
              label={formatter(value)}
              color={color(value * 10)}
              stroke="#fff"
              size={sizes[i]}
            />
          );
        })}
      </Box>
    </MapLegendSection>
  );
};

export const MapLegend = ({
  bubbleLabel,
  choroplethLabel,
  ScaleProps,
  TickProps,
  className,
  ...props
}) => {
  return (
    <MapLegendStyle className={clsx("legend", className)} {...props}>
      <MapLegendBubbleSection />
      <VerticalDivider />
      <MapLegendSection label={choroplethLabel}>
        <Box className="legend__choropleth">
          <Scale {...ScaleProps}>
            <Scale.Ticks className="legend__choropleth-ticks" {...TickProps} />
            <Scale.Colors height={16} className="legend__choropleth-colors" />
          </Scale>
        </Box>
      </MapLegendSection>
    </MapLegendStyle>
  );
};

const ConnectedMapLegend = (props) => {
  const { bubbleMetric, choroplethMetric, ...restContext } =
    useCurrentContext();
  const { name: bubbleLabel } = useMetricConfig(bubbleMetric);
  const { name: choroplethLabel } = useMetricConfig(choroplethMetric);
  const choroplethContext = { metric_id: choroplethMetric, ...restContext };
  const bubbleContext = { metric_id: bubbleMetric, ...restContext };
  const choroplethScale = useChoroplethScale(choroplethContext, { nice: true });
  const bubbleScale = useBubbleScale(bubbleContext, {
    scale: "bubble",
    nice: true,
  });
  console.log(choroplethScale, bubbleScale);
  const [min, max] = choroplethScale.position.nice().domain();
  const legendProps = {
    bubbleLabel,
    choroplethLabel,
    ScaleProps: {
      ...choroplethScale.ScaleProps,
      width: 160,
      nice: true,
      min,
      max,
      margin: { top: 0, left: 0, right: 0, bottom: 0 },
    },
    TickProps: {
      ...choroplethScale.TickProps,
      position: "top",
      tickValues: [min, (max + min) / 2, max],
    },
    ...props,
  };
  return <MapLegend {...legendProps} />;
};

export default ConnectedMapLegend;
