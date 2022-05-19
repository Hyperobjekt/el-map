import React from "react";
import { LocationHeader } from "../../components";
import { ScorecardStyle } from "../Scorecards.style";
import { Icon, List, ListItem, ListSubheader, Typography } from "@mui/material";
import useMetricsWithData from "../../hooks/useMetricsWithData";
import {
  useLang,
  formatInteger,
  formatPercentValue,
  useAppConfig,
  useCurrentContext,
} from "@hyperobjekt/react-dashboard";
import { Scoreboard } from "@mui/icons-material";
import clsx from "clsx";
import { Box } from "@mui/system";
import useNationalAverageData from "../../Charts/hooks/useNationalAverageData";
import { getNatAvgValue, isNumber } from "../../utils";

const ScorecardItem = ({
  id,
  name,
  formatter,
  value,
  min,
  max,
  format,
  note = null,
  noExtremes = false,
  className,
}) => {
  const formattedValue = value === undefined ? "" : formatter(value);
  const showCI =
    !noExtremes &&
    isNumber(min) &&
    isNumber(max) &&
    (min !== value || max !== value);
  return (
    <ListItem className={clsx(className, "scorecard__list-item")} key={id}>
      {note}
      <Typography className="scorecard__item-name">{name}</Typography>
      <Box className="scorecard__value-wrapper">
        <Typography className="scorecard__item-value" variant="number">
          {formattedValue}
        </Typography>
        {showCI && (
          <Box className="extremes">
            {[
              { v: max, n: "MAX" },
              { v: min, n: "MIN" },
            ].map(({ v, n }) => {
              // TODO: formalize this logic
              const f =
                format === "percent_value"
                  ? formatPercentValue
                  : v > 1
                  ? formatInteger // 21,110 (rather than 21.1k)
                  : formatter; // 0.15 (rather than 0)
              return (
                <Typography variant="caption" color="textSecondary">
                  {n}: <strong>{f(v)}</strong>
                </Typography>
              );
            })}
          </Box>
        )}
        {/* {!noExtremes && min && max && (
          <Icon />   FLAG
        )} */}
      </Box>
    </ListItem>
  );
};

const LocationScorecard = ({ data, color, onDismiss, ...props }) => {
  const { year } = useCurrentContext();
  const metricAbbrevMap = useAppConfig("metric_abbrev_map");
  const natAvgData = useNationalAverageData();

  const metrics = useMetricsWithData(data);
  const censusDemographics = metrics.filter(
    (m) => m.category === "demographics"
  );
  let evictionMetrics = metrics
    .filter((m) => m.category === "evictions")
    .filter((m) => !Boolean(m.unavailable))
    .filter((m) => Boolean(m.value));

  console.log({ evictionMetrics });

  const prominentMetric =
    evictionMetrics.find(({ id }) => id === "e") ||
    evictionMetrics.find(({ id }) => id === "ef");

  const metricId = prominentMetric?.id;
  let ProminentMetricItem = null;
  let ProminentRateItem = null;

  if (prominentMetric) {
    // find corresponding rate
    const rateId = metricId + "r";
    const prominentRate = evictionMetrics.find(({ id }) => id === rateId);
    // remove it from list
    evictionMetrics = evictionMetrics.filter(({ id }) => id !== rateId);

    ProminentMetricItem = (
      <ScorecardItem
        {...prominentMetric}
        value={prominentMetric.value / 365}
        noExtremes={true}
        name={useLang(`METRIC_PROMINENT_DAILY_${metricId}`)}
        className={clsx("prominent-item", "scorecard__metric")}
      />
    );

    const metricKey = metricAbbrevMap[rateId];
    const natAvg = getNatAvgValue({ data: natAvgData, metricKey, year });
    console.log({ ProminentMetricItem, prominentRate });

    const diffAvg = !!natAvg && prominentRate.value - natAvg;
    const Note = isNumber(natAvg) && (
      <Typography
        className={clsx("prominent-note", {
          worseThan: diffAvg > 0,
        })}
      >
        {`${diffAvg >= 0 ? "+" : ""}${
          Math.round(diffAvg * 100) / 100
        } U.S. average`}
      </Typography>
    );

    ProminentRateItem = (
      <ScorecardItem
        {...prominentRate}
        value={prominentRate.value}
        name={useLang(`METRIC_PROMINENT_RATE_${rateId}`)}
        note={Note}
        className={clsx("prominent-item", "metric")}
      />
    );
  }

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
        {ProminentMetricItem}
        {ProminentRateItem}

        {evictionMetrics.map(ScorecardItem)}
        <ListSubheader className="scorecard__subheader">
          {useLang("CENSUS_DEMOGRAPHICS")}
        </ListSubheader>
        {censusDemographics.map(ScorecardItem)}
      </List>
    </ScorecardStyle>
  );
};

export default LocationScorecard;
