import { Link, Typography } from '@mui/material';
import React from 'react';

const linkRgx = /{{\[[^)]+\]\([^)]+\)}}/;
const capturedLinkRgx = /{{\[([^)]+)\]\(([^)]+)\)}}/g;
const emailRgx = /^\S+@\S+\.\w+$/;
/**
 * This is the Mui Typography component, wrapped in an optional tooltip hint.
 */
const LinkedTypography = ({ text, ...props }) => {
  const getLink = ([, name, link], index) => {
    return (
      <Link
        key={index}
        href={`${emailRgx.test(link) ? 'mailto:' : ''}${link}`}
        target="_blank"
        rel="noopener"
      >
        {name}
      </Link>
    );
  };

  let links = [...text.matchAll(capturedLinkRgx)].reverse();
  const content = text.split(linkRgx).reduce((accum, t, i) => {
    // if (!accum.length && startsWithLink) accum.push(getLink(links.pop()));
    accum.push(t);
    if (links.length) accum.push(getLink(links.pop(), i));
    return accum;
  }, []);

  return (
    <Typography sx={{}} {...props}>
      {content}
    </Typography>
  );
};

export default LinkedTypography;
