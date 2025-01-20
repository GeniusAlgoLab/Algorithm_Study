// Given an array of integers arr, replace each element with its rank.

// The rank represents how large the element is. The rank has the following rules:

// Rank is an integer starting from 1.
// The larger the element, the larger the rank. If two elements are equal, their rank must be the same.
// Rank should be as small as possible.

/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function (arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const ranks = new Map();
  let rank = 1;

  for (const num of sorted) {
    if (!ranks.has(num)) {
      ranks.set(num, rank++);
    }
  }

  return arr.map((num) => ranks.get(num));
};
