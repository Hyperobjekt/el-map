import { Typography, Box, IconButton } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useLang } from '@hyperobjekt/react-dashboard';
import { Email, Facebook, Link, Twitter } from '../../Icons';
import { getAssetPath } from '../../utils';

const Share = ({ className, ...props }) => {
  const [heading, description, twitterLabel, facebookLabel, emailLabel, linkLabel] = useLang([
    'SHARE_HEADING',
    'SHARE_DESCRIPTION',
    'SHARE_LABEL_TWITTER',
    'SHARE_LABEL_FACEBOOK',
    'SHARE_LABEL_EMAIL',
    'SHARE_LABEL_LINK',
  ]);
  const handleShareTwitter = () => {};
  const handleShareFacebook = () => {};
  const handleShareEmail = () => {};
  const handleShareLink = () => {};
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
        <IconButton variant="bordered" onClick={handleShareEmail}>
          <Email aria-label={emailLabel} />
        </IconButton>
        <IconButton variant="bordered" onClick={handleShareLink}>
          <Link aria-label={linkLabel} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Share;
