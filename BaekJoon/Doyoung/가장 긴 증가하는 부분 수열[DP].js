const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 문제
// 수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.

// 예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {10, 20, 10, 30, 20, 50} 이고, 길이는 4이다.

// 입력
// 첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000)이 주어진다.

// 둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (1 ≤ Ai ≤ 1,000)

// 출력
// 첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.

const N = parseInt(input[0]);

const A = input[1].split(" ").map(Number);

function solution(N, A) {
  dp = Array(N).fill(1);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (A[i] > A[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

console.log(solution(N, A));
