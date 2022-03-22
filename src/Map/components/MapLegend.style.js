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
    display: flex;
    gap: 0.75em;
  }
  .legend__bubble {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${theme.spacing(5)};
    minwidth: ${theme.spacing(4)};
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
  }
  .legend__bubble-circle {
    flex-shrink: 0;
    border: 1px solid;
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
