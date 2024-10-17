const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 일반적인 그래프에서 이 문제를 푸는 것이 매우 어렵다는 것이 알려져 있기 때문에, 친구 관계 그래프가 트리인 경우, 즉 모든 두 정점 사이에 이들을 잇는 경로가 존재하면서 사이클이 존재하지 않는 경우만 고려한다.
// 예를 들어, 8명의 사람으로 이루어진 다음 친구 관계 트리를 생각해보자. 2, 3, 4번 노드가 표현하는 사람들이 얼리 아답터라면, 얼리 아답터가 아닌 사람들은 자신의 모든 친구가 얼리 아답터이기 때문에 새로운 아이디어를 받아들인다.
// 친구 관계 트리가 주어졌을 때, 모든 개인이 새로운 아이디어를 수용하기 위하여 필요한 최소 얼리 어답터의 수를 구하는 프로그램을 작성하시오.

// 입력
// 첫 번째 줄에는 친구 관계 트리의 정점 개수 N이 주어진다. 단, 2 ≤ N ≤ 1,000,000이며, 각 정점은 1부터 N까지 일련번호로 표현된다. 두 번째 줄부터 N-1개의 줄에는 각 줄마다 친구 관계 트리의 에지 (u, v)를 나타내는 두 정수 u와 v가 하나의 빈칸을 사이에 두고 주어진다.

// 출력
// 주어진 친구 관계 그래프에서 아이디어를 전파하는데 필요한 얼리 아답터의 최소 수를 하나의 정수로 출력한다.

const n = parseInt(input[0]);

let graph = Array.from({ length: n + 1 }, () => []);
let visited = Array.from({ length: n + 1 }, () => false);
let dp = Array.from({ length: n + 1 }, () => [0, 0]);

for (let i = 1; i < n; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

let root = Math.floor(Math.random() * n) + 1;

function dfs(now, visited, graph, dp) {
  visited[now] = true;
  // dp[0][now]은 현재 노드가 얼리 어답터가 아닐 때, dp[1][now]은 현재 노드가 얼리 어답터일 때
  dp[0][now] = 0;
  dp[1][now] = 1;
  for (let next of graph[now]) {
    if (!visited[next]) {
      dfs(next, visited, graph, dp);
      dp[0][now] += dp[1][next];
      dp[1][now] += Math.min(dp[0][next], dp[1][next]);
    }
  }
}

dfs(root, visited, graph, dp);
console.log(Math.min(dp[0][root], dp[1][root]));
