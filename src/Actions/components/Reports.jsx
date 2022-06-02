import { Typography, Button, Box } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { useLang } from "@hyperobjekt/react-dashboard";

const Reports = ({ className, ...props }) => {
  const [heading, description, buttonLabel] = useLang([
    "REPORTS_HEADING",
    "REPORTS_DESCRIPTION",
    "REPORTS_BUTTON_LABEL_TEMP",
    // "REPORTS_BUTTON_LABEL",
  ]);
  const handleSelectReports = () => {};
  return (
    <Box className={clsx(className)} {...props}>
      <Typography variant="h2">{heading}</Typography>
      <Box className="actions__image" height={72}>
        <img src="/assets/img/download.svg" alt="" />
      </Box>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
      <Button disabled={true} variant="bordered" onClick={handleSelectReports}>
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default Reports;
