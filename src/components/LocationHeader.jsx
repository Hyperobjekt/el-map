import { Box, ButtonBase, IconButton, styled, Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { Close, Marker } from "../Icons";
import theme from "../theme";
const LocationHeaderStyles = styled(Box)`
  position: relative;
  .location-header__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    gap: ${theme.spacing(2)};
    width: 100%;
    height: 140px;
    padding-bottom: ${theme.spacing(4)};
    box-shadow: inset 0 -10px 0 0 currentColor;
    padding-right: ${theme.spacing(4)};
  }
  .location-header__name {
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-size: 20px;
  }
  .location-header__marker {
    margin-bottom: ${theme.spacing(0.5)};
    width: 32px;
  }
  .location-header__close {
    position: absolute;
    right: 0;
    top: 0;
    // margin-bottom: ${theme.spacing(2)};
  }
`;

const LocationHeader = ({
  name,
  parentName,
  color,
  marker,
  onClick,
  onDismiss,
  className,
  children,
  ...props
}) => {
  return (
    <LocationHeaderStyles sx={{ color }} {...props} className={className}>
      <Box
        component={onClick ? ButtonBase : undefined}
        className="location-header__wrapper"
        onClick={onClick}
      >
        {marker && (
          <Marker className="location-header__marker" style={{ color }} />
        )}
        <Box
          className="location-header__name-wrapper"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          flex={1}
        >
          <Typography
            className="location-header__name"
            variant="h3"
            align="left"
          >
            {name}
          </Typography>
          <Typography
            className="location-header__parent-name"
            variant="parentName"
            align="left"
          >
            {parentName}
          </Typography>
          {children}
        </Box>
      </Box>
      {onDismiss && (
        <IconButton className="location-header__close" onClick={onDismiss}>
          <Close aria-label={`Remove ${name}`} />
        </IconButton>
      )}
    </LocationHeaderStyles>
  );
};

export default LocationHeader;
