import { useLocationFeature } from '@hyperobjekt/react-dashboard';
import useMaxLocations from './useMaxLocations';

/**
 * Gets the selected locations (limited by max locations)
 * and all data associated with them. (e.g. values for all years)
 * @returns {object[]}
 */
function useLocationFeatures() {
  const maxLocations = useMaxLocations();
  return useLocationFeature(maxLocations);
}

export default useLocationFeatures;
