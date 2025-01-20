// You are given a string allowed consisting of distinct characters and an array of strings words. A string is consistent if all characters in the string appear in the string allowed.

// Return the number of consistent strings in the array words.

/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function (allowed, words) {
  allowed = new Set(allowed);

  let count = 0;

  for (let word of words) {
    let consistent = true;
    for (let char of word) {
      if (!allowed.has(char)) {
        consistent = false;
        break;
      }
    }
    if (consistent) {
      count++;
    }
  }

  return count;
};
