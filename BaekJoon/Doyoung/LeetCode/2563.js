// Given a 0-indexed integer array nums of size n and two integers lower and upper, return the number of fair pairs.

// A pair (i, j) is fair if:
// 0 <= i < j < n, and
// lower <= nums[i] + nums[j] <= upper

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  nums.sort((a, b) => a - b);
  return countLessThan(nums, upper) - countLessThan(nums, lower - 1);
};

// Helper function to count pairs with sum <= target
function countLessThan(nums, target) {
  let count = 0;
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    if (nums[left] + nums[right] <= target) {
      count += right - left;
      left++;
    } else {
      right--;
    }
  }

  return count;
}
