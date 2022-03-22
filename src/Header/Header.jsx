import {
  Toolbar,
  Typography,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  Box,
  ButtonBase,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import clsx from "clsx";
import { SearchInput } from "../UI";
import { Menu } from "../Icons";
import HeaderStyles from "./Header.style";

function Header({ ...props }) {
  return (
    <HeaderStyles
      color="default"
      className={clsx("header")}
      position="sticky"
      {...props}
    >
      <Toolbar className="header__toolbar">
        <div className="header__title">
          <a className="header__logo" href="/">
            <Typography variant="h1" sx={visuallyHidden}>
              Eviction Lab
            </Typography>
            <img
              className="header__logo-image"
              src="./assets/img/logo.svg"
              alt="Eviction Lab Logo"
            />
          </a>
        </div>
        <div className="header__actions">
          <SearchInput className="header__search" />
          <FormControl className="header__lang-select">
            <InputLabel sx={visuallyHidden} id="lang-select-label">
              Language
            </InputLabel>
            <Select
              variant="outlined"
              labelId="lang-select-label"
              id="lang-select"
              value="en"
              sx={{ minWidth: 14 * 8 }}
              // onChange={handleChange}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
            </Select>
          </FormControl>
          <ButtonBase className="header__menu-button">
            <Menu />
            <Typography component="span" variant="button">
              Menu
            </Typography>
          </ButtonBase>
        </div>
      </Toolbar>
    </HeaderStyles>
  );
}

export default Header;
