let firstNum = "";
let secondNum = "";
let sign = "";
let finish = false;

const screen = document.querySelector(".calc p");
const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const actions = ["-", "+", "x", "/"];

function clearAll() {
  firstNum = "";
  secondNum = "";
  sign = "";
  finish = false;
  screen.textContent = 0;
}

document.querySelector(".ac").onclick = clearAll;
document.querySelector(".buttons").onclick = (event) => {
  
  if (
    !event.target.classList.contains("btn") ||
    event.target.classList.contains("ac")
  )
    return;
  const key = event.target.textContent;

  if (digit.includes(key) && !sign) {
    firstNum += key;
    screen.textContent = firstNum
    console.log(firstNum, sign, secondNum, );
  }

  if(actions.includes(key)){
    sign = key;
    screen.textContent = key
    console.log(firstNum, sign, secondNum, );
    return
  }

  if(sign && !event.target.classList.contains('equal')){
    secondNum += key
    screen.textContent = secondNum
    console.log(firstNum, sign, secondNum, );
  }

  if(event.target.classList.contains("equal")){
    finish = !finish
    console.log(finish);
  }

};
