import { Box, styled } from "@mui/material";
import theme from "../theme";

/** map section styles */
export const MapSectionStyles = styled(Box)`
  position: relative;
  width: 100%;
  height: 100vh;
  transition: ${theme.transitions.create(["height", "min-height"])};
  &.map__root--locations {
    .map__fixed-wrapper {
      height: calc(100% - 56px - 136px);
    }
  }
  .map__content {
    position: absolute;
    top: ${theme.spacing(12)};
    bottom: 0;
    left: 0;
    right: 0;
  }
  .map__fixed-wrapper {
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100% - 56px);
    transition: ${theme.transitions.create("height")};
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
  .mapboxgl-ctrl-top-right {
    top: 32px;
  }
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
    visibility: hidden;
  }

  // make space for legend and cards on below 480
  ${theme.breakpoints.down(480)} {
    .map__fixed-wrapper {
      height: calc(100% - 56px - 120px);
      .legend__root {
        bottom: -120px;
        max-width: none;
      }
    }
    &.map__root--locations {
      .map__fixed-wrapper {
        height: calc(100% - 56px - 136px - 120px);
      }
    }
  }
  ${theme.breakpoints.up("sm")} {
    height: 100vh;
    padding-top: ${theme.spacing(10)};
    margin-top: 0;
    .map__content {
      top: ${theme.spacing(10)};
    }
  }
  ${theme.breakpoints.up("md")} {
    .map__view-more {
      visibility: visible;
      position: absolute;
      left: ${theme.spacing(3)};
      bottom: ${theme.spacing(3.5)};
      z-index: 2;
      width: 232px;
      margin: auto;
    }
    &.map__root--locations .map__fixed-wrapper {
      height: calc(100% - 56px);
    }
  }
  ${theme.breakpoints.up("lg")} {
    .map__view-more {
      left: 0;
      right: 0;
    }
  }
`;
