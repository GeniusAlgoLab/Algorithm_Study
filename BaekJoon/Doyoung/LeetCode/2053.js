// A distinct string is a string that is present only once in an array.

// Given an array of strings arr, and an integer k, return the kth distinct string present in arr. If there are fewer than k distinct strings, return an empty string "".

// Note that the strings are considered in the order in which they appear in the array.

/**
 * @param {string[]} arr
 * @param {number} k
 * @return {string}
 */
var kthDistinct = function (arr, k) {
  const freqMap = new Map();

  for (const str of arr) {
    freqMap.set(str, (freqMap.get(str) || 0) + 1);
  }

  return [...freqMap].filter(([key, value]) => value === 1)[k - 1]?.[0] || "";
};
