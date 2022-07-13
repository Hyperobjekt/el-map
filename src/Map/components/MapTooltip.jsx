import React, { useRef } from 'react';
import { useMetricsWithData, useMousePosition } from '../../hooks';
import { animated, useSpring } from '@react-spring/web';
import { useMapState } from '@hyperobjekt/mapgl';
import { Divider, Typography } from '@mui/material';
import { useCurrentContext, useLang, useDashboardStore } from '@hyperobjekt/react-dashboard';
import { Box } from '@mui/system';
import { MapTooltipWrapper } from './MapTooltip.style';
import useDataMode from '../../hooks/useDataMode';
import useFlagData from '../../hooks/useFlagData';
import { getIsSuppressed } from '../../utils';
import { getFormattedValues } from '../../components/utils';

const Wrapper = animated(MapTooltipWrapper);

const MapTooltip = () => {
  const { x, y } = useMousePosition();
  const hoveredFeature = useMapState('hoveredFeature');
  const data = hoveredFeature?.properties;
  const { bubbleMetric, year } = useCurrentContext();
  const dataRef = useRef(null);
  if (data) dataRef.current = data;
  const [metric] = useMetricsWithData(dataRef.current, [bubbleMetric]);

  const [dataMode] = useDataMode();
  const flagData = useFlagData();
  // suppressed data should be hidden
  const isSuppressed = getIsSuppressed({
    flagData,
    dataMode,
    metricId: metric?.id,
    geoid: data?.GEOID,
    year,
  });

  const descriptionKey = isSuppressed
    ? 'FLAG_UNDERCOUNT_RATE_1'
    : Number.isFinite(metric?.value)
    ? `TOOLTIP_${bubbleMetric}`
    : 'TOOLTIP_UNAVAILABLE';
  let tooltipDescription = useLang(descriptionKey, {
    value: getFormattedValues(metric).fVal,
  });
  if (bubbleMetric === 'efr') {
    tooltipDescription = tooltipDescription.replace('%', '');
  }
  const tooltipHint = useLang('TOOLTIP_HINT');
  // animated props for positioning + showing and hiding tooltip
  const wrapperProps = useSpring({
    x: x,
    y: y,
    opacity: hoveredFeature ? 1 : 0,
  });
  // keep a ref to the data so we can gracefully fade out tooltip

  const embed = useDashboardStore((state) => state.embed);

  return (
    <Wrapper className="map__tooltip-wrapper" style={wrapperProps}>
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
          {!embed && !!hoveredFeature?.properties.n && (
            <Typography variant="caption" className="map__tooltip-hint">
              {tooltipHint}
            </Typography>
          )}
        </Box>
      </div>
    </Wrapper>
  );
};

export default MapTooltip;
