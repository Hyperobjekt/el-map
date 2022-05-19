import { csvParse } from "d3-dsv";
import { useDashboardStore, useAppConfig } from "@hyperobjekt/react-dashboard";
import { useEffect } from "react";

// const parseTimeSeries = (timeSeries = {}) => ({
//   x: timeSeries.year,
// });

/**
 * Returns the national average data.
 */
export default function useNationalAverageData() {
  // load the value set in state
  const natAvgData = useDashboardStore((state) => state.natAvgData);
  // console.log({ natAvgData });
  const setState = useDashboardStore((state) => state.set);
  const avgUrl = useAppConfig("national_data");
  const setNatAvgData = (natAvgData) => setState({ natAvgData });

  useEffect(() => {
    if (natAvgData) return;
    fetch(avgUrl).then((response) => {
      console.log("GO FETCH!!!!!!!!");
      response.text().then((data) => {
        setNatAvgData(csvParse(data));
      });
    });
  }, []);
  return natAvgData || [];
}
