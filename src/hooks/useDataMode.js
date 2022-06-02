import { useEffect } from "react";
import {
  useDashboardStore,
  getCurrentUrlQueryParams,
} from "@hyperobjekt/react-dashboard";

/**
 * A hook the returns the current data mode and a setter function.
 * @returns {[string, function]} the current mode and a function to change the mode
 */
export default function useDataMode() {
  // load the query param value
  const urlParams = getCurrentUrlQueryParams();
  const defaultDataMode = urlParams.m || "modeled";
  // load the value set in state
  const dataMode = useDashboardStore((state) => state.dataMode);
  const setState = useDashboardStore((state) => state.set);
  const setDataMode = (dataMode) => setState({ dataMode });
  // set the default data mode if it is not set
  useEffect(() => {
    if (!dataMode && defaultDataMode) setDataMode(defaultDataMode);
  }, []);
  // return data mode (with default fallback) and setter
  return [dataMode || defaultDataMode, setDataMode];
}
