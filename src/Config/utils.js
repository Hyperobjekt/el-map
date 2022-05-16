import * as BASE_CONFIG from "./base.json";
import * as MODELED_CONFIG from "./modeled.json";
import * as RAW_CONFIG from "./raw.json";

/**
 * Fetches the configuration for the provided mode.
 * @param {string} mode "raw" or "modeled"
 * @returns a configuration object for @hyperobjekt/react-dashboard
 */
export const getConfig = (mode = "modeled") => {
  switch (mode) {
    case "raw":
      return { ...BASE_CONFIG.default, ...RAW_CONFIG.default };
    default:
      return { ...BASE_CONFIG.default, ...MODELED_CONFIG.default };
  }
};
