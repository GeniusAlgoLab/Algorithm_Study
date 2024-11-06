const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 문제
// 방향성이 없는 그래프가 주어진다. 세준이는 1번 정점에서 N번 정점으로 최단 거리로 이동하려고 한다. 또한 세준이는 두 가지 조건을 만족하면서 이동하는 특정한 최단 경로를 구하고 싶은데, 그것은 바로 임의로 주어진 두 정점은 반드시 통과해야 한다는 것이다.

// 세준이는 한번 이동했던 정점은 물론, 한번 이동했던 간선도 다시 이동할 수 있다. 하지만 반드시 최단 경로로 이동해야 한다는 사실에 주의하라. 1번 정점에서 N번 정점으로 이동할 때, 주어진 두 정점을 반드시 거치면서 최단 경로로 이동하는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 정점의 개수 N과 간선의 개수 E가 주어진다. (2 ≤ N ≤ 800, 0 ≤ E ≤ 200,000) 둘째 줄부터 E개의 줄에 걸쳐서 세 개의 정수 a, b, c가 주어지는데, a번 정점에서 b번 정점까지 양방향 길이 존재하며, 그 거리가 c라는 뜻이다. (1 ≤ c ≤ 1,000) 다음 줄에는 반드시 거쳐야 하는 두 개의 서로 다른 정점 번호 v1과 v2가 주어진다. (v1 ≠ v2, v1 ≠ N, v2 ≠ 1) 임의의 두 정점 u와 v사이에는 간선이 최대 1개 존재한다.

// 출력
// 첫째 줄에 두 개의 정점을 지나는 최단 경로의 길이를 출력한다. 그러한 경로가 없을 때에는 -1을 출력한다.

const [N, E] = input[0].split(" ").map(Number);
// 2차원 배열로 그래프 초기화 (모든 거리를 무한대로 설정)
const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));
const [v1, v2] = input[E + 1].split(" ").map(Number);

// 자기 자신으로 가는 거리는 0으로 초기화
for (let i = 1; i <= N; i++) {
  graph[i][i] = 0;
}

// 양방향 그래프 구축
for (let i = 1; i <= E; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  graph[a][b] = c;
  graph[b][a] = c; // 양방향이므로 양쪽 다 설정
}

// 다익스트라 알고리즘 구현
function dijkstra(start) {
  const dist = Array(N + 1).fill(Infinity); // 최단 거리 배열
  const visited = Array(N + 1).fill(false); // 방문 여부 배열
  dist[start] = 0; // 시작점의 거리는 0

  for (let i = 1; i <= N; i++) {
    let min = Infinity;
    let minIndex = -1;

    // 방문하지 않은 정점 중 가장 가까운 정점 찾기
    for (let j = 1; j <= N; j++) {
      if (!visited[j] && dist[j] < min) {
        min = dist[j];
        minIndex = j;
      }
    }

    if (minIndex === -1) break;
    visited[minIndex] = true;

    // 선택된 정점을 거쳐 가는 경로가 더 짧은지 검사
    for (let j = 1; j <= N; j++) {
      if (!visited[j] && graph[minIndex][j] !== Infinity) {
        dist[j] = Math.min(dist[j], dist[minIndex] + graph[minIndex][j]);
      }
    }
  }

  return dist;
}

// 각 시작점에서의 최단 거리 계산
const fromStart = dijkstra(1); // 1번 정점에서 시작
const fromV1 = dijkstra(v1); // v1에서 시작
const fromV2 = dijkstra(v2); // v2에서 시작

// 두 가지 가능한 경로 계산:
// 1. 1 -> v1 -> v2 -> N
// 2. 1 -> v2 -> v1 -> N
const path1 = fromStart[v1] + fromV1[v2] + fromV2[N];
const path2 = fromStart[v2] + fromV2[v1] + fromV1[N];

// 두 경로 중 더 짧은 것 선택 (경로가 없으면 -1 출력)
const answer = Math.min(path1, path2);
console.log(answer === Infinity ? -1 : answer);
