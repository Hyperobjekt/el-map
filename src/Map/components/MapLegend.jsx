import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import {
  useChoroplethScale,
  useBubbleScale,
  useMetricConfig,
  useBubbleContext,
  useChoroplethContext,
  useAccessor,
  useLang,
} from '@hyperobjekt/react-dashboard';
import { Scale } from '@hyperobjekt/scales';
import { useMapState } from '@hyperobjekt/mapgl';
import { animated, useSpring } from '@react-spring/web';
import { MapLegendStyle } from './MapLegend.style';
import DataMode from './DataMode';
import HintTypography from '../../components/HintTypography';

/**
 * Renders a circle and label for the bubble legend.
 * Animates between values.
 */
const BubbleItem = ({ label, color, size, stroke, className, ...props }) => {
  const bubbleProps = useSpring({
    width: size,
    height: size,
  });
  return (
    <animated.div className={clsx('legend__bubble', className)} {...props}>
      {label && (
        <Typography className="legend__bubble-label" variant="caption">
          {label}
        </Typography>
      )}
      <div className="legend__bubble-container">
        <animated.div
          className="legend__bubble-circle"
          style={{
            ...bubbleProps,
            background: color,
            borderColor: stroke,
            borderRadius: '100%',
          }}
        />
      </div>
    </animated.div>
  );
};

/**
 * Container component for map legend sections.  Displays a
 * metric label above any provided children.
 */
const MapLegendSection = ({ label, children, hint, className, ...props }) => {
  return (
    <Box className={clsx('legend__section', className)} {...props}>
      <HintTypography className="legend__section-title" hint={hint} variant="captionBold">
        {label}
      </HintTypography>
      {children}
    </Box>
  );
};

/**
 * Displays a bubble legend for the eviction metric.
 */
const MapLegendBubbleSection = ({ metricId, regionId, year, value, ...props }) => {
  const { name: bubbleLabel, formatter, hint } = useMetricConfig(metricId);
  const context = {
    metric_id: metricId,
    region_id: regionId,
    year: year,
    type: 'bubble',
  };
  const { chunks, color, position, size, ...rest } = useBubbleScale(context, {
    scale: 'bubble',
    nice: true,
  });
  const sizes = [8, 14, 21];
  // maps value to index, used inverted to map size indexes to value
  const valueToIndex = position.copy().range([0, chunks.length - 1]);
  // maps any bubble values to a size
  const valueToSize = position.copy().range([sizes[0], sizes[2]]);
  // animated props for positioning the bubble
  const hoverBubbleProps = useSpring({
    left: Number.isFinite(value) ? `${position(value) * 100}%` : '0%',
    opacity: Number.isFinite(value) ? 1 : 0,
  });

  const noData = useLang('NO_DATA');
  return (
    <MapLegendSection label={bubbleLabel} hint={hint} {...props}>
      <Box className="legend__bubbles">
        <BubbleItem
          className="legend__bubble--no-data"
          label={noData}
          color="#fff"
          stroke="#ccc"
          size={6}
        />
        <Box className="legend__data-bubbles">
          {chunks.map((value, i) => {
            return (
              <BubbleItem
                key={i}
                label={formatter(valueToIndex.invert(i))}
                color={color(valueToIndex.invert(i))}
                stroke="#fff"
                size={sizes[i]}
              />
            );
          })}
          <Box className="legend__bubble-connector" />
          <Box className="legend__hover-bubble">
            <BubbleItem
              style={{
                ...hoverBubbleProps,
                position: 'absolute',
                top: 16,
                transform: 'translateX(-50%)',
              }}
              size={valueToSize(value)}
              stroke="#f00"
            />
          </Box>
        </Box>
      </Box>
    </MapLegendSection>
  );
};

/**
 * Choropleth section of the map legend.  Shows a no data marker and
 * then a gradient scale for the choropleth metric.
 */
const MapLegendChoroplethSection = ({ metricId, regionId, year, value, ...props }) => {
  const choroplethContext = {
    metric_id: metricId,
    region_id: regionId,
    year: year,
    type: 'choropleth',
  };
  const { name: choroplethLabel, hint } = useMetricConfig(metricId);
  const choroplethScale = useChoroplethScale(choroplethContext, { nice: true });
  const [min, max] = choroplethScale.position.nice().domain();
  const ScaleProps = {
    ...choroplethScale.ScaleProps,
    width: 160,
    nice: true,
    min,
    max,
    margin: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  const TickProps = {
    ...choroplethScale.TickProps,
    position: 'top',
    tickValues: [min, (max + min) / 2, max],
  };

  const noData = useLang('NO_DATA');
  return (
    <MapLegendSection label={choroplethLabel} hint={hint} {...props}>
      <Box className="legend__choropleth">
        <Box className="legend__choropleth-no-data">
          <Typography className="legend__no-data-label">{noData}</Typography>
          <div className="legend__no-data-marker" />
        </Box>
        <Scale {...ScaleProps}>
          <Scale.Ticks className="legend__choropleth-ticks" {...TickProps} />
          <Scale.Marker className="legend__choropleth-marker" value={value} pointer />
          <Scale.Colors height={16} className="legend__choropleth-colors" />
        </Scale>
      </Box>
    </MapLegendSection>
  );
};

/**
 * Renders the full map legend.  Provides data to legend sections.
 */
export const MapLegend = ({
  bubbleLabel,
  choroplethLabel,
  ScaleProps,
  TickProps,
  className,
  ...props
}) => {
  const accessor = useAccessor();
  const bubbleContext = useBubbleContext();
  const bubbleKey = accessor(bubbleContext);
  const choroplethContext = useChoroplethContext();
  const choroplethKey = accessor(choroplethContext);
  const currentLocation = useMapState('hoveredFeature');
  const bubbleValue = currentLocation?.properties?.[bubbleKey];
  const choroplethValue = currentLocation?.properties?.[choroplethKey];

  return (
    <MapLegendStyle className={clsx('legend__root', className)} {...props}>
      <Box className="legend__actions">
        <DataMode
          ButtonProps={{
            className: 'legend__data-mode-button',
            size: 'small',
            color: 'primary',
            variant: 'text',
          }}
        />
      </Box>
      <MapLegendBubbleSection
        metricId={bubbleContext.metric_id}
        regionId={bubbleContext.region_id}
        year={bubbleContext.year}
        value={bubbleValue}
      />
      {choroplethContext.metric_id && (
        <>
      <div className="legend__divider" />
      <MapLegendChoroplethSection
        metricId={choroplethContext.metric_id}
        regionId={choroplethContext.region_id}
        year={choroplethContext.year}
        value={choroplethValue}
        />
        </>
      )}
    </MapLegendStyle>
  );
};

export default MapLegend;
