import { useFullLocationData } from "../../hooks";
import { useAppConfig, useAccessor } from "@hyperobjekt/react-dashboard";

/**
 * Returns the confidence interval data for the selected locations
 * and national average (?).
 */
export default function useNationalAverageData(metricId) {
  const locationData = useFullLocationData();
  const years = useAppConfig("years");
  const accessor = useAccessor();
  const locationLines = locationData.map((location) => {
    const GEOID = location.GEOID;
    const name = location.n;
    const parent = location.pl;
    const data = years.map((year) => {
      // const key = accessor({ metric_id: metricId, year });
      const keyL = accessor({ metric_id: metricId + "l", year });
      const keyH = accessor({ metric_id: metricId + "h", year });
      console.log(year, location[keyL], location[keyH]);
      return {
        x: year,
        y0: location[keyL],
        y1: location[keyH],
      };
    });
    // TODO: omit all but data?
    return { GEOID, name, parent, data };
  });
  return locationLines;
}
