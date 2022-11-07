/**
 * @returns [min, max]
 * @example
 * ```
 * getRandomInt(0, array.length - 1);
 * ```
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export { getRandomInt };
