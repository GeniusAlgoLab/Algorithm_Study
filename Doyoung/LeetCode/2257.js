// You are given two integers m and n representing a 0-indexed m x n grid. You are also given two 2D integer arrays guards and walls where guards[i] = [rowi, coli] and walls[j] = [rowj, colj] represent the positions of the ith guard and jth wall respectively.

// A guard can see every cell in the four cardinal directions (north, east, south, or west) starting from their position unless obstructed by a wall or another guard. A cell is guarded if there is at least one guard that can see it.

// Return the number of unoccupied cells that are not guarded.

/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function (m, n, guards, walls) {
  // 2D 배열로 상태 추적 (더 효율적인 메모리 사용)
  const grid = Array.from({ length: m }, () => new Array(n).fill(0));

  // 벽 표시 (1로 표시)
  for (const [row, col] of walls) {
    grid[row][col] = 1;
  }

  // 경비원 표시 (2로 표시)
  for (const [row, col] of guards) {
    grid[row][col] = 2;
  }

  // 경비원의 감시 영역 표시
  for (const [row, col] of guards) {
    // 4개 방향 탐색
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (const [dx, dy] of directions) {
      let newRow = row + dx;
      let newCol = col + dy;

      // 해당 방향으로 계속 탐색
      while (
        newRow >= 0 &&
        newRow < m &&
        newCol >= 0 &&
        newCol < n &&
        grid[newRow][newCol] !== 1 && // 벽을 만나지 않음
        grid[newRow][newCol] !== 2 // 다른 경비원을 만나지 않음
      ) {
        // 감시된 영역은 3으로 표시
        if (grid[newRow][newCol] === 0) {
          grid[newRow][newCol] = 3;
        }

        newRow += dx;
        newCol += dy;
      }
    }
  }

  // 감시되지 않은 영역 계산
  let unguardedCount = 0;
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      // 빈 칸(0)만 카운트
      if (grid[row][col] === 0) {
        unguardedCount++;
      }
    }
  }

  return unguardedCount;
};
