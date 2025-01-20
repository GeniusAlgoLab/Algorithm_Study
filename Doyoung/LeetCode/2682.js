// There are n friends that are playing a game. The friends are sitting in a circle and are numbered from 1 to n in clockwise order. More formally, moving clockwise from the ith friend brings you to the (i+1)th friend for 1 <= i < n, and moving clockwise from the nth friend brings you to the 1st friend.

// The rules of the game are as follows:

// 1st friend receives the ball.

// After that, 1st friend passes it to the friend who is k steps away from them in the clockwise direction.
// After that, the friend who receives the ball should pass it to the friend who is 2 * k steps away from them in the clockwise direction.
// After that, the friend who receives the ball should pass it to the friend who is 3 * k steps away from them in the clockwise direction, and so on and so forth.
// In other words, on the ith turn, the friend holding the ball should pass it to the friend who is i * k steps away from them in the clockwise direction.

// The game is finished when some friend receives the ball for the second time.

// The losers of the game are friends who did not receive the ball in the entire game.

// Given the number of friends, n, and an integer k, return the array answer, which contains the losers of the game in the ascending order.

/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var circularGameLosers = function (n, k) {
  const received = new Set();

  let currentPosition = 0;
  let turn = 1;

  received.add(currentPosition);

  while (true) {
    let steps = turn * k;
    let nextPosition = (currentPosition + steps) % n;

    if (received.has(nextPosition)) {
      break;
    }

    received.add(nextPosition);

    currentPosition = nextPosition;
    turn++;
  }

  const losers = [];
  for (let i = 0; i < n; i++) {
    if (!received.has(i)) {
      losers.push(i + 1);
    }
  }

  return losers;
};
