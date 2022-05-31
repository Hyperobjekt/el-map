import React from "react";
import useDataMode from "../hooks/useDataMode";
import useFlagData from "../hooks/useFlagData";
import { Warning } from "../Icons";
import { getFlags } from "../utils";
import HintTypography from "./HintTypography";
import { useLang, useLangStore } from "@hyperobjekt/react-dashboard";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

/**
 * Component for displaying flag next to metrics.
 */
const MetricFlag = ({ geoid, region, year, metricId, value, ...props }) => {
  const [dataMode] = useDataMode();
  const lang = useLangStore((state) => state.language);
  // console.log({useLangStore, lang})
  const flagData = useFlagData();
  const flags = getFlags({
    flagData,
    dataMode,
    region,
    metricId,
    geoid,
    year,
    value,
    lang,
    useLang,
  });
  if (!flags || !flags.length) return null;
  // console.log({ flags})
  const HintText = (
    <Box p={1}>
      {flags.map((v, i) => (
        <Typography mt={i ? 0.5 : 0} display="block" variant="caption" key={i}>
          {v}
        </Typography>
      ))}
    </Box>
  );
  return (
    <HintTypography
      className="metric-flag"
      hint={HintText}
      Icon={Warning}
    />
  );
};

export default MetricFlag;
