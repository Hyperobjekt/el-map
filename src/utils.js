import { getConfigSetting } from "./Config/utils";

import {
  PRIMARY_COLOR,
  QUATERNARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
} from "./theme";

export const COLORS = [
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  QUATERNARY_COLOR,
];
import _ from "lodash";

const DEFAULT_COLOR = "#ccc";

/**
 * Returns a color when given a positive index of colors array.
 * If index is out of bounds, return DEFAULT_COLOR (pass Infinity to guarantee).
 * Passing in a negative index selects from the end of colors array (-1 selects last color).
 * @function
 * @param {number} index
 * @returns {string}
 */
export const getColorForIndex = (index, colors = COLORS) => {
  if (index > colors.length - 1) return DEFAULT_COLOR;
  // allow selection from end
  if (index < 0) index = colors.length + (index % (colors.length + 1));
  // console.log(index);
  return colors[index] || DEFAULT_COLOR;
};

export const isNumber = (x) => typeof x === "number" && !isNaN(x);

/**
 * @function
 * @param {array} data from useNationalAverageData
 * @param {string} metric_id that we want line data for
 * @returns {array}
 */
export const getNatAvgLine = ({ data, metric_id }) => {
  return data
    .map(({ year: x, [metric_id]: y }) => ({ x, y }))
    .filter(({ y }) => isNumber(y));
};

/**
 * @function
 * @param {array} data from useNationalAverageData
 * @param {string} metric_id that we want data value for
 * @param {string} year that we want data value for
 * @returns {number}
 */
export const getNatAvgValue = ({ data, metric_id, year }) => {
  const row = data.find((d) => Number(year) === Number(d.year));
  return row ? row[metric_id] : null;
};

const get2dYear = (year) => String(year).slice(-2);
/**
 * @function
 * @param {array} flagData from useFlagData
 * @param {string} metricId that we want data value for
 * @param {string} year that we want data value for
 * @returns {number}
 */
const getCountyFlagValue = ({
  countyData = {},
  flagId,
  geoid,
  year,
  useLang,
}) => {
  // const flagConfigs = getConfigSetting("flagConfigs");
  const countyFips = geoid.slice(0, 5);
  // drops leading 0
  const cf = Number(countyFips);
  const y = get2dYear(year);
  const key = `${cf}-${y}-${flagId}`;
  // console.log({ key });
  // console.log({ countyData: Object.keys(countyData).slice(0, 200) });
  return countyData[key];
};

/**
 * @function
 * @param {array} flagData from useFlagData
 * @param {string} metricId that we want data value for
 * @param {string} year that we want data value for
 * @returns {number}
 */
export const getCutoffFlagValue = ({
  cutoffData = {},
  metricId,
  year,
  region,
  value,
}) => {
  const cutoff = _.get(cutoffData, [
    region,
    `${metricId}
  ${get2dYear(year)}`,
  ]);

  return cutoff && value > cutoff;
};

const getGeoFlagValue = ({ geoid, geoStart, geoEqual }) => {
  if (geoEqual && geoEqual.includes(geoid)) return true;
  if (geoStart && geoStart.some((geo) => geoid.startsWith(geo))) return true;

  return false;
};

/**
 *
 * @function
 * @param {array} flagData from useFlagData
 * @param {string} metricId that we want data value for
 * @param {string} year that we want data value for
 * @returns {number}
 */
export const getFlags = ({
  flagData,
  dataMode,
  region,
  metricId,
  geoid,
  year,
  value,
  lang,
  useLang,
}) => {
  const flagConfigs = getConfigSetting("flagConfigs");
  const relevantConfigs = flagConfigs.filter((config) => {
    const { relevantDataModes, relevantMetrics, relevantGeos, relevantYears } =
      config;

    return (
      (!relevantDataModes || relevantDataModes.includes(dataMode)) &&
      (!relevantMetrics || relevantMetrics.includes(metricId)) &&
      (!relevantGeos || relevantGeos.includes(region)) &&
      (!relevantYears || relevantYears.includes(year))
    );
  });

  const flags = [];
  relevantConfigs
    .sort(({ hierarchy: h1 = 0 }, { hierarchy: h2 = 0 }) => h1 < h2)
    .forEach(
      ({ type, name, id: flagId, geoStart, geoEqual, hierarchy = 0 }) => {
        // console.log({ name, hierarchy });
        // negative hierarchy flags only show if no others do
        if (hierarchy < 0 && flags.length) return;
        let val = null;
        let flagStr = "";
        switch (type) {
          case "client":
            val = getCountyFlagValue({
              countyData: flagData.client,
              flagId,
              geoid,
              year,
              useLang,
            });
            if (val) {
              flagStr = `FLAG_${name}_${val}`;
              // console.log({ flagStr });
            }
            break;

          case "geographic":
            val = getGeoFlagValue({ geoid, geoStart, geoEqual });
            if (val) {
              flagStr = `FLAG_${name}`;
              // console.log({ flagStr });
            }
            // console.log({ geoid, geoStart, geoEqual });
            break;

          case "cutoff":
            if (
              getCutoffFlagValue({
                cutoffData: flagData.cutoff,
                region,
                metricId,
                year,
                value,
              })
            ) {
              val = true;
              flagStr = `FLAG_${name}`;
              // console.log({ flagStr });
            }

            break;

          default:
            console.warn(`Invalid flag type "${type}", ignoring.`);
            break;
        }

        const str = getConfigSetting(flagStr.toUpperCase(), {
          basePath: ["lang", lang],
        });
        str && flags.push(str);
      }
    );

  // console.log({ flags });
  return flags.filter((v) => !!v);
};
