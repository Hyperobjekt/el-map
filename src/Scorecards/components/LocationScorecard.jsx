import React from 'react';
import { LocationHeader } from '../../components';
import { ScorecardStyle } from '../Scorecards.style';
import { List, ListItem, ListSubheader, Typography } from '@mui/material';
import useMetricsWithData from '../../hooks/useMetricsWithData';
import { useLang, useCurrentContext } from '@hyperobjekt/react-dashboard';
import HintTypography from '../../components/HintTypography';
import { Scoreboard } from '@mui/icons-material';
import clsx from 'clsx';
import { Box } from '@mui/system';
import useNationalAverageData from '../../Charts/hooks/useNationalAverageData';
import { getIsSuppressed, getNatAvgValue, isNumber } from '../../utils';
import MetricFlag from '../../components/MetricFlag';
import { getFormattedValues } from '../../components/utils';
import useFlagData from '../../hooks/useFlagData';
import useDataMode from '../../hooks/useDataMode';

const ScorecardItem = ({
  metric,
  geoid,
  k,
  note = null,
  disableCI = false,
  noHint = false,
  className,
  ...props
}) => {
  const { year } = useCurrentContext();
  const [dataMode] = useDataMode();
  const flagData = useFlagData();
  const isSuppressed = getIsSuppressed({
    flagData,
    dataMode,
    metricId: metric.id,
    geoid,
    year,
  });
  const hiddenLabel = useLang('HIDDEN_LABEL');
  const { fMin, fMax, fVal, meaningfulCI } = isSuppressed
    ? { fVal: hiddenLabel }
    : getFormattedValues(metric);

  return (
    <ListItem className={clsx(className, 'scorecard__list-item')} key={k || metric.id}>
      {note}
      <HintTypography
        Icon={null}
        underline={true}
        hint={!noHint && metric.hint}
        className="scorecard__item-name"
      >
        {metric.name}
      </HintTypography>
      <Box className="scorecard__value-wrapper">
        <Typography className="scorecard__item-value" variant="number">
          {fVal}
        </Typography>
        {!disableCI && meaningfulCI && (
          <Box className="extremes">
            <Typography variant="caption" color="textSecondary">
              MIN: <strong>{fMin}</strong>
            </Typography>

            <Typography variant="caption" color="textSecondary">
              MAX: <strong>{fMax}</strong>
            </Typography>
          </Box>
        )}
        {geoid && (
          <MetricFlag geoid={geoid} year={year} metricId={metric.id} value={metric.value} />
        )}
      </Box>
    </ListItem>
  );
};

const EvictionMetrics = ({ evictionMetrics, geoid }) => {
  const natAvgData = useNationalAverageData();
  const { year } = useCurrentContext();
  const [dataMode] = useDataMode();
  const flagData = useFlagData();

  // display prominent rate at top of scorecard
  // use eviction rate, or otherwise eviction filing rate
  // but don't display prominently if data is missing or suppressed
  const prominentMetricPriority = ['e', 'ef'];
  const prominentMetricId = prominentMetricPriority.find((mId) =>
    evictionMetrics.find(
      ({ id }) =>
        id === mId &&
        !getIsSuppressed({
          flagData,
          dataMode,
          metricId: id + 'r', // it's the rate that would be suppressed
          geoid,
          year,
        }),
    ),
  );
  const prominentMetric =
    prominentMetricId && evictionMetrics.find(({ id }) => id === prominentMetricId);

  const rateId = prominentMetricId + 'r';

  const metricName = useLang(`METRIC_PROMINENT_DAILY_${prominentMetricId}`);
  const rateName = useLang(`METRIC_PROMINENT_RATE_${rateId}`);
  const usAvg = useLang(`US_AVERAGE`);

  if (!prominentMetric) {
    // if no prominent metric found, simply return them all as a list
    return evictionMetrics.map((m) => <ScorecardItem geoid={geoid} metric={m} />);
  }

  const ProminentMetricItem = (
    <ScorecardItem
      metric={{
        ...prominentMetric,
        value: prominentMetric.value / 365,
        name: metricName,
      }}
      k="pmi"
      geoid={geoid}
      disableCI={true}
      noHint={true}
      className={clsx('prominent-item', 'scorecard__metric')}
    />
  );

  // find corresponding rate
  const prominentRate = evictionMetrics.find(({ id }) => id === rateId);
  // placeholder if there's no corresponding rate to preserve styling
  let ProminentRateItem = <ListItem />;

  if (prominentRate) {
    // remove it from list so it's not repeated
    evictionMetrics = evictionMetrics.filter(({ id }) => id !== rateId);

    const natAvg = getNatAvgValue({
      data: natAvgData,
      metric_id: rateId,
      year,
    });
    const diffAvg = isNumber(natAvg) && prominentRate.value - natAvg;
    const Note = isNumber(diffAvg) && (
      <Typography
        className={clsx('prominent-note', {
          worseThan: diffAvg > 0,
        })}
      >
        {`${diffAvg >= 0 ? '+' : ''}${Math.round(diffAvg * 100) / 100} ${usAvg}`}
      </Typography>
    );

    ProminentRateItem = (
      <ScorecardItem
        metric={{
          ...prominentRate,
          name: rateName,
        }}
        k="pri"
        geoid={geoid}
        note={Note}
        className={clsx('prominent-item', 'scorecard__rate')}
      />
    );
  }

  return (
    <>
      {ProminentMetricItem}
      {ProminentRateItem}
      {evictionMetrics.map((m) => (
        <ScorecardItem geoid={geoid} metric={m} />
      ))}
    </>
  );
};

const LocationScorecard = ({ data, color, onDismiss, geoid, ...props }) => {
  const metrics = useMetricsWithData(data);
  const censusDemographics = metrics.filter((m) => m.category === 'demographics');
  let evictionMetrics = metrics
    .filter((m) => m.category === 'evictions')
    .filter((m) => !Boolean(m.unavailable))
    .filter((m) => isNumber(m.value));

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
      <List className={clsx('scorecard__list', 'eviction-metrics')}>
        <EvictionMetrics evictionMetrics={evictionMetrics} geoid={geoid} />
        {/* {evictionMetrics.map(ScorecardItem)} */}
      </List>
      <List className={clsx('scorecard__list', 'demographic-metrics')}>
        <ListSubheader variant="h1">
          <HintTypography
            className="scorecard__subheader"
            noFlex={true}
            component="span"
            variant="body2"
            Icon={null}
            underline={true}
            hint={useLang('HINT_DEMOGRAPHICS')}
          >
            {useLang('CENSUS_DEMOGRAPHICS')}
          </HintTypography>
        </ListSubheader>
        {censusDemographics.map((m) => (
          <ScorecardItem metric={m} />
        ))}
      </List>
    </ScorecardStyle>
  );
};

export default LocationScorecard;
