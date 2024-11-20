// You are given a string s consisting of the characters 'a', 'b', and 'c' and a non-negative integer k. Each minute, you may take either the leftmost character of s, or the rightmost character of s.

// Return the minimum number of minutes needed for you to take at least k of each character, or return -1 if it is not possible to take k of each character.

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var takeCharacters = function (s, k) {
  // If k is 0, no characters needed
  if (k === 0) return 0;

  // Count total frequencies of each character
  const totalCount = { a: 0, b: 0, c: 0 };
  for (let char of s) {
    totalCount[char]++;
  }

  // Check if it's possible to take k of each character
  if (totalCount["a"] < k || totalCount["b"] < k || totalCount["c"] < k) {
    return -1;
  }

  let n = s.length;
  let left = 0;
  let maxMiddleWindow = 0;
  let windowCount = { a: 0, b: 0, c: 0 };

  // Try to find the longest middle substring we can leave out
  // while still being able to take k of each character from the ends
  for (let right = 0; right < n; right++) {
    windowCount[s[right]]++;

    // Shrink window if we can't take k of each char from the ends
    while (
      left <= right &&
      (totalCount["a"] - windowCount["a"] < k ||
        totalCount["b"] - windowCount["b"] < k ||
        totalCount["c"] - windowCount["c"] < k)
    ) {
      windowCount[s[left]]--;
      left++;
    }

    maxMiddleWindow = Math.max(maxMiddleWindow, right - left + 1);
  }

  // The answer is total length minus the longest valid middle window
  return n - maxMiddleWindow;
};
