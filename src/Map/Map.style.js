import { Box, styled } from "@mui/material";
import theme from "../theme";

const MapStyle = styled(Box)`
  position: relative;
  width: 100%;
  margin-top: ${theme.spacing(5)};
  height: calc(100% - ${theme.spacing(12)});
  .controls {
    position: absolute;
    top: ${theme.spacing(0)};
    padding: ${theme.spacing(2)};
    width: 100%;
    display: flex;
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
  }
`;

export default MapStyle;
