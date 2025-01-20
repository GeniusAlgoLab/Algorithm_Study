// You are given an array of strings words and a string pref.

// Return the number of strings in words that contain pref as a prefix.

// A prefix of a string s is any leading contiguous substring of s.

/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
var prefixCount = function (words, pref) {
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].startsWith(pref)) {
      count++;
    }
  }
  return count;
};
