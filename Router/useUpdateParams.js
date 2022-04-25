import { useCallback } from "react";
import { mapStateToQueryParams } from "@hyperobjekt/react-dashboard";
import useDataMode from "../src/hooks/useDataMode";

/**
 * Returns a callback function that receives params, varMap, and dashboard state.
 * The callback function returns a new object for URL query params.
 * @returns {function} ({params, varMap, state}) => object)
 */
function useUpdateParams() {
  const [dataMode] = useDataMode();
  return useCallback(
    ({ params, varMap, state }) => {
      const urlParams = mapStateToQueryParams({ state, varMap });
      urlParams["m"] = dataMode;
      return urlParams;
    },
    [dataMode]
  );
}

export default useUpdateParams;
