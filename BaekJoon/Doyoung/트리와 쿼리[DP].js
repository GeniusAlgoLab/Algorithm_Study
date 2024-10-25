const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

// 문제
// 간선에 가중치와 방향성이 없는 임의의 루트 있는 트리가 주어졌을 때, 아래의 쿼리에 답해보도록 하자.

// 정점 U를 루트로 하는 서브트리에 속한 정점의 수를 출력한다.
// 만약 이 문제를 해결하는 데에 어려움이 있다면, 하단의 힌트에 첨부한 문서를 참고하자.

// 입력
// 트리의 정점의 수 N과 루트의 번호 R, 쿼리의 수 Q가 주어진다. (2 ≤ N ≤ 105, 1 ≤ R ≤ N, 1 ≤ Q ≤ 105)

// 이어 N-1줄에 걸쳐, U V의 형태로 트리에 속한 간선의 정보가 주어진다. (1 ≤ U, V ≤ N, U ≠ V)

// 이는 U와 V를 양 끝점으로 하는 간선이 트리에 속함을 의미한다.

// 이어 Q줄에 걸쳐, 문제에 설명한 U가 하나씩 주어진다. (1 ≤ U ≤ N)

// 입력으로 주어지는 트리는 항상 올바른 트리임이 보장된다.

// 출력
// Q줄에 걸쳐 각 쿼리의 답을 정수 하나로 출력한다.

const [n, r, q] = input[0].split(" ").map(Number);

const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 1; i < n; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  graph[u].push(v);
  graph[v].push(u);
}

const queries = [];
for (let i = n; i < n + q; i++) {
  queries.push(Number(input[i]));
}

const subtree = Array(n + 1).fill(0);
const visited = Array(n + 1).fill(false);

const dfs = (x) => {
  visited[x] = true;
  subtree[x] = 1;
  for (let nx of graph[x]) {
    if (!visited[nx]) {
      subtree[x] += dfs(nx);
    }
  }
  return subtree[x];
};

dfs(r);

const result = queries.map((query) => subtree[query]);
console.log(result.join("\n"));
