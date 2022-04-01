import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { SearchInput } from "../../UI";
import { ScorecardStyle } from "../Scorecards.style";

const SearchScorecard = ({ onSelect, className, ...props }) => {
  return (
    <ScorecardStyle className="search-card__root" {...props}>
      <Box className={clsx("search-card__content", className)}>
        <Typography className="search-card__text" variant="h4" component="h3">
          Add Another Location
        </Typography>
        <SearchInput className="search-card__search" />
      </Box>
    </ScorecardStyle>
  );
};

export default SearchScorecard;
