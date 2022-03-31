import { AppBar, styled } from "@mui/material";
import theme from "../theme";

const HeaderStyle = styled(AppBar)`
  background: ${theme.palette.background.paper};
  height: ${theme.spacing(10)};
  transition: ${theme.transitions.create("height")};
  &.header__root--condensed {
    height: ${theme.spacing(7)};
    .header__search,
    .header__lang-select {
      height: ${theme.spacing(5)};
    }
    .header__lang-select .MuiSelect-select {
      height: ${theme.spacing(5)};
      line-height: ${theme.spacing(5)};
    }
    .header__menu-button {
      height: ${theme.spacing(5)};
      min-width: ${theme.spacing(5)};
      .icon.icon--menu {
        height: 22px;
      }
      .MuiTypography-root {
        font-size: 10px;
      }
    }
  }
  .header__toolbar {
    min-height: 100%;
    width: 100%;
    justify-content: space-between;
    margin: 0 auto;
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
    height: 17.5px;
    margin-right: ${theme.spacing(2)};
  }
  .header__actions {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    gap: ${theme.spacing(2)};
    max-width: ${theme.spacing(60)};
  }
  .header__edit-data {
    display: none;
  }
  .header__search,
  .header__lang-select {
    transition: ${theme.transitions.create("height")};
    height: ${theme.spacing(7)};
  }
  .header__lang-select {
    margin-right: ${theme.spacing(44 / 8)};
    .MuiSelect-select {
      padding-top: 0;
      padding-bottom: 0;
      transition: ${theme.transitions.create(["height", "line-height"])};
      height: ${theme.spacing(7)};
      line-height: ${theme.spacing(7)};
    }
  }
  .header__menu-button {
    display: block;
    min-width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
    padding: 0;
    border-radius: 2px;
    flex-direction: column;
    color: ${theme.palette.primary.main};
    transition: ${theme.transitions.create(["width", "min-width", "height"])};
    .icon {
      display: block;
      width: ${theme.spacing(5)};
      height: 36px;
      margin: 2px auto 0;
      transition: ${theme.transitions.create(["width", "height"])};
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

  /** 960+ styles **/
  ${theme.breakpoints.up("md")} {
    .header__logo-image {
      height: 23px;
      margin-right: ${theme.spacing(3)};
    }
    .header__actions {
      gap: ${theme.spacing(3)};
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
