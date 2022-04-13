import { Box, styled } from "@mui/material";
import theme from "../theme";

/** map section styles */
export const MapSectionStyles = styled(Box)`
  position: relative;
  width: 100%;
  margin-top: ${theme.spacing(5)};
  height: calc(100% - ${theme.spacing(12)});
  min-height: calc(100vh - ${theme.spacing(12)});

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
  .map__tooltip-wrapper {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  .map__tooltip {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(1)};
    background: rgba(0, 0, 0, 0.87);
    padding: ${theme.spacing(1)};
    pointer-events: none;
    color: #fff;
    position: relative;
    width: 200px;
    transform: translate3d(-50%, -100%, 0);
    margin-top: -16px;
    &:after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 8px solid rgba(0, 0, 0, 0.87);
    }
  }
  .map__tooltip-name,
  .map__tooltip-parent {
    margin: 0;
    line-height: 1;
    display: block;
  }
  .map__tooltip-description {
    line-height: 1.3333;
    display: block;
    font-style: italic;
  }
  .MuiDivider-root {
    border-color: #444;
    border-style: dotted;
  }
  .map__tooltip-hint {
    color: rgba(255, 255, 255, 0.66);
    font-style: italic;
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
    transition: ${theme.transitions.create("height")};
  }
  .mapboxgl-ctrl-top-right {
    top: 32px;
  }
  &.map__root--locations {
    .map__fixed-wrapper {
      height: calc(100% - 56px - 136px);
    }
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
    height: calc(100% - ${theme.spacing(10)});
    min-height: calc(100vh - ${theme.spacing(10)});
    margin-top: 0;
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
