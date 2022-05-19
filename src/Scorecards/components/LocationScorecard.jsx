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
import HintTypography from "../../components/HintTypography";
import { Scoreboard } from "@mui/icons-material";
import clsx from "clsx";
import { Box, fontWeight } from "@mui/system";
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
  hint,
  note = null,
  noExtremes = false,
  noHint = false,
  className,
}) => {
  const formattedValue = value === undefined ? "" : formatter(value);
  const showCI =
    !noExtremes &&
    isNumber(min) &&
    isNumber(max) &&
    (min !== value || max !== value);

  // console.log({ hint, id });
  return (
    <ListItem className={clsx(className, "scorecard__list-item")} key={id}>
      {note}
      <HintTypography
        Icon={null}
        underline={true}
        hint={!noHint && hint}
        className="scorecard__item-name"
      >
        {name}
      </HintTypography>
      <Box className="scorecard__value-wrapper">
        <Typography className="scorecard__item-value" variant="number">
          {formattedValue}
        </Typography>
        {showCI && (
          <Box className="extremes">
            {[
              { v: min, n: "MIN" },
              { v: max, n: "MAX" },
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
    .filter((m) => isNumber(m.value));

  // console.log({ evictionMetrics });

  const prominentMetric =
    evictionMetrics.find(({ id }) => id === "e") ||
    evictionMetrics.find(({ id }) => id === "ef");

  const metricId = prominentMetric?.id;
  const rateId = metricId + "r";
  let ProminentMetricItem = null;
  let ProminentRateItem = null;

  const rateName = useLang(`METRIC_PROMINENT_RATE_${rateId}`);
  if (prominentMetric) {
    ProminentMetricItem = (
      <ScorecardItem
        {...prominentMetric}
        value={prominentMetric.value / 365}
        noExtremes={true}
        noHint={true}
        name={useLang(`METRIC_PROMINENT_DAILY_${metricId}`)}
        className={clsx("prominent-item", "scorecard__metric")}
      />
    );

    // find corresponding rate
    const prominentRate = evictionMetrics.find(({ id }) => id === rateId);

    if (!prominentRate) {
      // placeholder instead of rate to preserve styling
      ProminentRateItem = <ListItem />;
    } else {
      // remove it from list so it's not repeated
      evictionMetrics = evictionMetrics.filter(({ id }) => id !== rateId);

      const metricKey = metricAbbrevMap[rateId];
      const natAvg = getNatAvgValue({ data: natAvgData, metricKey, year });
      // console.log({ ProminentMetricItem, prominentRate });

      const diffAvg = !!natAvg && prominentRate.value - natAvg;
      const Note = isNumber(diffAvg) && (
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
          name={rateName}
          note={Note}
          className={clsx("prominent-item", "scorecard__rate")}
        />
      );
    }
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
      <List className={clsx("scorecard__list", "eviction-metrics")}>
        {ProminentMetricItem}
        {ProminentRateItem}

        {evictionMetrics.map(ScorecardItem)}
      </List>
      <List className={clsx("scorecard__list", "demographic-metrics")}>
        <ListSubheader variant="h1">
          <HintTypography
            className="scorecard__subheader"
            noFlex={true}
            component="span"
            variant="body2"
            Icon={null}
            underline={true}
            hint={useLang("HINT_DEMOGRAPHICS")}
          >
            {useLang("CENSUS_DEMOGRAPHICS")}
          </HintTypography>
        </ListSubheader>
        {censusDemographics.map(ScorecardItem)}
      </List>
    </ScorecardStyle>
  );
};

export default LocationScorecard;
