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

/**
 * Returns a color when given an index from 0-3.
 * @function
 * @param {number} index
 * @returns {string}
 */
export const getColorForIndex = (index, colors = COLORS) => {
  if (index > colors.length - 1) return "#ccc";
  // allow selection from end
  if (index < 0) index = colors.length + (index % (colors.length + 1));
  // console.log(index);
  return colors[index] || "#ccc";
};
