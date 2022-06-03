import { useFullLocationData } from '../../hooks';
import { useAppConfig, useAccessor } from '@hyperobjekt/react-dashboard';
import { isNumber } from '../../utils';

/**
 * Returns the confidence interval data for the selected locations
 * and national average (?).
 */
export default function useConfidenceIntervalData(metricId) {
  const locationData = useFullLocationData();
  const years = useAppConfig('years');
  const accessor = useAccessor();
  const locationLines = locationData.map((location) => {
    const GEOID = location.GEOID;
    // const name = location.n;
    // const parent = location.pl;
    const data = years.reduce((accum, year) => {
      const key = accessor({ metric_id: metricId, year });
      const d = location[key];
      // no bounds if no data point
      if (!isNumber(d)) return accum;

      const keyL = accessor({ metric_id: metricId + 'l', year });
      let dL = location[keyL];

      const keyH = accessor({ metric_id: metricId + 'h', year });
      let dH = location[keyH];

      // no bounds if no bound data
      if (!isNumber(dL) && !isNumber(dH)) return accum;

      // if we have just one bound (possible?), use data point as the other
      if (!isNumber(dL)) dL = d;
      else if (!isNumber(dH)) dH = d;

      // NOTE: sometimes L and H vals swapped in data, so correct for it here
      const yLow = Math.min(dL, dH);
      const yHigh = Math.max(dL, dH);
      accum.push({ x: year, yLow, yHigh });
      return accum;
    }, []);
    // TODO: omit all but data?

    return { data, GEOID };
  });
  return locationLines;
}
