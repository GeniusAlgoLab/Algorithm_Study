const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 방향그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오. 단, 모든 간선의 가중치는 10 이하의 자연수이다.

// 입력
// 첫째 줄에 정점의 개수 V와 간선의 개수 E가 주어진다. (1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000) 모든 정점에는 1부터 V까지 번호가 매겨져 있다고 가정한다. 둘째 줄에는 시작 정점의 번호 K(1 ≤ K ≤ V)가 주어진다. 셋째 줄부터 E개의 줄에 걸쳐 각 간선을 나타내는 세 개의 정수 (u, v, w)가 순서대로 주어진다. 이는 u에서 v로 가는 가중치 w인 간선이 존재한다는 뜻이다. u와 v는 서로 다르며 w는 10 이하의 자연수이다. 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.

// 출력
// 첫째 줄부터 V개의 줄에 걸쳐, i번째 줄에 i번 정점으로의 최단 경로의 경로값을 출력한다. 시작점 자신은 0으로 출력하고, 경로가 존재하지 않는 경우에는 INF를 출력하면 된다.
const [V, E] = input[0].split(" ").map(Number);
const K = Number(input[1]);
const graph = Array.from({ length: V + 1 }, () => []);
const distance = Array(V + 1).fill(Infinity);

for (let i = 2; i < 2 + E; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  graph[u].push({ node: v, weight: w });
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node, priority) {
    this.heap.push({ node, priority });
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (parent.priority <= element.priority) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const dijkstra = (start) => {
  distance[start] = 0;
  let minHeap = new MinHeap();
  minHeap.insert(start, 0);

  while (!minHeap.isEmpty()) {
    let { node: current, priority: currentDistance } = minHeap.extractMin();

    if (currentDistance > distance[current]) continue;

    for (let i = 0; i < graph[current].length; i++) {
      let next = graph[current][i].node;
      let nextDistance = distance[current] + graph[current][i].weight;

      if (nextDistance < distance[next]) {
        distance[next] = nextDistance;
        minHeap.insert(next, nextDistance);
      }
    }
  }
};

dijkstra(K);

for (let i = 1; i < distance.length; i++) {
  if (distance[i] === Infinity) {
    console.log("INF");
  } else {
    console.log(distance[i]);
  }
}
