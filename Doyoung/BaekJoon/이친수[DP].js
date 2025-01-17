// const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
// let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// const N = Number(input);

// function countPinaryNumbers(N) {
//   if (N === 1) return 1;

//   let dp = Array.from({ length: N + 1 }, () => [0, 0]);
//   dp[1][0] = 0;
//   dp[1][1] = 1;

//   for (let i = 2; i <= N; i++) {
//     dp[i][0] = dp[i - 1][0] + dp[i - 1][1];
//     dp[i][1] = dp[i - 1][0];
//   }

//   return dp[N][0] + dp[N][1];
// }

// console.log(countPinaryNumbers(N));

// 해당 문제를 알아보니 결과값이 Number 자료형보다 더 큰 값이 나올 수 있기 때문에 BigInt 자료형을 사용해야 한다.

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = BigInt(input[0]);

function countPinaryNumbers(N) {
  if (N === 1n) return 1n;

  // 두 개의 변수만 사용하여 메모리 최적화
  let prev0 = 0n;
  let prev1 = 1n;

  for (let i = 2n; i <= N; i++) {
    let current0 = prev0 + prev1;
    let current1 = prev0;
    prev0 = current0;
    prev1 = current1;
  }

  return prev0 + prev1;
}

console.log(countPinaryNumbers(N).toString());
