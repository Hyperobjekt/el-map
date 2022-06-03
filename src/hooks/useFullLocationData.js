import { useLocationData } from '@hyperobjekt/react-dashboard';
import useMaxLocations from './useMaxLocations';

/**
 * Gets the selected locations (limited by max locations)
 * and all data associated with them. (e.g. values for all years)
 * @returns {object[]}
 */
function useFullLocationData() {
  const maxLocations = useMaxLocations();
  return useLocationData(maxLocations);
}

export default useFullLocationData;
