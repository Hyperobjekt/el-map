import { Switch, Typography, Select, useMediaQuery, Box } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { BubbleSelect } from '../../Controls';
import { PRIMARY_COLOR } from '../../theme';
import { useLang } from '@hyperobjekt/react-dashboard';

const ChartControls = ({ className, confidenceActive, setConfidenceActive, ...props }) => {
  const isMobile = useMediaQuery('(max-width: 600px)'); // = theme.breakpoints.down("sm");

  const selectProps = isMobile
    ? {
        // showLabel: true,
        SelectComponent: Select,
      }
    : {};
  return (
    <div className={clsx('chart-controls__root', className)} {...props}>
      <div className="body__content">
        <BubbleSelect {...selectProps} />
        <Typography display="inline" pl={1} variant="h4">
          {useLang('BY_YEAR')}
        </Typography>
        <Box className="chart-controls__confidence-switch">
          <Switch
            checked={confidenceActive}
            onChange={() => setConfidenceActive(!confidenceActive)}
          />
          <Typography variant="body2">{useLang('CONFIDENCE_INTERVAL')}</Typography>
        </Box>
      </div>
    </div>
  );
};

export default ChartControls;
