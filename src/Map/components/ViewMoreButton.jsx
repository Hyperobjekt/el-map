import { Button } from '@mui/material';
import React from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useLang, useLocationData } from '@hyperobjekt/react-dashboard';
import { ArrowDown } from '../../Icons';
import { trackEvent } from '../../utils';

const AnimatedButton = animated(Button);

const ViewMoreButton = ({ show, ...props }) => {
  const selectedLocations = useLocationData();
  const locationCount = selectedLocations.length;
  const langKey = locationCount > 1 ? 'BUTTON_VIEW_COMPARISON' : 'BUTTON_VIEW_MORE';
  const buttonLabel = useLang(langKey);
  const handleViewMore = () => {
    document.querySelector('#target-scorecards')?.scrollIntoView({
      behavior: 'smooth',
    });
    trackEvent('viewMoreData');
  };
  const springProps = useSpring({
    y: locationCount > 0 && show ? 0 : 100,
  });
  return (
    <AnimatedButton
      style={springProps}
      variant="contained"
      color="primary"
      onClick={handleViewMore}
      sx={{
        flexDirection: 'column',
        height: 64,
        gap: 0.5,
      }}
      {...props}
    >
      <span>{buttonLabel}</span>
      <ArrowDown aria-hidden="true" />
    </AnimatedButton>
  );
};

export default ViewMoreButton;
