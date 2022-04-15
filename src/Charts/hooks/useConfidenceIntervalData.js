import { useFullLocationData } from "../../hooks";
import { useAppConfig, useAccessor } from "@hyperobjekt/react-dashboard";

/**
 * Returns the confidence interval data for the selected locations
 * and national average (?).
 */
export default function useConfidenceIntervalData(metricId) {
  const locationData = useFullLocationData();
  const years = useAppConfig("years");
  const accessor = useAccessor();
  const locationLines = locationData.map((location) => {
    const GEOID = location.GEOID;
    const name = location.n;
    const parent = location.pl;
    const data = years.map((year) => {
      const key = accessor({ metric_id: metricId, year });
      const keyL = accessor({ metric_id: metricId + "l", year });
      const keyH = accessor({ metric_id: metricId + "h", year });
      console.log(
        year,
        location[keyL] > location[keyH],
        location[keyL] < location[keyH],
        location[keyL],
        location[key],
        location[keyH]
      );
      // NOTE: sometimes L and H vals swapped in data, so correct for it here
      return {
        x: year,
        y0: Math.min(location[keyL], location[keyH]),
        y1: Math.max(location[keyL], location[keyH]),
      };
    };);
    // TODO: omit all but data?
    console.log("UCID UPDATE");
    return { GEOID, name, parent, data };
  });
  return locationLines;
}
