import { AppBar, Box, styled } from "@mui/material";
import theme from "../theme";

const logoImgWidth = "44px";

const header__search_compressed = `
  .search__input-wrapper {
    height: 100%;
  }
  input.MuiAutocomplete-input {
    padding: 0;
  }
  .MuiInputBase-input {
    margin-left: ${theme.spacing(4)};
  }
`;

const HeaderStyle = styled(AppBar)`
  background: ${theme.palette.background.paper};
  height: ${theme.spacing(10)};
  transition: ${theme.transitions.create("height")};
  &.header__root--condensed {
    height: ${theme.spacing(7)};
    .header__logo-image {
      height: 17.5px;
    }
    .header__search {
      ${header__search_compressed}
    }
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
    transition: ${theme.transitions.create(["height", "width"])};
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
  .header__toggle-controls {
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

  /** truncate logo to make room for search **/
  ${theme.breakpoints.down(780)} {
    // ${theme.breakpoints.between("sm", 780)} {
    .header__title {
      width: ${logoImgWidth};
      overflow: hidden;
    }
    .header__logo-image {
      clip-path: polygon(0 0, ${logoImgWidth} 0, ${logoImgWidth} 100%, 0 100%);
    }
  }

  /** MOBILE STYLES **/
  ${theme.breakpoints.down("sm")} {
    height: ${theme.spacing(7)};
    .header__logo {
    }
    .header__lang-select {
      // display: none;
      margin-right: 0;
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
    .header__toggle-controls {
      display: block;
      position: absolute;
      left: 0;
      top: ${theme.spacing(7)};
      z-index: 3;
      width: 160px;
      border-radius: 0;
      height: 40px;
      transition: ${theme.transitions.create("width")};
      &.header__toggle-controls--active {
        z-index: 4;
        width: 100%;
      }
    }
    .header__search {
      position: absolute;
      z-index: 2;
      background: ${theme.palette.background.paper};
      top: ${theme.spacing(7)};
      right: 0;
      left: 160px;
      height: ${theme.spacing(5)};
      transition: ${theme.transitions.create("left")};

      ${header__search_compressed}
      .MuiOutlinedInput-notchedOutline {
        border-radius: 0;
      }
      &:focus-within {
        left: 0;
        z-index: 4;
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

export const EmbedHeaderStyle = styled(Box)`
  & .header__logo {
    position: absolute;
    top: ${theme.spacing(3)};
    left: ${theme.spacing(3)};
    z-index: 50;
    width: 220px;
  }
`;

export default HeaderStyle;
