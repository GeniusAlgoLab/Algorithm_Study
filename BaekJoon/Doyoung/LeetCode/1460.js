// You are given two integer arrays of equal length target and arr. In one step, you can select any non-empty subarray of arr and reverse it. You are allowed to make any number of steps.

// Return true if you can make arr equal to target or false otherwise.

/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
var canBeEqual = function (target, arr) {
  sortedTarget = target.sort((a, b) => a - b);

  sortedArr = arr.sort((a, b) => a - b);

  for (let i = 0; i < target.length; i++) {
    if (sortedTarget[i] !== sortedArr[i]) {
      return false;
    }
  }
  return true;
};
