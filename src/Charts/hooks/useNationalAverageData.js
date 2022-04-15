import { useFullLocationData } from "../../hooks";
import { useAppConfig, useAccessor } from "@hyperobjekt/react-dashboard";
import { csv } from "d3-fetch";
import { useMemo } from "react";

// const parseAvg = (avg = {}) => {};

/**
 * Returns the confidence interval data for the selected locations
 * and national average (?).
 */
export default async function useNationalAverageData(metricId) {
  const avgUrl = useAppConfig("national_data");
  const avgData = await useMemo(
    async () => console.log("FETCH") || (await csv(avgUrl)),
    []
  );
  // const avgData = await csv(avgUrl);

  console.log("AA", avgUrl);
  console.log("AA", avgData);
  const metricKey = useAppConfig("metric_abbrev_map");
  console.log(metricKey);
  return avgData.map((d) => ({
    x: d.year,
    y: d[metricKey],
  }));
}
