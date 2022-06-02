import { useCallback } from "react";
import {
  mapStateToQueryParams,
  useDashboardStore,
} from "@hyperobjekt/react-dashboard";
import useDataMode from "../hooks/useDataMode";

/**
 * Returns the center point of the bounding box in the data, separated by an underscore
 * @param {object} data should contain east, west, north, and south properties
 * @returns {string}
 */
const getCoordString = (data = {}) => {
  if (!data.east || !data.west || !data.north || !data.south) return "";
  return [
    ((data.west + data.east) / 2).toFixed(2),
    ((data.south + data.north) / 2).toFixed(2),
  ].join("_");
};

/**
 * Maps an array of GeoJSON features to a string of GEOIDs for the route.
 * @function
 * @param {GeoJSONFeature} features
 * @returns {string}
 */
const mapFeaturesToString = (features) => {
  if (!Array.isArray(features) || features.length === 0) return undefined;
  return features
    .filter((f) => Boolean(f.properties?.GEOID))
    .map((f) => {
      const coordString = getCoordString(f.properties);
      return coordString
        ? `${f.properties.GEOID}_${coordString}`
        : f.properties.GEOID;
    })
    .join("~");
};

/**
 * Returns a callback function that receives params, varMap, and dashboard state.
 * The callback function returns a new object for URL query params.
 * @returns {function} ({params, varMap, state}) => object)
 */
function useUpdateParams() {
  const [dataMode] = useDataMode();
  const embed = useDashboardStore((state) => state.embed);
  return useCallback(
    ({ params, varMap, state }) => {
      const urlParams = mapStateToQueryParams({
        state,
        varMap,
        mapFeaturesToString,
      });
      // console.log({ varMap, urlParams });
      if (embed) urlParams.embed = "true";
      return { m: dataMode, ...urlParams };
    },
    [dataMode]
  );
}

export default useUpdateParams;
