import {
  PRIMARY_COLOR,
  QUATERNARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
} from "./theme";

/**
 * Returns a color when given an index from 0-3.
 * @function
 * @param {number} index
 * @returns {string}
 */
export const getColorForIndex = (index) => {
  const colors = [
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    TERTIARY_COLOR,
    QUATERNARY_COLOR,
  ];
  return colors[index] || "#ccc";
};
