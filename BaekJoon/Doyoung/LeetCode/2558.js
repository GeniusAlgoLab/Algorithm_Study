// You are given an integer array gifts denoting the number of gifts in various piles. Every second, you do the following:

// Choose the pile with the maximum number of gifts.
// If there is more than one pile with the maximum number of gifts, choose any.
// Leave behind the floor of the square root of the number of gifts in the pile. Take the rest of the gifts.
// Return the number of gifts remaining after k seconds.

/**
 * @param {number[]} gifts
 * @param {number} k
 * @return {number}
 */
var pickGifts = function (gifts, k) {
  for (let i = 0; i < k; i++) {
    let max = Math.max(...gifts);
    let maxIndex = gifts.indexOf(max);
    gifts[maxIndex] = Math.floor(Math.sqrt(gifts[maxIndex]));
  }

  return gifts.reduce((acc, cur) => acc + cur, 0);
};
