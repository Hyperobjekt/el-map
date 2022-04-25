import { useEffect } from "react";
import { useDashboardStore } from "@hyperobjekt/react-dashboard";

/**
 * A hook the returns the current data mode and a setter function.
 * @returns {[string, function]} the current mode and a function to change the mode
 */
export default function useDataMode(defaultMode) {
  const setState = useDashboardStore((state) => state.set);
  const dataMode = useDashboardStore((state) => state.dataMode);
  const setDataMode = (dataMode) => setState({ dataMode });
  // set the default data mode if it is not set
  useEffect(() => {
    if (!dataMode && defaultMode) setDataMode(defaultMode);
  }, []);
  return [dataMode, setDataMode];
}
