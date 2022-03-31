import { Box, styled } from "@mui/material";
import theme from "../theme";

const MapStyle = styled(Box)`
  position: relative;
  width: 100%;
  margin-top: ${theme.spacing(5)};
  height: calc(100% - ${theme.spacing(12)});
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
      margin-bottom: ${theme.spacing(3.5)};
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
    position: fixed;
    left: 0;
    right: 0;
    top: 56px;
    bottom: 0;
    height: calc(100% - 56px);
    z-index: 1;
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

export default MapStyle;
