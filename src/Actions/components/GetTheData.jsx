import { Typography, Button, Box, Link } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { useLang } from "@hyperobjekt/react-dashboard";

const GetTheData = ({ className, ...props }) => {
  const [heading, description, buttonLabel] = useLang([
    "GETDATA_HEADING",
    "GETDATA_DESCRIPTION",
    "GETDATA_BUTTON_LABEL",
  ]);
  const handleGetData = () => {};
  return (
    <Box className={clsx(className)} {...props}>
      <Typography variant="h2">{heading}</Typography>
      <Box className="actions__image" height={72}>
        <img src="/assets/img/get-the-data.svg" alt="" />
      </Box>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
      <Link
        href="https://evictionlab.org/get-the-data/"
        target="_blank"
        rel="noopener"
      >
        <Button variant="bordered">{buttonLabel}</Button>
      </Link>
    </Box>
  );
};

export default GetTheData;
