// Given an m x n matrix of distinct numbers, return all lucky numbers in the matrix in any order.

// A lucky number is an element of the matrix such that it is the minimum element in its row and maximum in its column.

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var luckyNumbers = function (matrix) {
  return matrix.flatMap((row, i) => {
    const minVal = Math.min(...row);
    const minIndex = row.indexOf(minVal);
    const isLucky = matrix.every((r) => r[minIndex] <= minVal);
    return isLucky ? [minVal] : [];
  });
};
