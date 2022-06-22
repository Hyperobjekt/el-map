import React from 'react';
import { useLang } from '@hyperobjekt/react-dashboard';
import { Button } from '@mui/material';
import { ArrowUp } from '../../Icons';

/**
 * Returns to the top of the page when clicked, which
 * triggers the map to be re-activated.
 */
const BackToMapButton = ({ sx = {}, ...props }) => {
  const handleScrollToTop = () => {
    window?.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  const buttonLabel = useLang('BUTTON_BACK_TO_MAP');
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleScrollToTop}
      sx={{
        flexDirection: 'column',
        height: 64,
        gap: 0.5,
        ...sx,
      }}
      {...props}
    >
      <ArrowUp aria-hidden="true" />
      <span>{buttonLabel}</span>
    </Button>
  );
};

export default BackToMapButton;
