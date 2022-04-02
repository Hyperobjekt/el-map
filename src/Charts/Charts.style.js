import { Box, styled } from "@mui/material";
import theme from "../theme";

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
  .charts__chart-wrapper {
    display: flex;
    gap: ${theme.spacing(2)};
    flex-direction: column;
    flex: 1;
    padding: ${theme.spacing(6, 3)};
  }
  .charts__line-chart {
    flex: 1;
    background: rgba(0, 0, 0, 0.05);
  }
  .charts__legend {
    display: flex;
    gap: ${theme.spacing(2)};
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .location-header__root {
    box-shadow: none;
    padding: 0;
    height: auto;
    align-items: flex-start;
  }
  .location-header__name-wrapper {
    flex: 1;
  }
  .location-header__marker {
    width: 26px;
  }

  // 960+
  ${theme.breakpoints.up("md")} {
    .charts__chart-wrapper {
      flex-direction: row;
      gap: ${theme.spacing(3)};
    }
    .charts__line-chart {
      flex: 0.7;
      background: rgba(0, 0, 0, 0.05);
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
