import { useEffect } from "react";
import { useDashboardStore } from "@hyperobjekt/react-dashboard";

/**
 * A hook the returns the current auto switch state and a setter function.
 * @returns {[string, function]} the current mode and a function to change the auto switch functionality
 */
export default function useAutoSwitch() {
  // load the value set in state
  const autoSwitch = useDashboardStore((state) => state.autoSwitch);
  const setState = useDashboardStore((state) => state.set);
  const setAutoSwitch = (autoSwitch) => setState({ autoSwitch });
  // set the default if it is not set
  useEffect(() => {
    if (!autoSwitch) setAutoSwitch(true);
  }, []);
  // return auto switch and setter
  return [autoSwitch, setAutoSwitch];
}
