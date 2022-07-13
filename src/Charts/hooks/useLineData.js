import { useFullLocationData } from '../../hooks';
import { useAppConfig, useAccessor } from '@hyperobjekt/react-dashboard';
import { getIsSuppressed, isNumber } from '../../utils';
import useDataMode from '../../hooks/useDataMode';
import useFlagData from '../../hooks/useFlagData';

/**
 * Returns the line data for the selected locations
 */
export default function useLineData(metric_id) {
  const [dataMode] = useDataMode();
  const flagData = useFlagData();

  const locationData = useFullLocationData();
  const years = useAppConfig('years');
  const accessor = useAccessor();
  const locationLines = locationData.map((location) => {
    const GEOID = location.GEOID;
    const name = location.n;
    const parent = location.pl;
    const data = years.map((year) => {
      const key = accessor({ metric_id, year });
      // suppressed data shouldn't be plotted
      const isSuppressed = getIsSuppressed({
        flagData,
        dataMode,
        metricId: metric_id,
        geoid: GEOID,
        year,
      });
      return {
        x: year,
        y: isSuppressed ? null : location[key],
      };
    });
    return { GEOID, name, parent, data: data.filter((d) => isNumber(d.y)) };
  });
  return locationLines;
}
