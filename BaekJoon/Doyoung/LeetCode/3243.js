// You are given an integer n and a 2D integer array queries.

// There are n cities numbered from 0 to n - 1. Initially, there is a unidirectional road from city i to city i + 1 for all 0 <= i < n - 1.

// queries[i] = [ui, vi] represents the addition of a new unidirectional road from city ui to city vi. After each query, you need to find the length of the shortest path from city 0 to city n - 1.

// Return an array answer where for each i in the range [0, queries.length - 1], answer[i] is the length of the shortest path from city 0 to city n - 1 after processing the first i + 1 queries.

/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  let graph = Array.from({ length: n }, () => []);
  let answer = [];

  // Initialize original graph with adjacent roads
  for (let i = 0; i < n - 1; i++) {
    graph[i].push(i + 1);
  }

  for (let query of queries) {
    let [ui, vi] = query;
    graph[ui].push(vi);

    // Use breadth-first search to find shortest path
    let dist = bfs(graph, n);
    answer.push(dist);
  }

  return answer;
};

/**
 * Perform BFS to find shortest path from 0 to n-1
 * @param {Array<number[]>} graph
 * @param {number} n
 * @return {number}
 */
function bfs(graph, n) {
  let queue = [[0, 0]];
  let visited = new Array(n).fill(false);
  visited[0] = true;

  while (queue.length > 0) {
    let [node, distance] = queue.shift();

    if (node === n - 1) {
      return distance;
    }

    for (let neighbor of graph[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push([neighbor, distance + 1]);
      }
    }
  }

  return -1; // No path found (should not happen in this problem)
}
