import React from 'react';
import { useBubbleOptions, useDashboardState, useLang } from '@hyperobjekt/react-dashboard';
import InlineSelect from './InlineSelect';
import { Divider, MenuItem, Typography } from '@mui/material';
import { trackEvent } from '../../utils';
import useDataMode from '../../hooks/useDataMode';
import _ from 'lodash';

const BubbleSelect = (props) => {
  const bubbleOptions = useBubbleOptions();
  const bubbleMetric = useDashboardState('bubbleMetric');
  const setBubbleMetric = useDashboardState('setBubbleMetric');
  const [label, unavailableText, unavailableLabel, unavailableHint] = useLang([
    'SELECT_BUBBLE_LABEL',
    'SELECT_BUBBLE_UNAVAILABLE',
    'UNAVAILABLE_LABEL',
    'UNAVAILABLE_METRIC',
  ]);
  const availableOptions = bubbleOptions.filter((option) => !option.unavailable);
  const unavailableOptions = bubbleOptions.filter((option) => option.unavailable);
  const hasUnavailable = unavailableOptions.length > 0;
  const [dataMode] = useDataMode();
  const handleSelect = (e) => {
    const val = e.target.value;
    setBubbleMetric(val);
    const op = bubbleOptions.find(({ id }) => id === val);
    trackEvent('evictionDataSelection', {
      evictionDataType: _.get(op, 'name', val),
      datasetType: dataMode,
    });
  };
  const isUnavailable = unavailableOptions.find((option) => option.id === bubbleMetric);

  return (
    <InlineSelect
      id="select_bubble"
      className="select_bubble"
      label={label}
      value={bubbleMetric}
      options={availableOptions}
      hint={isUnavailable ? unavailableHint : undefined}
      onChange={handleSelect}
      {...props}
    >
      {hasUnavailable && <Divider />}
      {hasUnavailable && (
        <Typography variant="overline" color="textSecondary" sx={{ pl: 2 }}>
          {unavailableLabel}
        </Typography>
      )}
      {unavailableOptions.map(({ id, name }) => (
        <MenuItem key={id} value={id} disabled>
          {name}
        </MenuItem>
      ))}
      {unavailableText && (
        <Typography variant="selectHint" sx={{ p: 2 }}>
          {unavailableText}
        </Typography>
      )}
    </InlineSelect>
  );
};

export default BubbleSelect;
