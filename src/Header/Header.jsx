import {
  Box,
  Grid,
  Toolbar,
  Typography,
  Button,
  ButtonBase,
  useScrollTrigger,
} from '@mui/material';
import { useLang, useDashboardStore } from '@hyperobjekt/react-dashboard';
import { useState } from 'react';
import clsx from 'clsx';
import { Search } from '../UI';
import { Menu, Close, ArrowRight } from '../Icons';
import HeaderStyles, { EmbedHeaderStyle, MenuExpanded } from './Header.style';
import useMobileControls from '../hooks/useMobileControls';
import LanguageSelect from '../Controls/components/LanguageSelect';
import { getAssetPath } from '../utils';

function Header({ ...props }) {
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    // FF on Android can't scroll up to 0 (min is ~.3px), so gets stuck w/ threshold = 0
    threshold: 1,
  });
  const [
    siteTitle,
    showControlsLabel,
    hideControlsLabel,
    searchPlaceholder,
    menuLabel,
    closeLabel,
    siteHomeLabel,
    latestDataLabel,
    evictionTrackingSystemLabel,
    policiesDatabaseLabel,
    policyScorecardLabel,
    newestFindingsAndStoriesLabel,
    allUpdatesLabel,
    blogLabel,
    researchLabel,
    reportingLabel,
    nationalDataLabel,
    nationalEvictionMapLabel,
    evictionRankingsLabel,
    aboutTheLabLabel,
    missionAndTeamLabel,
    whyEvictionMattersLabel,
    methodsLabel,
    faqLabel,
  ] = useLang([
    'HEADER_TITLE',
    'HEADER_SHOW_CONTROLS',
    'HEADER_HIDE_CONTROLS',
    'HEADER_SEARCH_PLACEHOLDER',
    'HEADER_MENU',
    'HEADER_CLOSE',
    'SITE_HOME',
    'HEADER_LATEST_DATA',
    'HEADER_EVICTION_TRACKING_SYSTEM',
    'HEADER_POLICIES_DATABASE',
    'SITE_SCORECARD',
    'HEADER_NEWEST_FINDINGS_AND_STORIES',
    'SITE_UPDATES',
    'HEADER_BLOG',
    'HEADER_RESEARCH',
    'HEADER_REPORTING',
    'HEADER_NATIONAL_DATA',
    'SITE_MAP',
    'SITE_RANKINGS',
    'SITE_ABOUT',
    'HEADER_MISSION_AND_TEAM',
    'SITE_WHY_MATTERS',
    'SITE_METHODS',
    'SITE_FAQ',
  ]);
  const [mobileControls, setMobileControls] = useMobileControls();
  const handleToggleControls = () => {
    if (!mobileControls) {
      window?.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
    setMobileControls(!mobileControls);
  };

  const embed = useDashboardStore((state) => state.embed);
  const href = !embed ? '/' : window.location.href.replace('&embed=true', '');

  const [expanded, setExpanded] = useState(false);

  const logoLink = (
    <a className="header__logo" href={href}>
      <img
        className="header__logo-image"
        src={getAssetPath('assets/img/logo.svg')}
        alt={siteTitle}
      />
    </a>
  );

  if (embed) {
    return <EmbedHeaderStyle>{logoLink}</EmbedHeaderStyle>;
  }

  return (
    <>
      <HeaderStyles
        color="default"
        className={clsx('header__root', {
          'header__root--condensed': isScrolled,
        })}
        position="fixed"
        {...props}
      >
        <Toolbar className="header__toolbar body__content">
          <div className="header__title">{logoLink}</div>
          <div className="header__actions">
            <Button
              variant="contained"
              className={clsx('header__toggle-controls', {
                'header__toggle-controls--active': mobileControls,
              })}
              onClick={handleToggleControls}
            >
              {mobileControls ? hideControlsLabel : showControlsLabel}
            </Button>
            <Search
              flyTo={!isScrolled}
              className="header__search"
              placeholder={searchPlaceholder}
            />
            <LanguageSelect className="header__lang-select" />
            <ButtonBase className="header__menu-button" onClick={() => setExpanded(true)}>
              <Menu />
              <Typography component="span" variant="button">
                {menuLabel}
              </Typography>
            </ButtonBase>
          </div>
        </Toolbar>
      </HeaderStyles>
      <MenuExpanded style={{ transform: `translateY(${expanded ? 0 : 'calc(-100% - 5px)'})` }}>
        <ButtonBase className="app-menu__close-button" onClick={() => setExpanded(false)}>
          <Close />
          <Typography component="span" variant="button">
            {closeLabel}
          </Typography>
        </ButtonBase>
        <div className="site-navigation">
          <Grid container sx={{ justifyContent: 'center' }} spacing={2}>
            <Grid
              item
              container
              xs={12}
              rowSpacing={4}
              columnSpacing={4}
              className="navGridContainer"
            >
              <Grid item xs={12} sx={{ position: 'relative', top: '1rem' }}>
                <a href="https://evictionlab.org">{siteHomeLabel}</a>
              </Grid>
              <Grid item xs={12} sm2={6} md={3}>
                <div className="app-menu__section-title">{latestDataLabel}</div>
                <Grid container spacing={{ xs: 1, sm2: 2 }}>
                  <Grid item xs={12}>
                    <a href="https://evictionlab.org/eviction-tracking">
                      {evictionTrackingSystemLabel}
                    </a>
                  </Grid>
                  <Grid item xs={12}>
                    <a href="https://evictionlab.org/covid-eviction-policies">
                      {policiesDatabaseLabel}
                    </a>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <a href="https://evictionlab.org/covid-policy-scorecard">
                      {policyScorecardLabel}
                    </a>
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12} sm2={6} md={3}>
                <div className="app-menu__section-title">{newestFindingsAndStoriesLabel}</div>
                <Grid container spacing={{ xs: 1, sm2: 2 }}>
                  <Grid item xs={12}>
                    <a href="https://evictionlab.org/updates">{allUpdatesLabel}</a>
                  </Grid>
                  <Grid item xs={12} className="app-menu__sublink">
                    <ArrowRight />
                    <a href="https://evictionlab.org/updates/blog">{blogLabel}</a>
                  </Grid>
                  <Grid item xs={12} className="app-menu__sublink">
                    <ArrowRight />
                    <a href="https://evictionlab.org/updates/research">{researchLabel}</a>
                  </Grid>
                  <Grid item xs={12} className="app-menu__sublink">
                    <ArrowRight />
                    <a href="https://evictionlab.org/updates/reporting">{reportingLabel}</a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm2={6} md={3}>
                <div className="app-menu__section-title">{nationalDataLabel}</div>
                <Grid container spacing={{ xs: 1, sm2: 2 }}>
                  <Grid item xs={12}>
                    <a href="https://evictionlab.org/map">{nationalEvictionMapLabel}</a>
                  </Grid>
                  <Grid item xs={12}>
                    <a href="https://evictionlab.org/rankings">{evictionRankingsLabel}</a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm2={6} md={3}>
                <div className="app-menu__section-title">{aboutTheLabLabel}</div>
                <Grid container spacing={{ xs: 1, sm2: 2 }}>
                  <Grid item xs={12}>
                    <a href="https://evictionlab.org/about">{missionAndTeamLabel}</a>
                  </Grid>
                  <Grid item xs={12}>
                    <a href="https://evictionlab.org/why-eviction-matters">
                      {whyEvictionMattersLabel}
                    </a>
                  </Grid>
                  <Grid item xs={12}>
                    <a href="https://evictionlab.org/methods">{methodsLabel}</a>
                  </Grid>
                  <Grid item xs={12}>
                    <a href="https://evictionlab.org/help-faq">{faqLabel}</a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </MenuExpanded>
    </>
  );
}

export default Header;
