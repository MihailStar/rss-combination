import { strict as assert } from 'assert';
import { Сombination } from './combination.js';

// Сombination.generateSolvable
assert.strictEqual(Сombination.generateSolvable(3).length, 3);
assert.strictEqual(
  Сombination.generateSolvable(3).every((row) => row.length === 3),
  true
);

assert.strictEqual(Сombination.generateSolvable(4).length, 4);
assert.strictEqual(
  Сombination.generateSolvable(4).every((row) => row.length === 4),
  true
);

// Сombination.generateWinning
assert.deepStrictEqual(Сombination.generateWinning(3), [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
]);

assert.deepStrictEqual(Сombination.generateWinning(4), [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0],
]);

// Сombination.isSolvable
assert.strictEqual(
  Сombination.isSolvable([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ]),
  true
);

assert.strictEqual(
  Сombination.isSolvable([
    [1, 2, 3],
    [4, 5, 6],
    [8, 7, 0],
  ]),
  false
);

assert.strictEqual(
  Сombination.isSolvable([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ]),
  true
);

assert.strictEqual(
  Сombination.isSolvable([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 15, 14, 0],
  ]),
  false
);

// Сombination.isWinning
assert.strictEqual(
  Сombination.isWinning([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ]),
  true
);

assert.strictEqual(
  Сombination.isWinning([
    [1, 2, 3],
    [4, 5, 6],
    [8, 7, 0],
  ]),
  false
);

assert.strictEqual(
  Сombination.isWinning([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ]),
  true
);

assert.strictEqual(
  Сombination.isWinning([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 15, 14, 0],
  ]),
  false
);

// Сombination.rotate
assert.deepStrictEqual(
  Сombination.rotate(
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ],
    'clockwise'
  ),
  [
    [13, 9, 5, 1],
    [14, 10, 6, 2],
    [15, 11, 7, 3],
    [0, 12, 8, 4],
  ]
);

assert.deepStrictEqual(
  Сombination.rotate(
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ],
    'counterclockwise'
  ),
  [
    [4, 8, 12, 0],
    [3, 7, 11, 15],
    [2, 6, 10, 14],
    [1, 5, 9, 13],
  ]
);
