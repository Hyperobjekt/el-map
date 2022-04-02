import { Box, styled } from "@mui/material";
import theme from "../theme";

export const ActionsStyle = styled(Box)`
  position: relative;
  z-index: 2;
  background: ${theme.palette.background.paper};
  padding: ${theme.spacing(10, 3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  .actions__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing(3)};
  }
  .actions__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing(2)};
    max-width: ${theme.spacing(264 / 8)};
    text-align: center;
    .icon {
      height: ${theme.spacing(24 / 8)};
    }
  }
  .actions__image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${theme.spacing(9)};
    img {
      height: ${theme.spacing(9)};
    }
  }
  .actions__back {
    width: 232px;
    margin: ${theme.spacing(8, 0, -4, 0)};
  }
  ${theme.breakpoints.up("sm")} {
    .actions__wrapper {
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
  ${theme.breakpoints.up("md")} {
    .actions__wrapper {
      justify-content: space-between;
    }
  }
`;
