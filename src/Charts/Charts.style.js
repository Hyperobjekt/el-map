import { Box, styled } from "@mui/material";
import theme, {
  BOLD_FONT_FAMILY,
  NUMBER_FONT_FAMILY,
  TEXT_SECONDARY,
} from "../theme";

const ChartsStyle = styled(Box)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 560px;
  background: #f4f7f9;
  .charts__controls {
    display: flex;
    align-items: center;
    padding: ${theme.spacing(2, 0)};
    min-height: ${theme.spacing(11)};
    background: #eef2f5;
  }
  .charts__controls .body__content {
    position: relative;
  }
  .charts__controls .select_bubble {
    vertical-align: middle;
  }
  .charts__controls .select_bubble .MuiInputBase-root {
    color: ${theme.palette.primary.main};
  }
  .charts__controls fieldset legend": {
    display: none;
  }
  .charts__chart-wrapper {
    display: flex;
    gap: ${theme.spacing(2)};
    flex-direction: column;
    flex: 1;
    padding: ${theme.spacing(6, 3)};
  }
  .charts__line-chart-sizer {
    max-width: 800px;
  }
  .charts__line-chart {
    flex: 1;
    // background: rgba(0, 0, 0, 0.05);
  }
  .charts__line-chart .visx-axis-tick text {
    font-family: ${NUMBER_FONT_FAMILY};
    color: ${TEXT_SECONDARY};
  }
  .charts__line-chart .line-chart__y-label {
    font-family: ${BOLD_FONT_FAMILY};
    font-size: ${theme.typography.pxToRem(12)};
    text-transform: uppercase;
    // color: ${TEXT_SECONDARY};
  }
  .charts__legend {
    display: flex;
    gap: ${theme.spacing(2)};
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .charts__legend .location-header__wrapper {
    box-shadow: none;
    padding: 0;
    height: auto;
    align-items: flex-start;
  }
  .charts__legend .location-header__name-wrapper {
    flex: 1;
  }
  .charts__legend .location-header__name {
    padding-right: 32px;
  }
  .charts__legend .location-header__marker {
    width: 26px;
  }
  .charts__legend .charts__nat-avg-legend-item button {
    transition: ${theme.transitions.create("transform")};
  }
  .charts__legend .charts__nat-avg-legend-item:not(.active) button {
    transform: rotate(-45deg);
  }

  // 960+
  ${theme.breakpoints.up("md")} {
    .charts__chart-wrapper {
      flex-direction: row;
      gap: ${theme.spacing(3)};
    }
    .charts__line-chart {
      flex: 0.7;
      // background: rgba(0, 0, 0, 0.05);
    }
    .charts__legend {
      flex: 0.3;
      flex-wrap: nowrap;
      flex-direction: column;
      align-items: stretch;
      gap: ${theme.spacing(5)};
      justify-content: flex-start;
    }
  }
`;

export default ChartsStyle;
