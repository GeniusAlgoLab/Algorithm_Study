const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

const items = input.slice(1).map((line) => line.split(" ").map(Number));

function countMaxValue(N, K, items) {
  let dp = Array.from({ length: N + 1 }, () =>
    Array.from({ length: K + 1 }, () => 0)
  );

  for (let i = 1; i <= N; i++) {
    const [weight, value] = items[i - 1];
    for (let j = 1; j <= K; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j >= weight) {
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - weight] + value);
      }
    }
  }

  return dp[N][K];
}

console.log(countMaxValue(N, K, items));
