import { Box } from "@mui/material";
import React from "react";
import BackToMapButton from "../Map/components/BackToMapButton";
import { ActionsStyle } from "./Actions.style";
import { GetTheData, Reports, Share } from "./components";

const Actions = () => {
  return (
    <ActionsStyle className="actions__root">
      <Box className="actions__wrapper body__content">
        <Share className="actions__block" />
        <Reports className="actions__block" />
        <GetTheData className="actions__block" />
      </Box>
      <BackToMapButton className="actions__back" />
    </ActionsStyle>
  );
};

export default Actions;
