import { useLocationData } from '@hyperobjekt/react-dashboard';

/**
 * Returns the maximum number of locations in the app config.
 * @returns {number}
 */
export default function useHasSelectedLocations() {
  const selectedLocations = useLocationData();
  return selectedLocations?.length > 0;
}
