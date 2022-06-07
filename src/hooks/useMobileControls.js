import { useDashboardStore } from '@hyperobjekt/react-dashboard';

/**
 * A hook the returns if the mobile controls are shown and a setter function.
 * @returns {[boolean, function]} mobile control visibility and a function to change the mode
 */
export default function useMobileControls() {
  const setState = useDashboardStore((state) => state.set);
  const mobileControls = useDashboardStore((state) => state.mobileControls);
  const setMobileControls = (mobileControls) => setState({ mobileControls });
  return [mobileControls, setMobileControls];
}
