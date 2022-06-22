import { format } from 'd3-format';
import _ from 'lodash';

export const getFormattedValues = (metric) => {
  const { min, max, value } = metric;
  // TODO: update react dashboard to allow selection of a single decimal percent formatter
  // (even for values < 1), use that instead
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
