import { useCallback } from "react";
import {
  useOnConfigLoad,
  useLocationStore,
} from "@hyperobjekt/react-dashboard";
import { getTileData } from "../Data";
import useDataMode from "../hooks/useDataMode";

/**
 * This hook provides a callback function that is used to set the application
 * defaults and fetch any related data.  Most of the work is handled by
 * @hyperobjet/react-dashboard's useOnConfigLoad callback.
 *
 * This hook additionally:
 * 1. takes the location string, pulls out the GEOID, longitude, and latitude
 * 2. fetches the GeoJSON features for the locations from the tileset
 * 3. sets the selected features in the location store
 * 
 * TODO: figure out why this reversion to 67fb7f90f73034495ce098e9689b61c00e34c701
 * is undesireable/triggers app rerenders (as described below)
 * @returns {function} ({config, defaultValues}) => Promise
 */
function useOnRouteLoad() {
  const onLoad = useOnConfigLoad();
  const [dataMode] = useDataMode();
  const setLocationState = useLocationStore((state) => state.set);
  return useCallback(
    ({ config, defaultValues }) => {
      console.log({ defaultValues });
      return onLoad({ config, defaultValues }).then(
        ({ config, defaultValues }) => {
          const { locations } = defaultValues;
          console.log({ locations });
          if (!locations) return Promise.resolve({ config, defaultValues });
          // use the string values to fetch the tile data
          const locationPromises = locations.split("~").map((l) => {
            const [geoid, lng, lat] = l.split("_");
            return getTileData({ geoid, lngLat: { lng, lat }, dataMode });
          });
          // once all the feature have been retrieved, add them to the location store
          return Promise.all(locationPromises).then((features) => {
            if (Array.isArray(features))
              setLocationState({ selected: features });
            return { config, defaultValues, features };
          });
        }
      );
    },
    [onLoad]
  );
}

/**
 * This hook provides a callback function that is used to set the application
 * defaults and fetch any related data.  Most of the work is handled by
 * @hyperobjet/react-dashboard's useOnConfigLoad callback.
 *
 * This hook additionally:
 * 1. takes the location string, pulls out the GEOID, longitude, and latitude
 * 2. fetches the GeoJSON features for the locations from the tileset
 * 3. sets the selected features in the location store
 *
 * TODO: Load locations without triggering root level re-render
 *   The current loading code has been commented out because
 *   changes to selected locations would trigger an app re-render.
 *   Instead, the locations from the route should be placed in a loading
 *   queue, and loaded based on that in such away that state updates
 *   do not trigger a re-render.
 *
 * @returns {function} ({config, defaultValues}) => Promise
 */
// function useOnRouteLoad() {
//   const onLoad = useOnConfigLoad();
//   // const [dataMode] = useDataMode();
//   // const setLocationState = useLocationStore((state) => state.set);
//   // const selectedLocations = useLocationStore((state) => state.selected?.length);
//   return useCallback(
//     ({ config, defaultValues }) => {
//       return onLoad({ config, defaultValues });
//       // .then(
//       //   ({ config, defaultValues }) => {
//       //     const { locations } = defaultValues;
//       //     const locationStrings = locations?.split("~");
//       //     // resolve if no locations, or if locations have already been added
//       //     if (!locationStrings || locationStrings.length === selectedLocations)
//       //       return Promise.resolve({ config, defaultValues });
//       //     // use the string values to fetch the tile data
//       //     const locationPromises = locationStrings.map((l) => {
//       //       const [geoid, lng, lat] = l.split("_");
//       //       return getTileData({ geoid, lngLat: { lng, lat }, dataMode });
//       //     });
//       //     // once all the feature have been retrieved, add them to the location store
//       //     return Promise.all(locationPromises).then((features) => {
//       //       if (Array.isArray(features))
//       //         setLocationState({ selected: features });
//       //       return { config, defaultValues, features };
//       //     });
//       //   }
//       // );
//     },
//     [onLoad]
//   );
// }

export default useOnRouteLoad;
