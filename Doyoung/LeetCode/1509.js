// You are given an integer array nums.

// In one move, you can choose one element of nums and change it to any value.

// Return the minimum difference between the largest and smallest value of nums after performing at most three moves.

/**
 * @param {number[]} nums
 * @return {number}
 */
var minDifference = function (nums) {
  if (nums.length <= 4) return 0;

  nums.sort((a, b) => a - b);
  let n = nums.length;

  let minDiff = Infinity;
  for (let i = 0; i <= 3; i++) {
    minDiff = Math.min(minDiff, nums[n - 1 - 3 + i] - nums[i]);
  }

  return minDiff;
};
