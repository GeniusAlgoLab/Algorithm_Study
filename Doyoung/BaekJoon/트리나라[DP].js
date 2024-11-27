const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 문제
// 트리나라는 N개의 도시로 이루어져 있고, 각각의 도시는 1번부터 N번까지 번호가 매겨져 있다. 트리나라의 도로 체계는 트리를 이룬다. 즉, 트리나라에는 N-1개의 양방향도로가 있다. 또, 모두 연결되어 있기 때문에, 임의의 두 도시 사이를 항상 오갈 수 있다.

// 스타트링크의 직원 K명은 트리나라로 이사를 가려고 한다. 모든 직원은 서로 다른 도시로 이사를 가야한다. 즉, 이사할 도시 K개를 선택해야 한다. 이사할 도시에는 중요한 조건이 하나 있는데, 모든 직원이 사는 도시는 연결되어 있어야 한다는 점이다. 예를 들어, 임의의 두 직원 사는 도시가 i와 j라면, i와 j를 연결하는 경로상에 있는 도시에도 직원이 살고 있어야 한다는 점이다.

// 트리나라의 트리 구조가 주어졌을 때, 이사할 도시 K개를 고르는 방법의 수를 구하는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 도시의 수 N과 스타트링크 직원의 수 K가 주어진다. (2 ≤ N ≤ 50, 1 ≤ K ≤ N)

// 둘째 줄부터 N-1개의 줄에는 도로 정보가 주어진다.

// 출력
// 첫째 줄에 도시 K개를 선택하는 방법의 수를 1,000,000,007로 나눈 나머지를 출력한다.

const MOD = 1000000007;

// 입력 처리
const [N, K] = input[0].split(" ").map(Number);
// vertex(양방향), tree(단방향), visited 배열 초기화
const vt = Array.from(Array(N + 1), () => []);
const tr = Array.from(Array(N + 1), () => []);
const visited = Array(N + 1).fill(false);

// 3차원 DP 배열 초기화
// 51: N의 최대값
const dp = Array.from(Array(51), () =>
  Array.from(Array(51), () => Array(51).fill(-1))
);

// 간선 정보 입력
for (let i = 1; i < N; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  vt[x].push(y);
  vt[y].push(x);
}

// DFS로 트리 구조 만들기
function dfs(here) {
  visited[here] = true;
  for (let next of vt[here]) {
    if (visited[next]) continue;
    tr[here].push(next);
    dfs(next);
  }
}

// 상태를 계산하는 함수
function func(pos, idx, state) {
  if (!state) return 1;
  if (idx >= tr[pos].length) return state === 1 ? 1 : 0;

  if (dp[pos][idx][state] !== -1) return dp[pos][idx][state];

  let ret = 0;
  for (let i = 0; i < state; i++) {
    ret =
      (ret + func(tr[pos][idx], 0, i) * func(pos, idx + 1, state - i)) % MOD;
  }

  dp[pos][idx][state] = ret;
  return ret;
}

// 메인 로직
dfs(1);
let result = 0;

for (let i = 1; i <= N; i++) {
  result = (result + func(i, 0, K)) % MOD;
}

console.log(result);
