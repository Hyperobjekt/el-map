import React from "react";
import { LocationHeader } from "../../components";
import { ScorecardStyle } from "../Scorecards.style";
import { List, ListItem, ListSubheader, Typography } from "@mui/material";
import useMetricsWithData from "../../hooks/useMetricsWithData";

const LocationScorecard = ({ data, color, onDismiss, ...props }) => {
  const metrics = useMetricsWithData(data);
  const censusDemographics = metrics.filter(
    (m) => m.category === "demographics"
  );
  const evictionMetrics = metrics
    .filter((m) => m.category === "evictions")
    .filter((m) => Boolean(m.value));
  return (
    <ScorecardStyle {...props}>
      <LocationHeader
        className="scorecard__header"
        marker
        name={data?.n}
        parentName={data?.pl}
        color={color}
        onDismiss={onDismiss}
      />
      <List className="scorecard__list">
        {evictionMetrics.map(({ id, name, formattedValue }) => (
          <ListItem className="scorecard__list-item" key={id}>
            <Typography>{name}</Typography>
            <Typography variant="number">{formattedValue}</Typography>
          </ListItem>
        ))}
        <ListSubheader className="scorecard__subheader">
          Census Demographics
        </ListSubheader>
        {censusDemographics.map(({ id, name, formattedValue }) => (
          <ListItem className="scorecard__list-item" key={id}>
            <Typography>{name}</Typography>
            <Typography variant="number">{formattedValue}</Typography>
          </ListItem>
        ))}
      </List>
    </ScorecardStyle>
  );
};

export default LocationScorecard;
