import {
  Typography,
  Box,
  Link as MuiLink,
  IconButton,
  Popover,
  Paper,
  TextField,
  Tooltip,
} from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useLang } from '@hyperobjekt/react-dashboard';
import { Email, Facebook, Twitter, Link } from '../../Icons';
import { getAssetPath, trackEvent } from '../../utils';
import { ContentCopy } from '@mui/icons-material';
import copy from 'copy-to-clipboard';
import LinkedTypography from '../../components/LinkedTypography';
import _ from 'lodash';
import useDataMode from '../../hooks/useDataMode';

const defaultOptions = {
  width: 626,
  height: 436,
  toolbar: 0,
  status: 0,
  resizable: 1,
};
const objectToUrlParams = (obj) => {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join(',');
};

const ShareLinkPopover = ({ id, open, anchorEl, handleClose }) => {
  const [header, hint, embedHint, copySuccess] = useLang([
    'SHARE_LINK_HEADER',
    'SHARE_LINK_HINT',
    'SHARE_LINK_EMBED_HINT',
    'COPY_SUCCESS',
  ]);

  const [siteLinkCopied, setSiteLinkCopied] = React.useState(false);
  const [embedLinkCopied, setEmbedLinkCopied] = React.useState(false);

  window.onwheel = () => open && handleClose();
  const siteLink = window.location.href;
  const embedLink = `<div data-pym-src="${siteLink}&embed=true">Loading...</div><script type="text/javascript" src="https://pym.nprapps.org/pym-loader.v1.min.js"></script>`;

  const [datasetType] = useDataMode();
  const trackShareLink = _.debounce(
    () => trackEvent('mapShare', { mapShareType: 'link', datasetType }),
    1000,
  );
  const trackShareEmbed = _.debounce(
    () => trackEvent('mapShare', { mapShareType: 'link-embed', datasetType }),
    1000,
  );

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
      onClose={handleClose}
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
            sx={{ textTransform: 'uppercase' }}
            dangerouslySetInnerHTML={{
              __html: header,
            }}
          />
          <Typography
            variant="body2"
            dangerouslySetInnerHTML={{
              __html: hint,
            }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={siteLink}
            // captures clicking the copy button as well as text selection
            onClick={trackShareLink}
            disabled={true}
            InputProps={{
              endAdornment: (
                <Tooltip open={siteLinkCopied} title={copySuccess} arrow placement="top">
                  <IconButton onClick={copySiteLink}>
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
          <LinkedTypography variant="body2" text={embedHint} />
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            value={embedLink}
            // captures clicking the copy button as well as text selection
            onClick={trackShareEmbed}
            disabled={true}
            InputProps={{
              endAdornment: (
                <Tooltip open={embedLinkCopied} title={copySuccess} arrow placement="top">
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
  const [heading, description, twitterLabel, facebookLabel, emailLabel, linkLabel, tweet] = useLang(
    [
      'SHARE_HEADING',
      'SHARE_DESCRIPTION',
      'SHARE_LABEL_TWITTER',
      'SHARE_LABEL_FACEBOOK',
      'SHARE_LABEL_EMAIL',
      'SHARE_LABEL_LINK',
      'SHARE_TWEET',
    ],
  );

  const getUrl = () => encodeURIComponent(window.location.href);
  const [emailUrl, setEmailUrl] = React.useState(encodeURIComponent(getUrl()));
  const updateEmailUrl = () => setEmailUrl(getUrl());

  const [linkAnchorEl, setLinkAnchorEl] = React.useState(null);
  const handleCloseLink = () => setLinkAnchorEl(null);
  const linkPopoverOpen = Boolean(linkAnchorEl);
  const popoverId = linkPopoverOpen ? 'share-link-popover' : undefined;
  const [datasetType] = useDataMode();

  const handleShareLink = (event) => {
    setLinkAnchorEl(event.currentTarget);
  };
  const handleShareTwitter = () => {
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweet.replace('{{link}}', window.location.href),
    )}`;
    window.open(twitterLink, 'sharer', objectToUrlParams(defaultOptions));

    trackEvent('mapShare', { mapShareType: 'twitter', datasetType });
  };
  const handleShareFacebook = () => {
    const facebookLink = `https://www.facebook.com/sharer.php?display=popup&u=${getUrl()}`;
    window.open(facebookLink, 'sharer', objectToUrlParams(defaultOptions));

    trackEvent('mapShare', { mapShareType: 'facebook', datasetType });
  };
  const handleShareEmail = () => {
    trackEvent('mapShare', { mapShareType: 'email', datasetType });
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
        <IconButton
          href={`mailto:?subject=Eviction%20Lab&body=${emailUrl}`}
          LinkComponent={MuiLink}
          variant="bordered"
          onMouseEnter={updateEmailUrl}
          onClick={handleShareEmail}
        >
          <Email aria-label={emailLabel} />
        </IconButton>
        <IconButton onClick={handleShareLink} aria-describedby={popoverId} variant="bordered">
          <Link aria-label={linkLabel} />
        </IconButton>
        {
          <ShareLinkPopover
            id={popoverId}
            open={linkPopoverOpen}
            anchorEl={linkAnchorEl}
            handleClose={handleCloseLink}
          />
        }
      </Box>
    </Box>
  );
};

export default Share;
