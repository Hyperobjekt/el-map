import { Box, styled } from "@mui/material";
import theme from "../../theme";

export const MapControlsStyles = styled(Box)`
  display: flex;
  justify-content: center;
  position: absolute;
  top: ${theme.spacing(0)};
  width: 100%;
  z-index: 10;
  padding: ${theme.spacing(2)};
  pointer-events: none;
  .MuiPaper-root {
    pointer-events: auto;
    padding: ${theme.spacing(1, 2, 1, 1)};
    display: flex;
  }
  .divider {
    width: 1px;
    background: ${theme.palette.divider};
    margin: 0 ${theme.spacing(2)};
    height: 100%;
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
`;
