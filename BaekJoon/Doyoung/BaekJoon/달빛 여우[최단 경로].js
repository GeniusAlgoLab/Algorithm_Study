const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 문제
// 관악산 기슭에는 보름달을 기다리는 달빛 여우가 한 마리 살고 있다. 달빛 여우가 보름달의 달빛을 받으면 아름다운 구미호로 변신할 수 있다. 하지만 보름달을 기다리는 건 달빛 여우뿐만이 아니다. 달빛을 받아서 멋진 늑대인간이 되고 싶어 하는 달빛 늑대도 한 마리 살고 있다.

// 관악산에는 1번부터 N번까지의 번호가 붙은 N개의 나무 그루터기가 있고, 그루터기들 사이에는 M개의 오솔길이 나 있다. 오솔길은 어떤 방향으로든 지나갈 수 있으며, 어떤 두 그루터기 사이에 두 개 이상의 오솔길이 나 있는 경우는 없다. 달빛 여우와 달빛 늑대는 1번 나무 그루터기에서 살고 있다.

// 보름달이 뜨면 나무 그루터기들 중 하나가 달빛을 받아 밝게 빛나게 된다. 그러면 달빛 여우와 달빛 늑대는 먼저 달빛을 독차지하기 위해 최대한 빨리 오솔길을 따라서 그 그루터기로 달려가야 한다. 이때 달빛 여우는 늘 일정한 속도로 달려가는 반면, 달빛 늑대는 달빛 여우보다 더 빠르게 달릴 수 있지만 체력이 부족하기 때문에 다른 전략을 사용한다. 달빛 늑대는 출발할 때 오솔길 하나를 달빛 여우의 두 배의 속도로 달려가고, 그 뒤로는 오솔길 하나를 달빛 여우의 절반의 속도로 걸어가며 체력을 회복하고 나서 다음 오솔길을 다시 달빛 여우의 두 배의 속도로 달려가는 것을 반복한다. 달빛 여우와 달빛 늑대는 각자 가장 빠르게 달빛이 비치는 그루터기까지 다다를 수 있는 경로로 이동한다. 따라서 둘의 이동 경로가 서로 다를 수도 있다.

// 출제자는 관악산의 모든 동물을 사랑하지만, 이번에는 달빛 여우를 조금 더 사랑해 주기로 했다. 그래서 달빛 여우가 달빛 늑대보다 먼저 도착할 수 있는 그루터기에 달빛을 비춰 주려고 한다. 이런 그루터기가 몇 개나 있는지 알아보자.

// 입력
// 첫 줄에 나무 그루터기의 개수와 오솔길의 개수를 의미하는 정수 N, M(2 ≤ N ≤ 4,000, 1 ≤ M ≤ 100,000)이 주어진다.

// 두 번째 줄부터 M개의 줄에 걸쳐 각 줄에 세 개의 정수 a, b, d(1 ≤ a, b ≤ N, a ≠ b, 1 ≤ d ≤ 100,000)가 주어진다. 이는 a번 그루터기와 b번 그루터기 사이에 길이가 d인 오솔길이 나 있음을 의미한다.

// 출력
// 첫 줄에 달빛 여우가 달빛 늑대보다 먼저 도착할 수 있는 나무 그루터기의 개수를 출력한다.

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][0] <= this.heap[index][0]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let swap = null;

      if (leftChildIndex < length) {
        if (this.heap[leftChildIndex][0] < element[0]) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        if (
          (swap === null && this.heap[rightChildIndex][0] < element[0]) ||
          (swap !== null &&
            this.heap[rightChildIndex][0] < this.heap[leftChildIndex][0])
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

  size() {
    return this.heap.length;
  }
}

function solve() {
  function dijkstra(dist, who) {
    const pq = new MinHeap();
    pq.insert([0, 0, 0]);

    while (pq.size() > 0) {
      const [val, node, cnt] = pq.extractMin();

      if (!who && val > dist[node]) continue;
      else if (who && val > dist[node][cnt % 2 === 0 ? 1 : 0]) continue;

      for (const [nextNode, nextVal] of graph[node]) {
        if (!who) {
          const temp = val + nextVal;
          if (dist[nextNode] > temp) {
            dist[nextNode] = temp;
            pq.insert([temp, nextNode, cnt]);
          }
        } else {
          const temp = cnt % 2 === 0 ? val + nextVal / 2 : val + nextVal * 2;
          if (dist[nextNode][cnt % 2] > temp) {
            dist[nextNode][cnt % 2] = temp;
            pq.insert([temp, nextNode, cnt + 1]);
          }
        }
      }
    }
  }

  const [N, M] = input[0].split(" ").map(Number);
  const graph = Array.from({ length: N }, () => []);

  for (let i = 1; i <= M; i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    graph[a - 1].push([b - 1, c * 2]);
    graph[b - 1].push([a - 1, c * 2]);
  }

  const foxDist = Array(N).fill(Infinity);
  foxDist[0] = 0;

  const wolfDist = Array.from({ length: N }, () => [Infinity, Infinity]);
  wolfDist[0][1] = 0;

  dijkstra(foxDist, 0);
  dijkstra(wolfDist, 1);

  let count = 0;
  for (let i = 0; i < N; i++) {
    if (foxDist[i] < Math.min(wolfDist[i][0], wolfDist[i][1])) count++;
  }

  console.log(count);
}

solve();
