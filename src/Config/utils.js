import * as BASE_CONFIG from "./base.json";
import * as MODELED_CONFIG from "./modeled.json";
import * as RAW_CONFIG from "./raw.json";
import _ from "lodash";

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

/**
 * Fetches the configuration setting for the provided mode.
 * Note: ideally we should be able to use useLang etc, but
 * because they're implemented as hooks we can't always.
 * @param {string} setting
 * @param {string} mode "raw" or "modeled"
 * @returns a configuration object for @hyperobjekt/react-dashboard
 */
export const getConfigSetting = (setting, options = {}) => {
  let { mode = "modeled", basePath = ["app"] } = options;
  if (_.isString(basePath)) {
    basePath = basePath.split(".");
  }
  const config = getConfig(mode);
  // console.log({ config });
  // remove
  return _.get(config, _.compact([...basePath, setting]));
};
