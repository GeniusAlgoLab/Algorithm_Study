const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

//   문제
//   NASA에서는 화성 탐사를 위해 화성에 무선 조종 로봇을 보냈다. 실제 화성의 모습은 굉장히 복잡하지만, 로봇의 메모리가 얼마 안 되기 때문에 지형을 N×M 배열로 단순화 하여 생각하기로 한다.

//   지형의 고저차의 특성상, 로봇은 움직일 때 배열에서 왼쪽, 오른쪽, 아래쪽으로 이동할 수 있지만, 위쪽으로는 이동할 수 없다. 또한 한 번 탐사한 지역(배열에서 하나의 칸)은 탐사하지 않기로 한다.

//   각각의 지역은 탐사 가치가 있는데, 로봇을 배열의 왼쪽 위 (1, 1)에서 출발시켜 오른쪽 아래 (N, M)으로 보내려고 한다. 이때, 위의 조건을 만족하면서, 탐사한 지역들의 가치의 합이 최대가 되도록 하는 프로그램을 작성하시오.

//   입력
//   첫째 줄에 N, M(1≤N, M≤1,000)이 주어진다. 다음 N개의 줄에는 M개의 수로 배열이 주어진다. 배열의 각 수는 절댓값이 100을 넘지 않는 정수이다. 이 값은 그 지역의 가치를 나타낸다.

//   출력
//   첫째 줄에 최대 가치의 합을 출력한다.

const [n, m] = input[0].split(" ").map(Number);

const arr = Array.from({ length: n }, (_, i) =>
  input[i + 1].split(" ").map(Number)
);

const dp = Array.from({ length: n }, () => Array(m).fill(0));

const temp = Array.from({ length: 2 }, () => Array(m).fill(0));

dp[0][0] = arr[0][0];
for (let i = 1; i < m; i++) {
  dp[0][i] = dp[0][i - 1] + arr[0][i];
}

function solution(n, m, arr) {
  for (let i = 1; i < n; i++) {
    // 왼쪽 & 위쪽
    temp[0][0] = dp[i - 1][0] + arr[i][0];
    for (let j = 1; j < m; j++) {
      temp[0][j] = Math.max(dp[i - 1][j], temp[0][j - 1]) + arr[i][j];
    }

    // 오른쪽 & 위쪽
    temp[1][m - 1] = dp[i - 1][m - 1] + arr[i][m - 1];
    for (let j = m - 2; j >= 0; j--) {
      temp[1][j] = Math.max(dp[i - 1][j], temp[1][j + 1]) + arr[i][j];
    }

    // 최대값
    for (let j = 0; j < m; j++) {
      dp[i][j] = Math.max(temp[0][j], temp[1][j]);
    }
  }

  return dp[n - 1][m - 1];
}

console.log(solution(n, m, arr));
