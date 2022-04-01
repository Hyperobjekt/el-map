import { useFullLocationData } from "../../hooks";
import { useAppConfig, useAccessor } from "@hyperobjekt/react-dashboard";

/**
 * Returns the line data for the selected locations
 * and national average.
 * TODO: needs additional data:
 * - national average line data
 * - high / low data for each location
 */
export default function useLineData(metricId) {
  const locationData = useFullLocationData();
  const years = useAppConfig("years");
  const accessor = useAccessor();
  const locationLines = locationData.map((location) => {
    const GEOID = location.GEOID;
    const name = location.n;
    const parent = location.pl;
    const data = years.map((year) => {
      const key = accessor({ metric_id: metricId, year });
      return {
        x: year,
        y: location[key],
      };
    });
    return { GEOID, name, parent, data };
  });
  return locationLines;
}
