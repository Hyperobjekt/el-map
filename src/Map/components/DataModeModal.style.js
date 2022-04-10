import { Box, Paper, styled } from "@mui/material";
import theme from "../../theme";

export const ModalContent = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 740px;
  .data-mode__option {
    border: 1px solid ${theme.palette.divider};
    border-radius: ${theme.spacing(0.5)};
    padding: ${theme.spacing(2)};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .MuiFormControlLabel-root {
      margin-top: ${theme.spacing(-1)};
      .MuiTypography-root {
        font-weight: 600;
      }
    }
    .data-mode__description {
      padding-left: ${theme.spacing(4)};
    }
  }
`;
