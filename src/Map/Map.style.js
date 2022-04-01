import { Box, styled } from "@mui/material";
import theme from "../theme";

/** styles for map cards */
export const MapCardsStyles = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .map-cards__card {
    position: absolute;
    width: 216px;
  }
  .location-header__name-wrapper {
    padding-left: ${theme.spacing(2)};
    padding-right: ${theme.spacing(2)};
  }
  .location-header__close {
    position: absolute;
    top: ${theme.spacing(1)};
    right: ${theme.spacing(1)};
  }
  .map-card__metrics {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(1)};
    padding: ${theme.spacing(2)};
  }
  .map-card__metric {
    display: flex;
    flex-direction: column;
  }
  .map-card__metric-value {
    font-size: ${theme.typography.pxToRem(24)};
    font-weight: 500;
  }
`;

/** map section styles */
export const MapSectionStyles = styled(Box)`
  position: relative;
  width: 100%;
  margin-top: ${theme.spacing(5)};
  min-height: calc(100vh - ${theme.spacing(10)});
  .map__scroll-overlay {
    position: absolute;
    z-index: 100;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    .MuiButton-root {
      position: sticky;
      top: 50%;
      margin-bottom: ${theme.spacing(2)};
      width: 232px;
    }
    &.map__scroll-overlay--active {
      pointer-events: all;
    }
  }
  .map__view-more {
    position: absolute;
    left: ${theme.spacing(3)};
    bottom: ${theme.spacing(3.5)};
    z-index: 2;
  }
  .HypMapGL-root {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    z-index: 1;
  }
  .map__fixed-wrapper {
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100% - 56px);
  }
  .mapboxgl-ctrl-top-right {
    top: 32px;
  }
  .controls {
    position: absolute;
    top: ${theme.spacing(0)};
    padding: ${theme.spacing(2)};
    width: 100%;
    display: flex;
    z-index: 10;
    justify-content: center;
  }
  .controls__selectors {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    align-items: center;
  }
  ${theme.breakpoints.up("sm")} {
    height: calc(100% - ${theme.spacing(10)});
    margin-top: 0;
    .map__view-more {
      left: 0;
      right: 0;
      width: 232px;
      margin: auto;
    }
  }
`;
