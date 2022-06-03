import { csvParse } from 'd3-dsv';
import { useDashboardStore, useAppConfig } from '@hyperobjekt/react-dashboard';
import { useEffect } from 'react';

const rawMetricsUsed = ['er'];
const modeledMetricsUsed = ['efr', 'tr'];

// const parseTimeSeries = (timeSeries = {}) => ({
//   year: Number(timeSeries.year),
// });

/**
 * Returns the national average data.
 */
export default function useNationalAverageData() {
  // load the value set in state
  const natAvgData = useDashboardStore((state) => state.natAvgData);
  // console.log({ natAvgData });
  const setState = useDashboardStore((state) => state.set);
  const avgUrlRaw = useAppConfig('national_data_raw');
  const avgUrlModeled = useAppConfig('national_data_modeled');
  const abbrevMap = useAppConfig('metric_abbrev_map');
  const setNatAvgData = (natAvgData) => setState({ natAvgData });

  useEffect(() => {
    // just run once
    if (natAvgData) return;
    fetch(avgUrlRaw).then((rawResponse) => {
      rawResponse.text().then((rawData) => {
        const rawParsed = csvParse(rawData);
        fetch(avgUrlModeled).then((modeledResponse) => {
          modeledResponse.text().then((modeledData) => {
            const modeledParsed = csvParse(modeledData);
            // aggregate modeled and raw data
            const data = [];

            rawParsed.forEach((rawRow) => {
              const yearInt = Number(rawRow.year);
              const dataPoint = { year: yearInt };

              const modeledRow = modeledParsed.find((d) => Number(d.year) === yearInt);

              rawMetricsUsed.forEach((m) => (dataPoint[m] = Number(rawRow[abbrevMap[m]]) || null));
              modeledMetricsUsed.forEach(
                (m) => (dataPoint[m] = Number(modeledRow[abbrevMap[m]]) || null),
              );
              data.push(dataPoint);
            });

            console.log({ data });
            setNatAvgData(data);
          });
        });
      });
    });
  }, []);
  return natAvgData || [];
}
