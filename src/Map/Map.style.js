import { Box, styled } from "@mui/material";
import theme from "../theme";

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
