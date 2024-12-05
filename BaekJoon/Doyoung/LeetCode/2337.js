// You are given two strings start and target, both of length n. Each string consists only of the characters 'L', 'R', and '_' where:

// The characters 'L' and 'R' represent pieces, where a piece 'L' can move to the left only if there is a blank space directly to its left, and a piece 'R' can move to the right only if there is a blank space directly to its right.
// The character '_' represents a blank space that can be occupied by any of the 'L' or 'R' pieces.
// Return true if it is possible to obtain the string target by moving the pieces of the string start any number of times. Otherwise, return false.

/**
 * @param {string} start
 * @param {string} target
 * @return {boolean}
 */
var canChange = function (start, target) {
  // First, check if the non-blank characters match
  if (start.replace(/_/g, "") !== target.replace(/_/g, "")) {
    return false;
  }

  // Track positions of 'L' and 'R' in both strings
  let i = 0,
    j = 0;

  while (i < start.length && j < target.length) {
    // Skip blanks in both strings
    while (i < start.length && start[i] === "_") i++;
    while (j < target.length && target[j] === "_") j++;

    // If we've reached the end of either string, break
    if (i === start.length || j === target.length) break;

    // Check if current non-blank characters match
    if (start[i] !== target[j]) return false;

    // Check movement constraints
    if (start[i] === "L" && i < j) return false; // 'L' can only move left
    if (start[i] === "R" && i > j) return false; // 'R' can only move right

    i++;
    j++;
  }

  // Ensure all remaining characters are blanks
  while (i < start.length) {
    if (start[i] !== "_") return false;
    i++;
  }
  while (j < target.length) {
    if (target[j] !== "_") return false;
    j++;
  }

  return true;
};
