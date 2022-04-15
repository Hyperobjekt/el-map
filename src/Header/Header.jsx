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
  useScrollTrigger,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useLang } from "@hyperobjekt/react-dashboard";
import clsx from "clsx";
import { SearchInput } from "../UI";
import { Menu } from "../Icons";
import HeaderStyles from "./Header.style";
import useMobileControls from "../hooks/useMobileControls";

function Header({ ...props }) {
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const [
    siteTitle,
    showControlsLabel,
    hideControlsLabel,
    searchPlaceholder,
    menuLabel,
    englishLabel,
    spanishLabel,
    languageLabel,
  ] = useLang([
    "HEADER_TITLE",
    "HEADER_SHOW_CONTROLS",
    "HEADER_HIDE_CONTROLS",
    "HEADER_SEARCH_PLACEHOLDER",
    "HEADER_MENU",
    "LANGUAGE_EN",
    "LANGUAGE_ES",
    "SELECT_LANGUAGE_LABEL",
  ]);
  const [mobileControls, setMobileControls] = useMobileControls();
  const handleToggleControls = () => {
    if (!mobileControls) {
      window?.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
    setMobileControls(!mobileControls);
  };

  return (
    <HeaderStyles
      color="default"
      className={clsx("header__root", {
        "header__root--condensed": isScrolled,
      })}
      position="fixed"
      {...props}
    >
      <Toolbar className="header__toolbar body__content">
        <div className="header__title">
          <a className="header__logo" href="/">
            <img
              className="header__logo-image"
              src="/assets/img/logo.svg"
              alt={siteTitle}
            />
          </a>
        </div>
        <div className="header__actions">
          <Button
            variant="contained"
            className={clsx("header__toggle-controls", {
              "header__toggle-controls--active": mobileControls,
            })}
            onClick={handleToggleControls}
          >
            {mobileControls ? hideControlsLabel : showControlsLabel}
          </Button>
          <SearchInput
            className="header__search"
            placeholder={searchPlaceholder}
          />
          <FormControl className="header__lang-select">
            <InputLabel sx={visuallyHidden} id="lang-select-label">
              {languageLabel}
            </InputLabel>
            <Select
              variant="outlined"
              labelId="lang-select-label"
              label={languageLabel}
              id="lang-select"
              value="en"
              sx={{ minWidth: 14 * 8 }}
              // onChange={handleChange}
            >
              <MenuItem value="en">{englishLabel}</MenuItem>
              <MenuItem value="es">{spanishLabel}</MenuItem>
            </Select>
          </FormControl>
          <ButtonBase className="header__menu-button">
            <Menu />
            <Typography component="span" variant="button">
              {menuLabel}
            </Typography>
          </ButtonBase>
        </div>
      </Toolbar>
    </HeaderStyles>
  );
}

export default Header;
