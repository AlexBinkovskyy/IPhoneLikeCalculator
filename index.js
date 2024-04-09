// const screen = document.querySelector(".screen p");
// const screenText = document.querySelector("p");
document.querySelector(".ac").onclick = clearAll;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const actions = ["-", "+", "x", "/"];
const percent = false;
const plusMinus = false;
let firstNum = "";
let secondNum = "";
let sign = "";
let finish = false;

function clearAll() {
  firstNum = "";
  secondNum = "";
  sign = "";
  finish = false;
  screen.textContent = 0;
}


document.querySelector(".buttons").onclick = (event) => {
  if (
    !event.target.classList.contains("btn") ||
    event.target.classList.contains("ac")
  )
    return;

  const key = event.target.textContent;
  console.log(key);



};
