// On an 2 x 3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.

// The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].

// Given the puzzle board board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.

/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function (board) {
  let target = "123450";
  let start = "";
  let moves = 0;
  let visited = new Set();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      start += board[i][j];
    }
  }

  let queue = [start];

  while (queue.length > 0) {
    let next = [];

    for (let s of queue) {
      if (s === target) {
        return moves;
      }

      visited.add(s);

      let zeroIndex = s.indexOf("0");
      let nextStates = getNextStates(zeroIndex, s);

      for (let nextState of nextStates) {
        if (!visited.has(nextState)) {
          next.push(nextState);
        }
      }
    }

    moves++;
    queue = next;
  }

  return -1;
};

function getNextStates(zeroIndex, currentState) {
  // For a 2x3 board, these are the valid adjacent positions for each index
  const adjacentPositions = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4],
    4: [1, 3, 5],
    5: [2, 4],
  };

  let result = [];
  let state = currentState.split("");

  // Try swapping with each valid adjacent position
  for (let adjacentPos of adjacentPositions[zeroIndex]) {
    // Create a new state by swapping
    let newState = [...state];
    newState[zeroIndex] = state[adjacentPos];
    newState[adjacentPos] = "0";
    result.push(newState.join(""));
  }

  return result;
}
