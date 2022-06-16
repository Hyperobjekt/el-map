import {
  Typography,
  Box,
  Link as MuiLink,
  IconButton,
  Popover,
  Popper,
  Paper,
  TextField,
  Tooltip,
  Button,
} from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useLang, useLocationData, useCurrentContext } from '@hyperobjekt/react-dashboard';
import { Email, Facebook, Twitter, Link } from '../../Icons';
import { getAssetPath } from '../../utils';
import { ContentCopy } from '@mui/icons-material';
import copy from 'copy-to-clipboard';
import { QUATERNARY_COLOR, TERTIARY_COLOR } from '../../theme';

const defaultOptions = {
  width: 626,
  height: 436,
  toolbar: 0,
  status: 0,
  resizable: 1,
}
const objectToUrlParams = obj => {
  return Object.keys(obj)
    .map(key => key + '=' + obj[key])
    .join(',')
}

const ShareLinkPopover = ({ id, open, anchorEl, handleCloseShareLink }) => {
  const [siteLinkCopied, setSiteLinkCopied] = React.useState(false);
  const [embedLinkCopied, setEmbedLinkCopied] = React.useState(false);

  window.onwheel = () => open && handleCloseShareLink();
  const siteLink = window.location.href;
  const embedLink = `<div data-pym-src="${siteLink}&embed=true">Loading...</div><script type="text/javascript" src="https://pym.nprapps.org/pym-loader.v1.min.js"></script>`;

  const copySiteLink = () => {
    copy(siteLink);
    setSiteLinkCopied(true);
    setTimeout(() => {
      setSiteLinkCopied(false);
    }, 2000);
  };

  const copyEmbedLink = () => {
    copy(embedLink);
    setEmbedLinkCopied(true);
    setTimeout(() => {
      setEmbedLinkCopied(false);
    }, 2000);
  };
  return (
    <Popover
      // disableAutoFocus={true}
      // disableEnforceFocus={true}
      id={id}
      open={open}
      onClose={handleCloseShareLink}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Paper
        sx={{
          maxWidth: 286,
          p: 2,
          '& p': {
            py: 1,
          },
          '& .MuiFormControl-root': {
            width: '100%',
          },
          '& .MuiInputBase-input': {
            fontFamily: 'monospace',
            fontSize: 12,
          },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            color="textSecondary"
            dangerouslySetInnerHTML={{
              __html: 'SHARE A LINK',
            }}
          />
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{
              __html: 'Copy the link below:',
            }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={siteLink}
            disabled={true}
            InputProps={{
              endAdornment: (
                <Tooltip open={siteLinkCopied} title="Copied!" arrow placement="top">
                  <IconButton onClick={copySiteLink}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <Typography variant="body2">
            {'Copy this embed code into your website. '}
            <MuiLink href="https://evictionlab.org/help-faq/#map-embed">
              {'More information here.'}
            </MuiLink>
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={embedLink}
            disabled={true}
            InputProps={{
              endAdornment: (
                <Tooltip open={embedLinkCopied} title="Copied!" arrow placement="top">
                  <IconButton onClick={copyEmbedLink}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </Box>
      </Paper>
    </Popover>
  );
};

const Share = ({ className, ...props }) => {
  const [
    heading,
    description,
    twitterLabel,
    facebookLabel,
    emailLabel,
    linkLabel,
    tweetEvicted,
    tweetFiling,
    tweetEvictions,
    tweetEvictionFilings,
    tweetNoFeatures,
    tweetOneFeaturePerDay,
    tweetOneFeaturePerDayFilings,
    tweetOneFeature,
    tweetOneFeatureFilings,
    tweetTwoFeatures,
    tweetTwoFeaturesFilings,
    tweetThreeFeatures,
    tweetThreeFeaturesFilings,
  ] = useLang([
    'SHARE_HEADING',
    'SHARE_DESCRIPTION',
    'SHARE_LABEL_TWITTER',
    'SHARE_LABEL_FACEBOOK',
    'SHARE_LABEL_EMAIL',
    'SHARE_LABEL_LINK',
    'TWEET_EVICTED',
    'TWEET_FILING',
    'TWEET_EVICTIONS',
    'TWEET_EVICTION_FILINGS',
    'TWEET_NO_FEATURES',
    'TWEET_ONE_FEATURE_PER_DAY',
    'TWEET_ONE_FEATURE_PER_DAY_FILINGS',
    'TWEET_ONE_FEATURE',
    'TWEET_ONE_FEATURE_FILINGS',
    'TWEET_TWO_FEATURES',
    'TWEET_TWO_FEATURES_FILINGS',
    'TWEET_THREE_FEATURES',
    'TWEET_THREE_FEATURES_FILINGS',
  ]);

  const getUrl = () => encodeURIComponent(window.location.href);
  const [encodedUrl, setEncodedUrl] = React.useState(encodeURIComponent(window.location.href));
  const updateUrl = () => setEncodedUrl(getUrl());
  
  // const selectedLocations = useLocationData();
  // const { year, bubbleMetric } = useCurrentContext();
  const [shareLinkAnchorEl, setShareLinkAnchorEl] = React.useState(null);

  const handleCloseShareLink = () => {
    setShareLinkAnchorEl(null);
  };
  const shareLinkPopoverOpen = Boolean(shareLinkAnchorEl);
  const popoverId = shareLinkPopoverOpen ? 'share-link-popover' : undefined;
  
  const handleShareTwitter = () => {
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetNoFeatures.replace("{{link}}", window.location.href).replace("localhost:3000", "evictionlab.org/map/#"))}`
    window.open(twitterLink, 'sharer', objectToUrlParams(defaultOptions));
    // const featLength = selectedLocations.length;
    // const yearSuffix = year.toString().slice(2);
    // // Default to eviction rate if no highlight is set, sort by that property for share text
    // const countMetric = bubbleMetric.replace('r', '');
    // const countAccessor = `${countMetric}-${yearSuffix}`
    // const rateMetric = countMetric + 'r';
    // const isFilings = rateMetric == 'efr';
    // const rateAccessor = `${rateMetric}-${yearSuffix}`

    // let tweetParams = { year, link: encodedUrl };
    // let tweetTranslation = tweetNoFeatures;
    // let feat, features;

    // if (featLength > 0) {
    //   // Sort by eviction rate if selected or total eviction filings
    //   // const sortProp = `${action === 'er' ? action : 'ef'}-${yearSuffix}`;
    //   features = [ ...selectedLocations ].sort((a, b) =>
    //     a[countAccessor] > b[countAccessor] ? -1 : 1);

    //   // TODO: Potentially pull state abbreviation into place name
    //   feat = features[0];
    //   const countValue = feat[countAccessor];
    //   const rateValue = feat[rateAccessor];
    //   tweetParams['place1'] = feat.n;

    //   const daysInYear = year % 4 === 0 ? 366 : 365;
    //   tweetParams['perDay'] = countValue > 0 ?
    //     +(countValue / daysInYear).toFixed(2) : -1;

    //   tweetParams['total'] = countValue;
    //   tweetParams['rate'] = rateValue;

    //   if (featLength === 1) {
    //     // tweetParams['action'] = this.translatePipe.transform('DATA.TWEET_EVICTIONS');
    //     tweetParams['action'] = isFilings ? tweetEvictionFilings : tweetEvictions;
    //     if (tweetParams['perDay'] >= 50) {
    //       tweetTranslation = isFilings ? tweetOneFeaturePerDayFilings :  tweetOneFeaturePerDay;
    //       tweetParams = { ...tweetParams, units: tweetParams['perDay'] };
    //     } else {
    //       tweetTranslation = isFilings ? tweetOneFeatureFilings :  tweetOneFeature;
    //     }
    //   } else if (featLength > 1) {
    //     tweetParams['action'] = isFilings ? tweetFiling : tweetEvicted;
    //     if (featLength === 2) {
    //       tweetTranslation = isFilings ? tweetTwoFeaturesFilings :  tweetTwoFeatures;
    //       tweetParams = {
    //         ...tweetParams, place2: features[1].n
    //       };
    //     } else if (featLength === 3) {
    //       tweetTranslation = isFilings ? tweetThreeFeaturesFilings :  tweetThreeFeatures;
    //       tweetParams = {
    //         ...tweetParams,
    //         place2: features[1].n,
    //         place3: features[2].n
    //       };
    //     }
    //   }
    // }
    // console.log({ tweetTranslation, tweetParams })
  };
  const handleShareFacebook = () => {
    const facebookLink = `https://www.facebook.com/sharer.php?display=popup&u=${getUrl()}`;
    window.open(facebookLink, 'sharer', objectToUrlParams(defaultOptions));
  };
  const handleShareLink = (event) => {
    setShareLinkAnchorEl(event.currentTarget);
  };
  return (
    <Box className={clsx(className)} {...props}>
      <Typography variant="h2">{heading}</Typography>
      <Box className="actions__image" height={72}>
        <img src={getAssetPath('assets/img/share.svg')} alt="" />
      </Box>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
      <Box display="flex" gap={2}>
        <IconButton variant="bordered" onClick={handleShareTwitter}>
          <Twitter aria-label={twitterLabel} />
        </IconButton>
        <IconButton variant="bordered" onClick={handleShareFacebook}>
          <Facebook aria-label={facebookLabel} />
        </IconButton>
        <IconButton href={`mailto:?subject=Eviction%20Lab&body=${encodedUrl}`} LinkComponent={MuiLink} variant="bordered" onMouseEnter={updateUrl}>
          <Email aria-label={emailLabel} />
        </IconButton>
        <IconButton
          aria-describedby={popoverId}
          variant="bordered"
          onClick={handleShareLink}
          // onBlur={(e) => console.log({ e })}
          // onKeyDown={(e) => handleCloseShareLink()}
        >
          <Link aria-label={linkLabel} />
        </IconButton>
        {
          <ShareLinkPopover
            id={popoverId}
            open={shareLinkPopoverOpen}
            anchorEl={shareLinkAnchorEl}
            handleCloseShareLink={handleCloseShareLink}
          />
        }
      </Box>
    </Box>
  );
};

export default Share;
