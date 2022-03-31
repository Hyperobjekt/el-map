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
    padding: ${theme.spacing(2, 3)};
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
    background: rgba(0, 0, 0, 0.05);
  }
  .chart-legend-item__root {
    display: flex;
    align-items: flex-start;

    gap: ${theme.spacing(2)};
    min-width: 218px;
  }

  // 960+
  ${theme.breakpoints.up("md")} {
    .charts__chart-wrapper {
      flex-direction: row;
    }
    .charts__line-chart {
      flex: 0.6666;
      background: rgba(0, 0, 0, 0.05);
    }
    .charts__legend {
      flex: 0.3333;
      flex-wrap: nowrap;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

export default ChartsStyle;
