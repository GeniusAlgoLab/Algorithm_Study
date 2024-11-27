// You have a bomb to defuse, and your time is running out! Your informer will provide you with a circular array code of length of n and a key k.

// To decrypt the code, you must replace every number. All the numbers are replaced simultaneously.

/**
 * @param {number[]} code
 * @param {number} k
 * @return {number[]}
 */
var decrypt = function (code, k) {
  const n = code.length;
  const result = Array(n).fill(0);

  if (k === 0) {
    return result;
  }

  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 1; j <= Math.abs(k); j++) {
      sum += code[(i + j * Math.sign(k) + n) % n];
    }
    result[i] = sum;
  }
  return result;
};
