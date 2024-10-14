const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 입력
// 첫째 줄에 표의 크기 N과 합을 구해야 하는 횟수 M이 주어진다. (1 ≤ N ≤ 1024, 1 ≤ M ≤ 100,000) 둘째 줄부터 N개의 줄에는 표에 채워져 있는 수가 1행부터 차례대로 주어진다. 다음 M개의 줄에는 네 개의 정수 x1, y1, x2, y2 가 주어지며, (x1, y1)부터 (x2, y2)의 합을 구해 출력해야 한다. 표에 채워져 있는 수는 1,000보다 작거나 같은 자연수이다. (x1 ≤ x2, y1 ≤ y2)

// 출력
// 총 M줄에 걸쳐 (x1, y1)부터 (x2, y2)까지 합을 구해 출력한다.

const [N, M] = input[0].split(" ").map(Number);

// 표에 채워져 있는 수[N의 크기만큼]
const table = input.slice(1, N + 1).map((line) => line.split(" ").map(Number));

// 합을 구해야 하는 횟수[M의 크기만큼]
const sum = input.slice(N + 1).map((line) => line.split(" ").map(Number));

function sumTable(N, M, table, sum) {
  // dp 배열 초기화
  let dp = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => 0)
  );

  // dp 배열에 표의 값을 누적하여 저장
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      dp[i][j] =
        dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1] + table[i - 1][j - 1];
    }
  }

  // 구해야 하는 합을 출력
  let result = "";
  for (let i = 0; i < M; i++) {
    const [x1, y1, x2, y2] = sum[i];
    result +=
      dp[x2][y2] - dp[x1 - 1][y2] - dp[x2][y1 - 1] + dp[x1 - 1][y1 - 1] + "\n";
  }

  return result;
}

console.log(sumTable(N, M, table, sum).trim());
