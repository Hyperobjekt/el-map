import { useAppConfig } from "@hyperobjekt/react-dashboard";
import { csv } from "d3-fetch";
import { csvParse } from "d3-dsv";
import { useMemo } from "react";

const parseTimeSeries = (timeSeries = {}) => ({
  x: timeSeries.year,
});

/**
 * Returns the national average data.
 */
export default function useNationalAverageData(avgUrl, metricKey) {
  // const avgUrl = "efr";
  const avgData = [];
  // const avgData = useMemo(() => await csv(avgUrl), []);
  console.log(avgUrl);
  // const avgData = await csv(avgUrl);
  return fetch(avgUrl).then((response) => {
    response.text().then((data) => {
      const p = csvParse(data);
      console.log("@@@", p, data);

      return data;
    });
  });
  // const avgData = csv(avgUrl, (d) => d).then((data) => {
  //   console.log(data);
  // });

  console.log("AA", avgUrl);
  console.log("AA", avgData);
  // const metricKey = { efr: "bols" };
  console.log(metricKey);
  return avgData.map(
    (d) =>
      console.log("D", d) || {
        x: d.year,
        y: d[metricKey],
      }
  );
}
