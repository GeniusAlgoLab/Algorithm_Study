const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 문제
// N(2 ≤ N ≤ 10,000)개의 섬으로 이루어진 나라가 있다. 이들 중 몇 개의 섬 사이에는 다리가 설치되어 있어서 차들이 다닐 수 있다.

// 영식 중공업에서는 두 개의 섬에 공장을 세워 두고 물품을 생산하는 일을 하고 있다. 물품을 생산하다 보면 공장에서 다른 공장으로 생산 중이던 물품을 수송해야 할 일이 생기곤 한다. 그런데 각각의 다리마다 중량제한이 있기 때문에 무턱대고 물품을 옮길 순 없다. 만약 중량제한을 초과하는 양의 물품이 다리를 지나게 되면 다리가 무너지게 된다.

// 한 번의 이동에서 옮길 수 있는 물품들의 중량의 최댓값을 구하는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 N, M(1 ≤ M ≤ 100,000)이 주어진다. 다음 M개의 줄에는 다리에 대한 정보를 나타내는 세 정수 A, B(1 ≤ A, B ≤ N), C(1 ≤ C ≤ 1,000,000,000)가 주어진다. 이는 A번 섬과 B번 섬 사이에 중량제한이 C인 다리가 존재한다는 의미이다. 서로 같은 두 섬 사이에 여러 개의 다리가 있을 수도 있으며, 모든 다리는 양방향이다. 마지막 줄에는 공장이 위치해 있는 섬의 번호를 나타내는 서로 다른 두 정수가 주어진다. 공장이 있는 두 섬을 연결하는 경로는 항상 존재하는 데이터만 입력으로 주어진다.

// 출력
// 첫째 줄에 답을 출력한다.

const [N, M] = input.shift().split(" ").map(Number);
const [start, end] = input.pop().split(" ").map(Number);

input = input.map((v) => v.split(" ").map(Number));

let answer = 0;
const graph = [];
const set = new Array(N + 1).fill(0).map((_, i) => i);

for (const [from, to, weight] of input) {
  graph.push([from, to, weight]);
}

// graph를 weight를 기준으로 내림차순 정렬
graph.sort((a, b) => b[2] - a[2]);

function find(a) {
  if (set[a] === a) return a;
  // find 함수를 통해 부모 노드를 찾아서 부모 노드를 반환
  return (set[a] = find(set[a]));
}

function union(a, b) {
  const rootA = find(a);
  const rootB = find(b);

  if (rootA !== rootB) {
    // 더 작은 값을 가진 노드를 부모로 설정
    if (rootA < rootB) {
      set[rootB] = rootA;
    } else {
      set[rootA] = rootB;
    }
    return true;
  }
  return false;
}

// 최대 중량 찾기
for (const [from, to, weight] of graph) {
  union(from, to);

  // 두 공장이 연결되었는지 확인
  if (find(start) === find(end)) {
    answer = weight;
    break;
  }
}

console.log(answer);
