import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { SearchInput } from "../../UI";
import { ScorecardStyle } from "../Scorecards.style";
import { useLang } from "@hyperobjekt/react-dashboard";

const SearchScorecard = ({ onSelect, className, ...props }) => {
  return (
    <ScorecardStyle className="search-card__root" {...props}>
      <Box className={clsx("search-card__content", className)}>
        <Typography className="search-card__text" variant="h4" component="h3">
          {useLang("HEADER_ADD_LOCATION")}
        </Typography>
        <SearchInput placeholder={useLang("HEADER_SEARCH_PLACEHOLDER")} className="search-card__search" />
      </Box>
    </ScorecardStyle>
  );
};

export default SearchScorecard;
