import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import { LocationHeader } from '../../components';
import { getColorForIndex, getIsSuppressed } from '../../utils';
import useMetricsWithData from '../../hooks/useMetricsWithData';
import { useCurrentContext, useLang } from '@hyperobjekt/react-dashboard';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MetricFlag from '../../components/MetricFlag';
import { getFormattedValues } from '../../components/utils';
import useDataMode from '../../hooks/useDataMode';
import useFlagData from '../../hooks/useFlagData';

const Wrapper = animated(Paper);

const MapCardMetric = ({ value, label, min, max, Flag, ...props }) => {
  const showCI = min && max && (min !== value || max !== value);
  return (
    <Box {...props}>
      <Typography color="textSecondary" className="map-card__metric-label" variant="body2">
        {label}
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography className="map-card__metric-value" variant="number">
          {value}
        </Typography>
        {showCI && (
          <Box display="flex" flexDirection="column" gap={0.25} className="map-card__ci">
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
  const isMdAndUp = useMediaQuery(theme.breakpoints.up('md'));
  const pos = total - 1 - index; // reverse order
  const springProps = useSpring({
    zIndex: index,
    to: { x: expanded ? index * 216 : pos * 16 },
    from: { x: -300 },
    reset: false,
  });
  const currentContext = useCurrentContext();
  const { bubbleMetric, choroplethMetric, year, region_id } = currentContext;
  const countMetric = bubbleMetric.slice(0, -1);
  const cardMetrics = [bubbleMetric, countMetric, choroplethMetric].filter((m) => !!m);
  const metrics = useMetricsWithData(data, cardMetrics);
  const [dataMode] = useDataMode();
  const flagData = useFlagData();
  const hiddenLabel = useLang('HIDDEN_LABEL');
  const unavailableLabel = useLang('UNAVAILABLE_LABEL');

  return (
    <Wrapper
      className={clsx('map-card__root', className)}
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
        {metrics.map((metric) => {
          const { id, value, name } = metric;

          const isSuppressed = getIsSuppressed({
            flagData,
            dataMode,
            metricId: id,
            geoid: data?.GEOID,
            year,
          });
          const { fMin, fMax, fVal, meaningfulCI } = isSuppressed
            ? { fVal: hiddenLabel }
            : getFormattedValues(metric);

          return (
            <MapCardMetric
              key={id}
              className="map-card__metric"
              value={fVal || unavailableLabel}
              min={(meaningfulCI && fMin) || null}
              max={(meaningfulCI && fMax) || null}
              label={name}
              Flag={
                <MetricFlag
                  geoid={data?.GEOID}
                  region={region_id}
                  year={year}
                  metricId={id}
                  value={value}
                />
              }
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default MapLocationCard;
