import { AppBar, styled } from "@mui/material";
import theme from "../theme";

const HeaderStyle = styled(AppBar)`
  background: ${theme.palette.background.paper};
  height: ${theme.spacing(10)};
  .header__toolbar {
    min-height: 100%;
    justify-content: space-between;
  }
  .header__title {
    display: flex;
    align-items: center;
    gap: ${theme.spacing(2)};
  }
  .header__logo {
    display: block;
    flex: 0;
  }
  .header__logo-image {
    display: block;
    height: 18px;
  }
  .header__actions {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: ${theme.spacing(2)};
    max-width: ${theme.spacing(60)};
  }
  .header__edit-data {
    display: none;
  }
  .header__search {
  }
  .header__lang-select {
    margin-right: ${theme.spacing(44 / 8)};
  }
  .header__menu-button {
    display: block;
    min-width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
    padding: 0;
    border-radius: 2px;
    flex-direction: column;
    color: ${theme.palette.primary.main};
    .icon {
      display: block;
      width: ${theme.spacing(5)};
      height: 36px;
      margin: 2px auto 0;
    }
    .MuiTypography-root {
      line-height: 1;
      display: block;
      margin-top: 4px;
      text-align: center;
    }
  }

  /** MOBILE STYLES **/
  ${theme.breakpoints.down("sm")} {
    height: ${theme.spacing(7)};
    .header__logo {
    }
    .header__lang-select {
      display: none;
    }
    .header__edit-data {
      display: block;
      position: absolute;
      left: 0;
      top: ${theme.spacing(7)};
      height: ${theme.spacing(5)};
      border-radius: 0;
      box-shadow: none;
      width: ${theme.spacing(18)};
    }
    .header__search {
      position: absolute;
      z-index: 2;
      background: ${theme.palette.background.paper};
      top: ${theme.spacing(7)};
      right: 0;
      left: 0;
      height: ${theme.spacing(5)};
      transition: ${theme.transitions.create("left")};
      .MuiOutlinedInput-notchedOutline {
        border-radius: 0;
      }
      &:focus-within {
        left: 0;
      }
    }
    .header__menu-button {
      .icon {
        margin-top: 8px;
        height: ${theme.spacing(3)};
      }
    }
  }

  /** VARIANT STYLES **/
  &.header--grow {
    height: ${theme.spacing(10)};
  }
  &.header--shrink {
    height: ${theme.spacing(7)};
  }
`;

export default HeaderStyle;
