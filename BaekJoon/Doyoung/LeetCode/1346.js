// Given an array arr of integers, check if there exist two indices i and j such that :

// i != j
// 0 <= i, j < arr.length
// arr[i] == 2 * arr[j]

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var checkIfExist = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.includes(arr[i] * 2) && arr.indexOf(arr[i] * 2) !== i) {
      return true;
    }
  }

  return false;
};
