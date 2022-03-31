import { Paper, styled } from "@mui/material";
import theme from "../../theme";

export const VerticalDivider = styled("div")`
  width: 1px;
  height: ${theme.spacing(7.5)};
  margin: 0 ${theme.spacing(2)};
  background-color: ${theme.palette.divider};
`;

const MapLegendStyle = styled(Paper)`
  position: absolute;
  bottom: ${theme.spacing(3)};
  right: ${theme.spacing(3)};
  z-index: 10;
  padding: ${theme.spacing(1)};
  display: flex;
  align-items: center;
  .legend__section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: ${theme.spacing(8)};
  }
  .legend__bubbles {
    position: relative;
    display: flex;
    gap: 0.75em;
  }
  // container for hover bubble
  .legend__hover-bubble {
    position: absolute;
    left: 60px;
    right: 10.5px;
    bottom: 0;
    height: 40px;
  }
  .legend__bubble-connector {
    position: absolute;
    left: 60px;
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
    // align first data bubble to the left
    &:nth-of-type(2) {
      align-items: flex-start;
    }
    // align last data bubble to the right
    &:nth-of-type(4) {
      align-items: flex-end;
    }
  }
  .legend__bubble-label {
    line-height: 1;
    height: ${theme.spacing(2)};
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
      font-family: ${theme.typography.fontFamily};
      font-size: ${theme.typography.pxToRem(12)};
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

export default MapLegendStyle;
