// You are part of a university admissions office and need to keep track of the kth highest test score from applicants in real-time. This helps to determine cut-off marks for interviews and admissions dynamically as new applicants submit their scores.

// You are tasked to implement a class which, for a given integer k, maintains a stream of test scores and continuously returns the kth highest test score after a new score has been submitted. More specifically, we are looking for the kth highest score in the sorted list of all scores.

// Implement the KthLargest class:

// KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of test scores nums.
// int add(int val) Adds a new test score val to the stream and returns the element representing the kth largest element in the pool of test scores so far.

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.k = k;
  this.nums = nums.sort((a, b) => b - a); // Sort in descending order

  // Keep only k elements
  while (this.nums.length > k) {
    this.nums.pop();
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  // If we have less than k elements, or val is larger than the kth largest
  if (this.nums.length < this.k || val > this.nums[this.nums.length - 1]) {
    // Binary search to find insertion position
    let left = 0;
    let right = this.nums.length;

    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (this.nums[mid] > val) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // Insert val at the correct position
    this.nums.splice(left, 0, val);

    // Keep only k elements
    if (this.nums.length > this.k) {
      this.nums.pop();
    }
  }

  // Return the kth largest (last element in our sorted array)
  return this.nums[this.k - 1];
};
