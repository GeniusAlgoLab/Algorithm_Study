const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const candy = input.slice(1).map((line) => line.split(" ").map(Number));

function countMaxCandy(N, M, candy) {
  let dp = Array.from({ length: N + 1 }, () =>
    Array.from({ length: M + 1 }, () => 0)
  );

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      dp[i][j] = candy[i - 1][j - 1];
      if (i > 1)
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j] + candy[i - 1][j - 1]);
      if (j > 1)
        dp[i][j] = Math.max(dp[i][j], dp[i][j - 1] + candy[i - 1][j - 1]);
      if (i > 1 && j > 1)
        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + candy[i - 1][j - 1]);
    }
  }

  return dp[N][M];
}

console.log(countMaxCandy(N, M, candy));
