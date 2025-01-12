// Given a string s of zeros and ones, return the maximum score after splitting the string into two non-empty substrings (i.e. left substring and right substring).

// The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.

/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
  let maxScore = 0;

  // For each possible split position (leaving at least one char on each side)
  for (let i = 0; i < s.length - 1; i++) {
    let leftZeros = 0;
    let rightOnes = 0;

    // Count zeros in left substring
    for (let j = 0; j <= i; j++) {
      if (s[j] === "0") leftZeros++;
    }

    // Count ones in right substring
    for (let j = i + 1; j < s.length; j++) {
      if (s[j] === "1") rightOnes++;
    }

    maxScore = Math.max(maxScore, leftZeros + rightOnes);
  }

  return maxScore;
};
