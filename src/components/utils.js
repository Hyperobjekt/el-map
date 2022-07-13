import { format } from 'd3-format';
import _ from 'lodash';

/**
 * Formats the value and extremes for a given metric.
 * NOTE: this function might be trivial if react dashboard were updated
 * in a way such that we could select a formatter that always formatted
 * percentages with 1 decimal
 * @param {object} metric
 * @returns {object} with formatted values
 */
export const getFormattedValues = (metric) => {
  const { min, max, value } = metric;
  // TODO: update react dashboard to allow selection of a single decimal percent formatter
  // (even for values < 1)
  const f = metric.format === 'percent_value' ? (x) => format('.1~f')(x) + '%' : metric.formatter;

  if (!f) {
    console.warn(`Can't format values for ${metric}`);
    return {};
  }
  const [fMin, fMax, fVal] = [min, max, value].map((v) => (_.isNumber(v) ? f(v) : ''));
  const uniqueExtremeExists = fMin !== fVal || fMax !== fVal;
  const meaningfulCI = !!min && !!max && uniqueExtremeExists;
  return {
    fMin,
    fMax,
    fVal,
    meaningfulCI,
  };
};
