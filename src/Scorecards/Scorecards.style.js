import { Box, styled } from "@mui/material";
import theme from "../theme";

export const ScorecardStyle = styled(Box)`
  min-width: 280px;
  flex: 0.3333;
`;

const ScorecardsStyle = styled(Box)`
  position: relative;
  z-index:2;
  background: ${theme.palette.background.paper};
  display: flex:
  flex-direction: column;
  padding: ${theme.spacing(8, 3)};
  min-height: 100vh;
  border-top: 1px solid #efefef;
  overflow: auto;
  .scorecards__heading {
    position: sticky;
    left:0;
    text-align: center;
  }
  .scorecards__cards {
    display: flex;
    margin: ${theme.spacing(3, 0)};
    gap: ${theme.spacing(2)};
    align-items: stretch;
  }
`;

export default ScorecardsStyle;
