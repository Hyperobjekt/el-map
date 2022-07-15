import { Modal, styled } from '@mui/material';
import theme from '../theme';

export const ModalStyled = styled(Modal)`
  h4,
  p {
    padding-bottom: 16px;
  }
  h4 {
    font-size: 1.1em;
    line-height: 1.4;
    letter-spacing: 0.02em;
  }
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
    min-height: 72px;
  }
  .data-mode__body {
    padding-top: ${theme.spacing(2)};
    padding-bottom: ${theme.spacing(2)};
    // leave room for header/actions, with additional space for Android Firefox
    // browser bar (which otherwise obscures the OK button)
    // TODO: flexbox instead?
    max-height: calc(92vh - 180px);
    overflow-y: scroll;

    &--small {
      max-height: calc(92vh - 280px);
    }
  }
  .data-mode__description {
    padding-left: ${theme.spacing(4)};
  }
  .data-mode__actions {
    justify-content: stretch;
    gap: ${theme.spacing(2)};
    border-top: 1px solid;
    border-top-color: ${theme.palette.divider};
    .MuiButton-root {
      flex: 1;
    }
  }

  ${theme.breakpoints.down('sm')} {
    #data-modal-title {
      flex-basis: 240px;
    }
  }

  ${theme.breakpoints.up('sm')} {
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

      &--small {
        min-width: 380px;
        width: calc(100vw - 232px);
        max-width: 540px;
      }
    }
    .data-mode__body {
      padding-top: ${theme.spacing(3)};
      max-height: calc(100vh - 200px);
      height: 400px;

      &--small {
        max-height: calc(100vh - 400px);
        height: 200px;
      }
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
