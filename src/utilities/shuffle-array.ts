import { getRandomInt } from './get-random-int.js';

function shuffleArray<T>(array: T[], inPlace = true): T[] {
  const result = inPlace ? array : [...array];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const currentElement = result[index];
    const randomIndex = getRandomInt(0, index);
    const randomElement = result[randomIndex];

    result[randomIndex] = currentElement;
    result[index] = randomElement;
  }

  return result;
}

export { shuffleArray };
