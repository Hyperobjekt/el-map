import { csvParse } from 'd3-dsv';
import { useDashboardStore, useAppConfig } from '@hyperobjekt/react-dashboard';
import { useEffect } from 'react';

// which data source to use for each metric
// TODO: formalize in base.json?
const rawMetricsUsed = ['er'];
const modeledMetricsUsed = ['efr', 'tr'];

/**
 * Returns the national average data.
 */
export default function useNationalAverageData() {
  // load the value set in state
  const natAvgData = useDashboardStore((state) => state.natAvgData);

  const setState = useDashboardStore((state) => state.set);
  const setNatAvgData = (natAvgData) => setState({ natAvgData });
  const avgUrlRaw = useAppConfig('national_data_raw');
  const avgUrlModeled = useAppConfig('national_data_modeled');
  const abbrevMap = useAppConfig('metric_abbrev_map');

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

            setNatAvgData(data);
          });
        });
      });
    });
  }, []);

  return natAvgData || [];
}
