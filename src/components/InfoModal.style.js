import { Modal, styled } from "@mui/material";
import theme from "../theme";

// TODO: generic modal style (integrate with Reports modal)
export const InfoModalStyled = styled(Modal)`
  .data-mode__wrapper {
    position: absolute;
    inset: 0;
  }

  .data-mode__content {
    position: absolute;
    height: 100%;
    width: 100%;
    inset: 0;
  }
  .data-mode__header {
    justify-content: space-between;
    border-bottom: 1px solid;
    border-bottom-color: ${theme.palette.divider};
  }
  .data-mode__body {
    padding-top: ${theme.spacing(2)};
    padding-bottom: ${theme.spacing(2)};
    // leave room for header/actions (todo: flexbox instead?)
    max-height: calc(100vh - 130px);
    overflow-y: scroll;
  }
  .data-mode__description {
    padding-left: ${theme.spacing(4)};
  }
  .data-mode__actions {
    justify-content: stretch;
    gap: ${theme.spacing(2)};
    .MuiButton-root {
      flex: 1;
    }
  }

  ${theme.breakpoints.up("sm")} {
    .data-mode__wrapper {
      position: absolute;
      inset: unset;
      left: 50%;
      top: 50%;
    }
    .data-mode__content {
      min-width: 580px;
      width: calc(100vw - 32px);
      max-width: 740px;
      inset: unset;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: auto;
    }
    .data-mode__body {
      padding-top: ${theme.spacing(3)};
      max-height: calc(100vh - 200px);
      height: 400px;
    }
    .data-mode__radio-group {
      flex-direction: row;
    }
    .data-mode__actions {
      justify-content: flex-end;
      .MuiButton-root {
        flex: unset;
      }
    }
  }
`;