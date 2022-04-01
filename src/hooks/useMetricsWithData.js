import {
  useCurrentContext,
  useMetricConfig,
  useAccessor,
} from "@hyperobjekt/react-dashboard";

/**
 * Mapping function for populating a metric with data
 * @param {function} accessor a function that returns a varName based on the provided context
 * @param {object} context { metric_id, region_id, year }
 * @param {object} data
 * @returns {object}
 */
const addMetricValue = (accessor, context, data) => (m) => {
  const key = accessor({ ...context, metric_id: m.id });
  const value = data?.[key];
  const formattedValue = m.formatter ? m.formatter(value) : value;
  return {
    ...m,
    value,
    formattedValue,
  };
};

/**
 * Gets the metrics and adds `value` and `formattedValue` properties to them.
 * @param {object} data an object containing the data for a location
 * @param {string[]} selectedMetrics (optional) if provided, only metric IDs contained in the array will be returned
 */
function useMetricsWithData(data, selectedMetrics) {
  const accessor = useAccessor();
  const context = useCurrentContext();
  const metrics = useMetricConfig();
  const resultMetrics = selectedMetrics
    ? selectedMetrics.map((id) => metrics.find((m) => m.id === id))
    : metrics;
  if (!data) return metrics;
  return resultMetrics.map(addMetricValue(accessor, context, data));
}

export default useMetricsWithData;
