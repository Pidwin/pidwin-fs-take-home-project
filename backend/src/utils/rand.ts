/**
 * Chooses true or false randomly, with equal odds.
 * @returns True or false, with equal odds.
 */
export const getRandomBoolean = (): boolean => {
  return Math.random() < 0.5;
};

export default getRandomBoolean;
