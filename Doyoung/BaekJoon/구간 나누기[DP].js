const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 문제
// N(1 ≤ N ≤ 100)개의 수로 이루어진 1차원 배열이 있다. 이 배열에서 M(1 ≤ M ≤ ⌈(N/2)⌉)개의 구간을 선택해서, 구간에 속한 수들의 총 합이 최대가 되도록 하려 한다. 단, 다음의 조건들이 만족되어야 한다.

// 각 구간은 한 개 이상의 연속된 수들로 이루어진다.
// 서로 다른 두 구간끼리 겹쳐있거나 인접해 있어서는 안 된다.
// 정확히 M개의 구간이 있어야 한다. M개 미만이어서는 안 된다.
// N개의 수들이 주어졌을 때, 답을 구하는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 두 정수 N, M이 주어진다. 다음 N개의 줄에는 배열을 이루는 수들이 차례로 주어진다. 배열을 이루는 수들은 -32768 이상 32767 이하의 정수이다.

// 출력
// 첫째 줄에 구간에 속한 수들의 총 합의 최댓값을 출력한다.

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map(Number);

const prefixSum = Array(N + 1).fill(0);
for (let i = 0; i < N; i++) {
  prefixSum[i + 1] = prefixSum[i] + arr[i];
}

const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(-32768 * 101));

// Base case: Using first element as a single interval
dp[1][1] = arr[0];

// Fill dp table
for (let i = 2; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    // Option 1: Don't include current element in any interval
    dp[i][j] = dp[i - 1][j];

    // Try all possible intervals ending at position i
    for (let k = 0; k < i; k++) {
      // For j = 1, we only need to consider continuous segments ending at i
      if (j === 1) {
        dp[i][1] = Math.max(dp[i][1], prefixSum[i] - prefixSum[k]);
        continue;
      }

      // For j > 1, consider adding a new interval to previous solutions
      // We need to leave at least one element gap between intervals
      if (k > 1) {
        // Ensure there's space for previous intervals
        const currentInterval = prefixSum[i] - prefixSum[k];
        dp[i][j] = Math.max(dp[i][j], dp[k - 1][j - 1] + currentInterval);
      }
    }
  }
}
console.log(dp[N][M]);
