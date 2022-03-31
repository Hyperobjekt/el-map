import { useAppConfig } from "@hyperobjekt/react-dashboard";

/**
 * Returns the maximum number of locations in the app config.
 * @returns {number}
 */
export default function useMaxLocations() {
  return useAppConfig("max_locations");
}
