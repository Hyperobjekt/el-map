import { getConfigSetting } from './Config/utils';
import { PRIMARY_COLOR, QUATERNARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from './theme';
import _ from 'lodash';
import { getLayerFromGEOID } from './Data';

export const ENVIRONMENT = {
  MB_TOKEN:
    'pk.eyJ1IjoiaHlwZXJvYmpla3QiLCJhIjoiY2pzZ3Bnd3piMGV6YTQzbjVqa3Z3dHQxZyJ9.rHobqsY_BjkNbqNQS4DNYw',
  context: 'dev',
};

// on live site, asset path has base path that must be prepended (see vite.config)
export const getAssetPath = (path) => import.meta.env.BASE_URL + path;

/**
 * @function
 * @param {number} x
 * @returns {boolean}
 */
export const isNumber = (x) => typeof x === 'number' && !isNaN(x);

export const trackEvent = (id, data = {}) => {
  if (!import.meta.env.PROD) {
    // console.log(`_TRACKING_: ${id}`, data);
    return;
  }

  if (!window.dataLayer) {
    throw Error('dataLayer does not exist');
  }

  const event = {
    event: id,
    siteVersion: window.VITE_APP_VERSION || '2',
    ...data,
  };

  window.dataLayer.push(event);
};

/**
 * Turns fractional opacity val -> 2 digit hex string that can be appended to a hex color code
 * @function
 * @param {number} opacity value from 0 - 1
 * @returns {string}
 */
export const getOpacityInHex = (opacity) => {
  // max value that can be represented by 2 hex digits (ff)
  const norm = 16 ** 2 - 1;
  const str = Math.round(opacity * norm).toString(16);
  return str.padStart(2, '0');
};

const DEFAULT_COLOR = '#ccc';
const COLORS = [PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR];

/**
 * Returns a color when given a positive index of colors array.
 * If index is out of bounds, return DEFAULT_COLOR (use index=Infinity to select intentionally).
 * Passing in a negative index selects from the end of colors array (-1 selects last color).
 * @function
 * @param {number} index
 * @returns {string}
 */
export const getColorForIndex = (index) => {
  if (index > COLORS.length - 1) return DEFAULT_COLOR;
  // allow selection from end
  if (index < 0) index = COLORS.length + (index % (COLORS.length + 1));
  return COLORS[index] || DEFAULT_COLOR;
};

/**
 * @function
 * @param {array} data from useNationalAverageData
 * @param {string} metric_id
 * @returns {array}
 */
export const getNatAvgLine = ({ data, metric_id }) => {
  return data.map(({ year: x, [metric_id]: y }) => ({ x, y })).filter(({ y }) => isNumber(y));
};

/**
 * @function
 * @param {array} data from useNationalAverageData
 * @param {string} metric_id
 * @param {string} year
 * @returns {number}
 */
export const getNatAvgValue = ({ data, metric_id, year }) => {
  const row = data.find((d) => Number(year) === Number(d.year));

  return row ? row[metric_id] : null;
};

// get last 2 digits of year
const get2dYear = (year) => String(year).slice(-2);

/**
 * @function
 * @param {array} flagData from useFlagData
 * @param {string} flagId
 * @param {string} geoid
 * @param {string} year
 * @returns flag value
 */
const getClientFlagValue = ({ flagData = {}, flagId, geoid, year }) => {
  // drops leading 0, truncates to first 5 digits (to get county from tract/bg)
  // (will keep the 1-2 digit code for states)
  const fips = Number(geoid.slice(0, 5));
  const y = get2dYear(year);
  const key = `${fips}-${y}-${flagId}`;

  return flagData[key];
};

/**
 * @function
 * Determines whether a value is an "outlier" (outside a specified cutoff) and should be flagged as such.
 * @param {object} cutoffData from useFlagData
 * @param {string} metricId
 * @param {string} geoid
 * @param {string} year
 * @returns {number}
 */
export const getCutoffFlagValue = ({ cutoffData = {}, metricId, year, region, value }) => {
  const cutoff = _.get(cutoffData, [region, `${metricId}-${get2dYear(year)}`]);

  if (cutoff && value > cutoff) return 1;

  // NOTE: all data from 2017 and 2018 is currently flagged with FLAG_OUTLIERS_17_18
  if (['2017', '2018'].includes(String(year))) return '17_18';

  return false;
};

/**
 * @function
 * Determines whether a value subject to a location-based flag (eg MD, NOLA)
 * @param {string} geoid
 * @param {array} geoStart optional strings which identify a relevant geoid (if it starts with them)
 * @param {array} geoEqual optional strings which identify a relevant geoid (if it equals them)
 * @returns {boolean} whether geo is flagged
 */
const getGeoFlagValue = ({ geoid, geoStart, geoEqual }) => {
  if (geoEqual && geoEqual.includes(geoid)) return true;
  if (geoStart && geoStart.some((geo) => geoid.startsWith(geo))) return true;

  return false;
};

/**
 * Determines what flags must be displayed for a given value
 * @function
 * @param {object} flagData from useFlagData
 * @param {string} dataMode
 * @param {string} metricId
 * @param {string} geoid
 * @param {string} year
 * @param {*} value
 * @param {string} activeLanguage
 * @returns {array} of flag strings
 */
export const getFlags = ({ flagData, dataMode, metricId, geoid, year, value, activeLanguage }) => {
  const flags = [];
  if (!geoid) return flags;
  const region = getLayerFromGEOID(geoid);

  const flagConfigs = getConfigSetting('flagConfigs');
  const relevantConfigs = flagConfigs.filter((config) => {
    const { relevantDataModes, relevantMetrics, relevantGeos, relevantYears } = config;

    return (
      (!relevantDataModes || relevantDataModes.includes(dataMode)) &&
      (!relevantMetrics || relevantMetrics.includes(metricId)) &&
      (!relevantGeos || relevantGeos.includes(region)) &&
      (!relevantYears || relevantYears.includes(year))
    );
  });

  relevantConfigs
    .sort(({ hierarchy: h1 = 0 }, { hierarchy: h2 = 0 }) => h1 < h2)
    .forEach(({ type, name, id: flagId, geoStart, geoEqual, hierarchy = 0 }) => {
      // negative hierarchy flags only show if no others do
      if (hierarchy < 0 && flags.length) return;
      let val = null;
      let flagStr = '';
      switch (type) {
        case 'client':
          val = getClientFlagValue({
            flagData: flagData.client,
            flagId,
            geoid,
            year,
          });
          if (val) {
            flagStr = `FLAG_${name}_${val}`;
          }
          break;

        case 'client_suppression':
          // client_suppression is used to suppress values, not add flags
          break;

        case 'geographic':
          val = getGeoFlagValue({ geoid, geoStart, geoEqual });
          if (val) {
            flagStr = `FLAG_${name}`;
          }

          break;

        case 'cutoff':
          val = getCutoffFlagValue({
            cutoffData: flagData.cutoff,
            region,
            metricId,
            year,
            value,
          });
          if (val) {
            flagStr = `FLAG_${name}_${val}`;
          }

          break;

        default:
          console.warn(`Invalid flag type "${type}", ignoring.`);
          break;
      }

      const str =
        !!flagStr &&
        getConfigSetting(flagStr.toUpperCase(), {
          basePath: ['lang', activeLanguage],
        });

      str && flags.push(str);
    });

  return flags.filter((v) => !!v);
};

/**
 * Determines whether data is suppressed (as per client_suppression flag data)
 * @function
 * @param {array} flagData from useFlagData
 * @param {string} dataMode
 * @param {string} metricId
 * @param {string} geoid
 * @param {string} year
 * @returns {boolean}
 */
export const getIsSuppressed = ({ flagData, dataMode, metricId, geoid, year }) => {
  if (!geoid) return false;
  const region = getLayerFromGEOID(geoid);

  const flagConfigs = getConfigSetting('flagConfigs');
  const relevantSuppressionConfigs = flagConfigs.filter((config) => {
    const { relevantDataModes, relevantMetrics, relevantGeos, relevantYears, type } = config;

    return (
      type === 'client_suppression' &&
      (!relevantDataModes || relevantDataModes.includes(dataMode)) &&
      (!relevantMetrics || relevantMetrics.includes(metricId)) &&
      (!relevantGeos || relevantGeos.includes(region)) &&
      (!relevantYears || relevantYears.includes(year))
    );
  });

  return relevantSuppressionConfigs.some(
    ({ id: flagId }) =>
      !!getClientFlagValue({
        flagData: flagData.client,
        flagId,
        geoid,
        year,
      }),
  );
};
