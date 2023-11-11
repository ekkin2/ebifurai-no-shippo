/**
 * derp.js
 *
 * Util file containing functions that can
 * generate different styles of derps.
 *
 */

/** Constants */
export const HAPPY_DERPS = [];
const DERP_VARIANTS = ["hallelujah", "normal", "big"];
export const DERP_DICTIONARY = [".__.", "•__•", "(๑•̀ㅂ•́)و", ";—;", "/.__./"];

/**
 * Creates a variable size and num derp.
 *
 * Note: Only hallelujah derp vaies by the "num" since
 * the other variants look wierd.
 * @param {string} variant type of derp
 * @param {int} size how large (wide) the derp is
 * @param {int} num the number of derps to return
 */
const createNLengthDerp = (variant, size, num) => {
  let res = "";
  if (variant === "hallelujah") {
    res = `/.${"_".repeat(size)}./`.repeat(num);
  } else if (variant === "normal") {
    res = `.${"_".repeat(size)}.`;
  } else if (variant === "big") {
    res = `•${"_".repeat(size)}•`;
  }

  return res;
};

/**
 * Selects a random element from an array
 * @param {Array} arr Array of elements
 * @returns {string} An element from the array
 */
const selectRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Gets a random integer from min and max
 * inclusive.
 * @param {int} min The minimum integer value
 * @param {int} max The maximum integer value
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Generates a derp arbitrarily based
 * on a set input. Creates derp variants.
 * @returns {string} Random derp variant
 */
export const generateDerp = () => {
  // 1) Random derp selection
  let randomElement = selectRandomElement(DERP_DICTIONARY);

  // 2) Knowing when to use certain derps is important
  const randomVariant = selectRandomElement(DERP_VARIANTS);
  const randomSize = getRandomInt(1, 8);
  const randomNum = getRandomInt(1, 3);
  randomElement = createNLengthDerp(randomVariant, randomSize, randomNum);

  return randomElement;
};
