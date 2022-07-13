import { Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Info } from '../Icons';

const ICON_PROPS = {
  style: { width: '1em', height: '1em', color: '#999' },
};

const TOOLTIP_PROPS = {
  arrow: true,
  placement: 'top',
};

/**
 * This is the Mui Typography component, wrapped in an optional tooltip hint.
 * Can be used for icon or underline styled text hints.
 */
const HintTypography = ({
  hint,
  TooltipProps = TOOLTIP_PROPS,
  IconProps = ICON_PROPS,
  Icon = Info,
  underline = false,
  display = 'flex',
  children,
  ...props
}) => {
  if (!hint) {
    return <Typography {...props}>{children}</Typography>;
  }
  return (
    <Tooltip title={hint} {...TooltipProps}>
      <Typography
        sx={{
          display,
          gap: children ? '0.5em' : 0,
          alignItems: 'center',
          borderBottom: underline ? '2px dotted #c6cccf' : '',
        }}
        {...props}
      >
        {children && <span>{children}</span>}
        {Icon && <Icon {...IconProps} />}
      </Typography>
    </Tooltip>
  );
};

export default HintTypography;
