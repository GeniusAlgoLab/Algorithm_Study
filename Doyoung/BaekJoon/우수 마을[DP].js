const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 문제
// N개의 마을로 이루어진 나라가 있다. 편의상 마을에는 1부터 N까지 번호가 붙어 있다고 하자. 이 나라는 트리(Tree) 구조로 이루어져 있다. 즉 마을과 마을 사이를 직접 잇는 N-1개의 길이 있으며, 각 길은 방향성이 없어서 A번 마을에서 B번 마을로 갈 수 있다면 B번 마을에서 A번 마을로 갈 수 있다. 또, 모든 마을은 연결되어 있다. 두 마을 사이에 직접 잇는 길이 있을 때, 두 마을이 인접해 있다고 한다.

// 이 나라의 주민들에게 성취감을 높여 주기 위해, 다음 세 가지 조건을 만족하면서 N개의 마을 중 몇 개의 마을을 '우수 마을'로 선정하려고 한다.

// '우수 마을'로 선정된 마을 주민 수의 총 합을 최대로 해야 한다.
// 마을 사이의 충돌을 방지하기 위해서, 만일 두 마을이 인접해 있으면 두 마을을 모두 '우수 마을'로 선정할 수는 없다. 즉 '우수 마을'끼리는 서로 인접해 있을 수 없다.
// 선정되지 못한 마을에 경각심을 불러일으키기 위해서, '우수 마을'로 선정되지 못한 마을은 적어도 하나의 '우수 마을'과는 인접해 있어야 한다.
// 각 마을 주민 수와 마을 사이의 길에 대한 정보가 주어졌을 때, 주어진 조건을 만족하도록 '우수 마을'을 선정하는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 정수 N이 주어진다. (1 ≤ N ≤ 10,000) 둘째 줄에는 마을 주민 수를 나타내는 N개의 자연수가 빈칸을 사이에 두고 주어진다. 1번 마을부터 N번 마을까지 순서대로 주어지며, 주민 수는 10,000 이하이다. 셋째 줄부터 N-1개 줄에 걸쳐서 인접한 두 마을의 번호가 빈칸을 사이에 두고 주어진다.

// 출력
// 첫째 줄에 '우수 마을'의 주민 수의 총 합을 출력한다.

const N = parseInt(input[0]);
const people = input[1].split(" ").map(Number);
const graph = Array.from(Array(N + 1), () => Array());
const dp = Array.from(Array(N + 1), () => Array(2).fill(0));
const visited = Array(N + 1).fill(false);

for (let i = 2; i < N + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

function dfs(node) {
  visited[node] = true;
  dp[node][0] = 0;
  dp[node][1] = people[node - 1];

  for (let next of graph[node]) {
    if (!visited[next]) {
      dfs(next);
      dp[node][0] += Math.max(dp[next][0], dp[next][1]);
      dp[node][1] += dp[next][0];
    }
  }
}

dfs(1);

console.log(Math.max(dp[1][0], dp[1][1]));
