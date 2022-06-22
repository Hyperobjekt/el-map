import { Box, styled } from '@mui/material';
import theme from '../../theme';

export const MapControlsStyles = styled(Box)`
  display: flex;
  justify-content: center;
  position: absolute;
  top: ${theme.spacing(0)};
  width: 100%;
  z-index: 10;
  padding: ${theme.spacing(2)};
  pointer-events: none;
  .map-controls__paper {
    pointer-events: auto;
    flex: 1;
    padding: ${theme.spacing(2)};
    display: flex;
    flex-direction: column;
  }
  .data-mode__button {
    margin-bottom: ${theme.spacing(2)};
    border-width: 1px;
    margin: 1px;
  }
  .map-controls__selectors {
    display: flex;
    flex-direction: column;
    gap: 1em;
    & > span {
      display: none;
    }
    .MuiFormControl-root:nth-of-type(1) .MuiSelect-select {
      color: ${theme.palette.primary.main};
    }
    .MuiFormControl-root:nth-of-type(2) .MuiSelect-select {
      color: ${theme.palette.secondary.main};
    }
  }
  ${theme.breakpoints.up('sm')} {
    .map-controls__paper {
      flex-direction: row;
      flex: unset;
      padding: ${theme.spacing(1, 2, 1, 1)};
    }
    .divider {
      width: 1px;
      background: ${theme.palette.divider};
      margin: 0 ${theme.spacing(2)};
      height: 100%;
    }
    .map-controls__selectors {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5em;
      & > span {
        display: inline;
      }
    }
    .data-mode__button {
      margin-bottom: 0;
      margin-right: ${theme.spacing(-1)};
      padding-left: ${theme.spacing(2)};
      padding-right: ${theme.spacing(2)};
    }
  }
`;
