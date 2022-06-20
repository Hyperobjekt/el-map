import React from 'react';
import useDataMode from '../hooks/useDataMode';
import useFlagData from '../hooks/useFlagData';
import { Warning } from '../Icons';
import { getFlags } from '../utils';
import HintTypography from './HintTypography';
import { useLang, useLangStore } from '@hyperobjekt/react-dashboard';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

/**
 * Component for displaying flag next to metrics.
 */
const MetricFlag = ({ geoid, year, metricId, value, ...props }) => {
  const [dataMode] = useDataMode();
  const activeLanguage = useLangStore((state) => state.language);

  const flagData = useFlagData();
  const flags = getFlags({
    flagData,
    dataMode,
    metricId,
    geoid,
    year,
    value,
    activeLanguage,
  });
  if (!flags || !flags.length) return null;

  const HintText = (
    <Box p={1}>
      {flags.map((v, i) => (
        <Typography mt={i ? 0.5 : 0} display="block" variant="caption" key={i}>
          {v}
        </Typography>
      ))}
    </Box>
  );
  return <HintTypography className="metric-flag" hint={HintText} Icon={Warning} />;
};

export default MetricFlag;
