// The complement of an integer is the integer you get when you flip all the 0's to 1's and all the 1's to 0's in its binary representation.

// For example, The integer 5 is "101" in binary and its complement is "010" which is the integer 2.
// Given an integer num, return its complement.

/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
  let binary = num.toString(2);
  let complement = "";

  for (let i = 0; i < binary.length; i++) {
    complement += binary[i] === "1" ? "0" : "1";
  }

  return parseInt(complement, 2);
};
