import {
  PRIMARY_COLOR,
  QUATERNARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
} from "./theme";

export const COLORS = [
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  QUATERNARY_COLOR,
];

const DEFAULT_COLOR = "#ccc";

/**
 * Returns a color when given a positive index of colors array.
 * If index is out of bounds, return DEFAULT_COLOR (pass Infinity to guarantee).
 * Passing in a negative index selects from the end of colors array (-1 selects last color).
 * @function
 * @param {number} index
 * @returns {string}
 */
export const getColorForIndex = (index, colors = COLORS) => {
  if (index > colors.length - 1) return DEFAULT_COLOR;
  // allow selection from end
  if (index < 0) index = colors.length + (index % (colors.length + 1));
  // console.log(index);
  return colors[index] || DEFAULT_COLOR;
};

export const isNumber = (x) => typeof x === "number" && !isNaN(x);