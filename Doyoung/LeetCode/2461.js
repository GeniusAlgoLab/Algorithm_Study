// You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that meet the following conditions:

// The length of the subarray is k, and
// All the elements of the subarray are distinct.
// Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return 0.

// A subarray is a contiguous non-empty sequence of elements within an array.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function (nums, k) {
  let maxSum = 0;
  const n = nums.length;

  if (k === 0 || n < k) {
    return 0;
  }

  // Use a sliding window approach with a Map to track frequency
  let windowSum = 0;
  let freq = new Map();

  // Initialize first window
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
    freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
  }

  // Update maxSum if first window has all distinct elements
  if (freq.size === k) {
    maxSum = windowSum;
  }

  // Slide the window through the array
  for (let i = k; i < n; i++) {
    // Remove leftmost element from window
    let leftElement = nums[i - k];
    windowSum -= leftElement;
    freq.set(leftElement, freq.get(leftElement) - 1);
    if (freq.get(leftElement) === 0) {
      freq.delete(leftElement);
    }

    // Add rightmost element to window
    let rightElement = nums[i];
    windowSum += rightElement;
    freq.set(rightElement, (freq.get(rightElement) || 0) + 1);

    // Update maxSum if current window has all distinct elements
    if (freq.size === k) {
      maxSum = Math.max(maxSum, windowSum);
    }
  }

  return maxSum;
};
