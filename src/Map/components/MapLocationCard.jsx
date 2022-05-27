import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import clsx from "clsx";
import { animated, useSpring } from "@react-spring/web";
import { LocationHeader } from "../../components";
import { getColorForIndex } from "../../utils";
import useMetricsWithData from "../../hooks/useMetricsWithData";
import { useCurrentContext, useLang } from "@hyperobjekt/react-dashboard";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MetricFlag from "../../components/MetricFlag";

const Wrapper = animated(Paper);

const MapCardMetric = ({ value, label, min, max, Flag, ...props }) => {
  const showCI = min && max && (min !== value || max !== value);
  return (
    <Box {...props}>
      <Typography
        color="textSecondary"
        className="map-card__metric-label"
        variant="body2"
      >
        {label}
      </Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography className="map-card__metric-value" variant="number">
          {value}
        </Typography>
        {showCI && (
          <Box
            display="flex"
            flexDirection="column"
            gap={0.25}
            className="map-card__ci"
          >
            <Typography component="div" variant="caption" color="textSecondary">
              <span>MIN:</span> <strong>{min}</strong>
            </Typography>
            <Typography component="div" variant="caption" color="textSecondary">
              <span>MAX:</span> <strong>{max}</strong>
            </Typography>
          </Box>
        )}
        {Flag}
      </Box>
    </Box>
  );
};

const MapLocationCard = ({
  data,
  index,
  total,
  expanded,
  onHeaderClick,
  onDismiss,
  className,
  ...props
}) => {
  const theme = useTheme();
  const isMdAndUp = useMediaQuery(theme.breakpoints.up("md"));
  const pos = total - 1 - index; // reverse order
  const springProps = useSpring({
    zIndex: index,
    x: expanded ? index * 216 : pos * 16,
  });
  const currentContext = useCurrentContext();
  // console.log({currentContext});
  const { bubbleMetric, choroplethMetric, year, region_id } = currentContext;
  const countMetric = bubbleMetric.slice(0, -1);
  const cardMetrics = [bubbleMetric, countMetric, choroplethMetric];
  const metrics = useMetricsWithData(data, cardMetrics);
  // console.log({ metrics })
  const unavailableLabel = useLang("UNAVAILABLE_LABEL");
  return (
    <Wrapper
      className={clsx("map-card__root", className)}
      style={isMdAndUp ? springProps : undefined}
      {...props}
    >
      <LocationHeader
        className="map-card__header"
        name={data?.n}
        parentName={data?.pl}
        color={getColorForIndex(index)}
        onClick={onHeaderClick}
        onDismiss={onDismiss}
      />
      <div className="map-card__metrics">
        {metrics.map(({ id, value, min, max, formatter, name }) => (
          <MapCardMetric
            key={id}
            className="map-card__metric"
            value={Number.isFinite(value) ? formatter(value) : unavailableLabel}
            min={Number.isFinite(min) ? formatter(min) : null}
            max={Number.isFinite(max) ? formatter(max) : null}
            label={name}
            Flag={<MetricFlag
              geoid={data?.GEOID}
              region={region_id}
              year={year}
              metricId={id}
              value={value}
            />}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default MapLocationCard;
