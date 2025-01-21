// Given an array of integers nums, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.

// Return the sorted array.

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var frequencySort = function (nums) {
  let frequency = {};

  for (let i = 0; i < nums.length; i++) {
    if (frequency[nums[i]] === undefined) {
      frequency[nums[i]] = 1;
    } else {
      frequency[nums[i]]++;
    }
  }

  nums.sort((a, b) => {
    if (frequency[a] === frequency[b]) {
      return b - a;
    } else {
      return frequency[a] - frequency[b];
    }
  });

  return nums;
};
