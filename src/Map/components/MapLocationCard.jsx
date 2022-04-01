import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { LocationHeader } from "../../components";
import { getColorForIndex } from "../../utils";
import useMetricsWithData from "../../hooks/useMetricsWithData";
import { useCurrentContext } from "@hyperobjekt/react-dashboard";

const Wrapper = animated(Paper);

const MapCardMetric = ({ value, label, min, max, flag, ...props }) => {
  return (
    <Box {...props}>
      <Typography
        color="textSecondary"
        className="map-card__metric-label"
        variant="body2"
      >
        {label}
      </Typography>
      <Typography className="map-card__metric-value" variant="number">
        {value}
      </Typography>
    </Box>
  );
};

const MapLocationCard = ({
  data,
  index,
  total,
  expanded,
  onDismiss,
  ...props
}) => {
  const pos = total - 1 - index; // reverse order
  const springProps = useSpring({
    zIndex: index,
    x: expanded ? index * 216 : pos * 16,
  });
  const { bubbleMetric, choroplethMetric } = useCurrentContext();
  const countMetric = bubbleMetric.slice(0, -1);
  const cardMetrics = [bubbleMetric, countMetric, choroplethMetric];
  const metrics = useMetricsWithData(data, cardMetrics);
  return (
    <Wrapper style={springProps} {...props}>
      <LocationHeader
        className="map-card__header"
        name={data?.n}
        parentName={data?.pl}
        color={getColorForIndex(index)}
        onDismiss={onDismiss}
      />
      <div className="map-card__metrics">
        {metrics.map(({ id, formattedValue, name }) => (
          <MapCardMetric
            key={id}
            className="map-card__metric"
            value={formattedValue}
            label={name}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default MapLocationCard;
