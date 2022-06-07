import { Paper, styled } from '@mui/material';
import theme, { BODY_FONT_FAMILY, NUMBER_FONT_FAMILY } from '../../theme';

/** Legend styles */
export const MapLegendStyle = styled(Paper)`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  max-width: 336px;
  z-index: 10;
  padding: ${theme.spacing(1.5, 2)};
  display: flex;
  align-items: center;
  border-radius: 0;
  padding-top: ${theme.spacing(5)};
  .legend__actions {
    position: absolute;
    top: 0;
    height: ${theme.spacing(4)};
    overflow: hidden;
    display: flex;
    justify-content: stretch;
    left: 0;
    right: 0;
    background: ${theme.palette.background.paper};
    border-bottom: 1px solid ${theme.palette.divider};
    .legend__divider {
      margin: 0;
    }
    .MuiButton-root {
      flex: 1;
      border-radius: 0;
      padding-top: 8px;
      padding-left: ${theme.spacing(2)};
      padding-right: ${theme.spacing(1.5)};
    }
  }
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
  .legend__bubble.legend__bubble--no-data {
    display: none;
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
    display: none;
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
  ${theme.breakpoints.up('sm')} {
    left: auto;
    max-width: none;
    bottom: ${theme.spacing(3)};
    right: ${theme.spacing(2)};
    padding-top: ${theme.spacing(1.5)};
    .legend__actions {
      display: none;
    }
    .legend__bubble.legend__bubble--no-data {
      display: flex;
    }
    .legend__choropleth-no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      padding-top: ${theme.spacing(2 / 8)};
      padding-bottom: ${theme.spacing(1)};
    }

    .legend__no-data-marker {
      height: 16px;
      width: 16px;
      background: #eee;
      box-shadow: inset 0 0 0 2px #c6cccf;
    }
    .legend__bubble.legend__bubble--no-data .legend__bubble-label,
    .legend__no-data-label {
      font-size: ${theme.typography.pxToRem(11)};
      color: ${theme.palette.text.secondary};
      font-family: ${BODY_FONT_FAMILY};
      font-weight: 600;
    }
  }
`;
