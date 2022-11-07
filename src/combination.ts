import { shuffleArray } from './utilities/shuffle-array.js';
import { isOdd } from './utilities/is-odd.js';
import { isEven } from './utilities/is-even.js';

class Сombination {
  static generateSolvable(size: number): number[][] {
    const numbers: number[] = [];

    for (let number = 0; number < size * size; number += 1) {
      numbers.push(number);
    }

    const shuffledNumbers = shuffleArray(numbers);
    const combination: number[][] = [];

    for (let y = 0; y < size; y += 1) {
      combination[y] = [];

      for (let x = 0; x < size; x += 1) {
        combination[y][x] = shuffledNumbers[size * y + x];
      }
    }

    return Сombination.isSolvable(combination)
      ? combination
      : Сombination.generateSolvable(size);
  }

  /**
   * @example
   * ```
   * Сombination.generateWinning(3);
   * // -> [
   * //   [1, 2, 3],
   * //   [4, 5, 6],
   * //   [7, 8, 0],
   * // ]
   *
   * Сombination.generateWinning(4);
   * // -> [
   * //   [1, 2, 3, 4],
   * //   [5, 6, 7, 8],
   * //   [9, 10, 11, 12],
   * //   [13, 14, 15, 0],
   * // ]
   * ```
   */
  static generateWinning(size: number): number[][] {
    const combination: number[][] = [];

    for (let y = 0; y < size; y += 1) {
      combination[y] = [];

      for (let x = 0; x < size; x += 1) {
        combination[y][x] = size * y + x + 1;
      }
    }

    const lastY = combination.length - 1;
    const lastX = combination[lastY].length - 1;
    combination[lastY][lastX] = 0;

    return combination;
  }

  /**
   * @example
   * ```
   * Сombination.isSolvable([
   *   [1, 2, 3],
   *   [4, 5, 6],
   *   [7, 8, 0],
   * ]);
   * // -> true
   *
   * Сombination.isSolvable([
   *   [1, 2, 3],
   *   [4, 5, 6],
   *   [8, 7, 0],
   * ]);
   * // -> false
   *
   * Сombination.isSolvable([
   *   [1, 2, 3, 4],
   *   [5, 6, 7, 8],
   *   [9, 10, 11, 12],
   *   [13, 14, 15, 0],
   * ]);
   * // -> true
   *
   * Сombination.isSolvable([
   *   [1, 2, 3, 4],
   *   [5, 6, 7, 8],
   *   [9, 10, 11, 12],
   *   [13, 15, 14, 0],
   * ]);
   * // -> false
   * ```
   * @tutorial https://www.cs.princeton.edu/courses/archive/spring21/cos226/assignments/8puzzle/specification.php
   */
  static isSolvable(combination: number[][]): boolean {
    let inversions = 0;
    let zeroY = 0;

    for (let y = 0; y < combination.length; y += 1) {
      const row = combination[y];

      for (let x = 0; x < row.length; x += 1) {
        const number = row[x];

        if (number !== 0) {
          for (let y2 = y; y2 < combination.length; y2 += 1) {
            const row2 = combination[y2];

            for (let x2 = row === row2 ? x + 1 : 0; x2 < row2.length; x2 += 1) {
              const number2 = row2[x2];

              if (number2 !== 0 && number > number2) {
                inversions += 1;
              }
            }
          }
        } else {
          zeroY = y;
        }
      }
    }

    const { length: size } = combination;

    return isEven(size) ? isOdd(inversions + zeroY) : isEven(inversions);
  }

  /**
   * @example
   * ```
   * Сombination.isWinning([
   *   [1, 2, 3],
   *   [4, 5, 6],
   *   [7, 8, 0],
   * ]);
   * // -> true
   *
   * Сombination.isWinning([
   *   [1, 2, 3],
   *   [4, 5, 6],
   *   [8, 7, 0],
   * ]);
   * // -> false
   *
   * Сombination.isWinning([
   *   [1, 2, 3, 4],
   *   [5, 6, 7, 8],
   *   [9, 10, 11, 12],
   *   [13, 14, 15, 0],
   * ]);
   * // -> true
   *
   * Сombination.isWinning([
   *   [1, 2, 3, 4],
   *   [5, 6, 7, 8],
   *   [9, 10, 11, 12],
   *   [13, 15, 14, 0],
   * ]);
   * // -> false
   * ```
   */
  static isWinning(combination: number[][]): boolean {
    let prevNumber = Number.MIN_SAFE_INTEGER;

    for (let y = 0; y < combination.length; y += 1) {
      const row = combination[y];

      for (let x = 0; x < row.length; x += 1) {
        const number = row[x];

        if (number !== 0 && prevNumber > number) {
          return false;
        }

        prevNumber = number;
      }
    }

    const lastRow = combination[combination.length - 1];
    const lastNumber = lastRow[lastRow.length - 1];

    return lastNumber === 0;
  }

  /**
   * @example
   * ```
   * Сombination.rotate([
   *   [1, 2, 3, 4],
   *   [5, 6, 7, 8],
   *   [9, 10, 11, 12],
   *   [13, 14, 15, 0],
   * ], 'clockwise');
   * // -> [
   * //   [13, 9, 5, 1],
   * //   [14, 10, 6, 2],
   * //   [15, 11, 7, 3],
   * //   [0, 12, 8, 4],
   * // ];
   *
   * Сombination.rotate([
   *   [1, 2, 3, 4],
   *   [5, 6, 7, 8],
   *   [9, 10, 11, 12],
   *   [13, 14, 15, 0],
   * ], 'counterclockwise');
   * // -> [
   * //   [4, 8, 12, 0],
   * //   [3, 7, 11, 15],
   * //   [2, 6, 10, 14],
   * //   [1, 5, 9, 13],
   * // ];
   * ```
   * @tutorial https://github.com/mihailstar/rss-tasks/blob/master/data-structures-part-1/basics-04-rotate-matrix.ts
   */
  static rotate(
    combination: number[][],
    direction: 'clockwise' | 'counterclockwise' = 'clockwise'
  ): number[][] {
    const result: number[][] = [];

    for (let y = 0; y < combination.length; y += 1) {
      const row = combination[y];
      const yLast = combination.length - 1;

      for (let x = 0; x < row.length; x += 1) {
        const number = row[x];
        const xLast = row.length - 1;

        if (direction === 'counterclockwise') {
          if (result[xLast - x] === undefined) {
            result[xLast - x] = [];
          }

          result[xLast - x][y] = number;
        } else {
          if (result[x] === undefined) {
            result[x] = [];
          }

          result[x][yLast - y] = number;
        }
      }
    }

    return result;
  }
}

export { Сombination };
