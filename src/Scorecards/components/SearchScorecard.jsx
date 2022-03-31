import React from "react";
import { ScorecardStyle } from "../Scorecards.style";

const SearchScorecard = ({ onSelect, ...props }) => {
  return <ScorecardStyle {...props}>Search Scorecard</ScorecardStyle>;
};

export default SearchScorecard;
