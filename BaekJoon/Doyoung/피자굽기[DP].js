const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 문제
// 월드피자 원주 지점에서 N개의 피자 반죽을 오븐에 넣고 구우려고 한다. 그런데, 월드피자에서 만드는 피자 반죽은 지름이 제각각이다. 그런가하면, 월드피자에서 사용하는 오븐의 모양도 몹시 오묘하다. 이 오븐은 깊은 관처럼 생겼는데, 관의 지름이 깊이에 따라 들쭉날쭉하게 변한다. 아래는 오븐의 단면 예시이다.

// 피자 반죽은 완성되는 순서대로 오븐에 들어간다. 이렇게 N개의 피자가 오븐에 모두 들어가고 나면, 맨 위의 피자가 얼마나 깊이 들어가 있는지가 궁금하다. 이를 알아내는 프로그램을 작성하시오.

// 입력
// 첫째 줄에 오븐의 깊이 D와 피자 반죽의 개수 N이 공백을 사이에 두고 주어진다. (1 ≤ D, N ≤ 300,000) 둘째 줄에는 오븐의 최상단부터 시작하여 깊이에 따른 오븐의 지름이 차례대로 주어진다. 셋째 줄에는 피자 반죽이 완성되는 순서대로, 그 각각의 지름이 주어진다. 오븐의 지름이나 피자 반죽의 지름은 10억 이하의 자연수이다.

// 출력
// 첫째 줄에, 마지막 피자 반죽의 위치를 출력한다. 오븐의 최상단이 1이고, 최하단 가장 깊은 곳이 D이 된다. 만약 피자가 모두 오븐에 들어가지 않는다면, 0을 출력한다.

const [D, N] = input[0].split(" ").map(Number);
const data = input[1].split(" ").map(Number);
const pizza = input[2].split(" ").map(Number);

// 오븐의 실제 유효 지름 계산
const oven = [data[0]];
for (let i = 1; i < data.length; i++) {
  if (data[i] > oven[i - 1]) {
    oven.push(oven[i - 1]);
  } else {
    oven.push(data[i]);
  }
}

// 피자를 넣을 수 있는 위치 찾기
let pizzaIdx = 0;
let i = D - 1;

while (i >= 0) {
  if (pizza[pizzaIdx] <= oven[i]) {
    pizzaIdx++;
    if (pizzaIdx === N) {
      break;
    }
  }
  i--;
}

// 결과 출력
if (pizzaIdx < N) {
  console.log(0);
} else {
  console.log(i + 1);
}
