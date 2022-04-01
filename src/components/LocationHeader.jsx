import { Box, IconButton, styled, Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { Close, Marker } from "../Icons";
import theme from "../theme";

const LocationHeaderStyles = styled(Box)`
  position: relative;
  height: 140px;
  padding-bottom: ${theme.spacing(4)};
  box-shadow: inset 0 -10px 0 0 currentColor;
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
    margin-bottom: ${theme.spacing(2)};
  }
`;

const LocationHeader = ({
  name,
  parentName,
  color,
  marker,
  onDismiss,
  className,
  children,
  ...props
}) => {
  return (
    <LocationHeaderStyles
      display="flex"
      alignItems="flex-end"
      gap={2}
      className={clsx("location-header__root", className)}
      sx={{ color }}
      {...props}
    >
      {marker && (
        <Marker className="location-header__marker" style={{ color }} />
      )}
      <Box
        className="location-header__name-wrapper"
        display="flex"
        flexDirection="column"
        flex={1}
      >
        <Typography className="location-header__name" variant="h3">
          {name}
        </Typography>
        <Typography
          className="location-header__parent-name"
          variant="parentName"
        >
          {parentName}
        </Typography>
        {children}
      </Box>
      <IconButton className="location-header__close" onClick={onDismiss}>
        <Close aria-label={`Remove ${name}`} />
      </IconButton>
    </LocationHeaderStyles>
  );
};

export default LocationHeader;
