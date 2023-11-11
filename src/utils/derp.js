export const HAPPY_DERPS = [];
const DERP_VARIANTS = ["hallelujah", "normal", "big"];
export const DERP_DICTIONARY = [".__.", "•__•", "(๑•̀ㅂ•́)و", ";—;", "/.__./"];

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

const selectRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Generates a derp arbitrarily based
 * on a set input. Creates derp variants.
 */
export const generateDerp = (vibes) => {
  // 1) Random derp selection
  let randomElement = selectRandomElement(DERP_DICTIONARY);

  // 2) Knowing when to use certain derps is important
  const randomVariant = selectRandomElement(DERP_VARIANTS);
  const randomSize = getRandomInt(1, 8);
  const randomNum = getRandomInt(1, 3);
  randomElement = createNLengthDerp(randomVariant, randomSize, randomNum);

  return randomElement;
};
