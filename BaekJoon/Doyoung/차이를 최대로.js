const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
input = input[1].split(" ").map(Number);

let newArr = [];
const check = new Array(N).fill(false);

function cal(newArr) {
  //주어진 배열로, 조건대로 빼고, 그 절대값을 다 더하는 함수
  let sum = 0;
  for (let i = 0; i < N - 1; i++) {
    sum += Math.abs(newArr[i] - newArr[i + 1]);
  }
  return sum;
}

let max = 0;

function dfs(L) {
  //베열이 만들어질 수 있는 모든 경우의 수를 따져보는 함수
  for (let i = 0; i < N; i++) {
    if (L === N) {
      max = Math.max(max, cal(newArr)); //계산한 값이 제일 큰 것을 max로
    } else {
      if (!check[i]) {
        check[i] = true;
        newArr.push(input[i]);
        dfs(L + 1);
        check[i] = false;
        newArr.pop();
      }
    }
  }
}
dfs(0);
console.log(max);

// 출처
// https://fordang.tistory.com/16
