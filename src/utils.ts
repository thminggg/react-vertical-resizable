/**
 * Return a value within a range
 * @param value
 * @param min
 * @param max
 * @returns {number}
 */
export const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value));
};
