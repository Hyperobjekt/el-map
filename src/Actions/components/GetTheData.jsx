import { Typography, Button, Box } from "@mui/material";
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
      <Typography variant="h3">{heading}</Typography>
      <Box className="actions__image" height={72}>
        <img src="/assets/img/get-the-data.svg" alt="" />
      </Box>
      <Typography variant="caption">{description}</Typography>
      <Button variant="outlined" onClick={handleGetData}>
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default GetTheData;
