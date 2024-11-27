// You are given an m x n binary matrix matrix.

// You can choose any number of columns in the matrix and flip every cell in that column (i.e., Change the value of the cell from 0 to 1 or vice versa).

// Return the maximum number of rows that have all values equal after some number of flips.

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var maxEqualRowsAfterFlips = function (matrix) {
  const map = new Map();
  for (const row of matrix) {
    let key = "";
    if (row[0] === 0) {
      key = row.join("");
    } else {
      key = row.map((val) => 1 - val).join("");
    }

    if (!map.has(key)) {
      map.set(key, 0);
    }
    map.set(key, map.get(key) + 1);
  }

  return Math.max(...map.values());
};
