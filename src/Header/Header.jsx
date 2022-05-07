import {
  Toolbar,
  Typography,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  ButtonBase,
  useScrollTrigger,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useLang, useDashboardStore } from "@hyperobjekt/react-dashboard";
import clsx from "clsx";
import { SearchInput } from "../UI";
import { Menu } from "../Icons";
import HeaderStyles, { EmbedHeaderStyle } from "./Header.style";
import useMobileControls from "../hooks/useMobileControls";
import LanguageSelect from "../Controls/components/LanguageSelect";

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

  const embed = useDashboardStore((state) => state.embed);
  const href = !embed ? "/" : window.location.href.replace("&embed=true", "");

  const logoLink = (
    <a className="header__logo" href={href}>
      <img
        className="header__logo-image"
        src="/assets/img/logo.svg"
        alt={siteTitle}
      />
    </a>
  );

  if (embed) {
    return <EmbedHeaderStyle>{logoLink}</EmbedHeaderStyle>;
  }

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
        <div className="header__title">{logoLink}</div>
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
          <LanguageSelect className="header__lang-select" />
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
