import { Box, Paper, styled } from "@mui/material";
import theme, { BODY_FONT_FAMILY, NUMBER_FONT_FAMILY } from "../theme";

/** Legend styles */
export const MapLegendStyle = styled(Paper)`
  position: absolute;
  bottom: ${theme.spacing(3)};
  right: ${theme.spacing(2)};
  z-index: 10;
  padding: ${theme.spacing(1.5, 2)};
  display: flex;
  align-items: center;
  .legend__section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: ${theme.spacing(8.5)};
  }
  .legend__section-title {
    margin-bottom: ${theme.spacing(0.5)};
  }
  .legend__bubbles {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    gap: ${theme.spacing(2)};
  }
  .legend__data-bubbles {
    position: relative;
    display: flex;
    gap: ${theme.spacing(2)};
    .legend__bubble {
      // min-width: ${theme.spacing(4)};
    }
    // align first data bubble to the left
    .legend__bubble:nth-of-type(1) {
      align-items: flex-start;
    }
    // align last data bubble to the right
    .legend__bubble:nth-of-type(3) {
      align-items: flex-end;
    }
  }
  // container for hover bubble
  .legend__hover-bubble {
    position: absolute;
    left: 4px;
    right: 10.5px;
    bottom: 0;
    height: 40px;
  }
  .legend__bubble-connector {
    position: absolute;
    left: 4px;
    right: 10.5px;
    bottom: 11.5px;
    height: 1px;
    border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
  }
  .legend__bubble {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${theme.spacing(5)};
    minwidth: ${theme.spacing(4)};
  }
  .legend__bubble.legend__bubble--no-data .legend__bubble-label,
  .legend__no-data-label {
    font-size: ${theme.typography.pxToRem(11)};
    color: ${theme.palette.text.secondary};
    font-family: ${BODY_FONT_FAMILY};
    font-weight: 600;
  }
  .legend__bubble-label {
    line-height: 1;
    height: ${theme.spacing(2)};
    font-family: ${NUMBER_FONT_FAMILY};
    font-size: ${theme.typography.pxToRem(11)};
    font-weight: 500;
    color: ${theme.palette.text.secondary};
  }
  .legend__bubble-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${theme.spacing(3)};
    flex-shrink: 0;
    flex-grow: 0;
  }
  .legend__bubble-circle {
    border: 1px solid;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .legend__divider {
    width: 1px;
    height: ${theme.spacing(7.5)};
    margin: 0 ${theme.spacing(2)};
    background-color: ${theme.palette.divider};
  }
  .legend__choropleth {
    display: flex;
    flex-direction: row-reverse;
    gap: ${theme.spacing(2)};
    align-items: flex-start;
  }
  .legend__choropleth-no-data {
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: ${theme.spacing(2 / 8)};
    padding-bottom: ${theme.spacing(1)};
  }
  .legend__no-data-marker {
    height: 16px;
    width: 16px;
    background: repeating-linear-gradient(
      45deg,
      #fff,
      #fff 4px,
      #c6cccf 0,
      #c6cccf 8px
    );
    box-shadow: inset 0 0 0 1px #c6cccf;
  }
  .legend__choropleth-ticks {
    display: block;
    margin-bottom: 2px;
    line {
      stroke: ${theme.palette.divider};
    }
    path {
      display: none;
    }
    text {
      font-family: ${NUMBER_FONT_FAMILY};
      font-size: ${theme.typography.pxToRem(11)};
      font-weight: 500;
      color: ${theme.palette.text.secondary};
    }
    .domain + .tick text {
      text-anchor: start;
    }
    .tick:last-child text {
      text-anchor: end;
    }
  }
  .legend__choropleth-colors {
    margin: ${theme.spacing(0, 0, 1, 0)};
  }
`;

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

export const MapControlsStyles = styled(Box)`
  position: absolute;
  top: ${theme.spacing(0)};
  padding: ${theme.spacing(2)};
  width: 100%;
  display: flex;
  z-index: 10;
  justify-content: center;
  pointer-events: none;
  .MuiPaper-root {
    pointer-events: auto;
    padding: ${theme.spacing(1, 2)};
    display: flex;
  }
  .map-controls__selectors {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    align-items: center;
    .MuiFormControl-root:nth-of-type(1) .MuiSelect-select {
      color: ${theme.palette.primary.main};
    }
    .MuiFormControl-root:nth-of-type(2) .MuiSelect-select {
      color: ${theme.palette.secondary.main};
    }
  }
  .map-controls__data-options {
    margin-right: ${theme.spacing(-1)};
    margin-left: ${theme.spacing(2)};
    width: ${theme.spacing(21)};
  }
`;
