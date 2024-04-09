const screen = document.querySelector(".screen p");
const screenText = document.querySelector("p");
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

  if (
    firstNum &&
    secondNum &&
    finish &&
    !event.target.classList.contains("equal") &&
    !actions.includes(key)
  ) {
    secondNum = "";
    finish= false
  }

  if (digit.includes(key) && !sign && !finish) {
    firstNum += +key;
    screen.textContent = firstNum;
    console.log(firstNum, sign, secondNum);
  }

  if (actions.includes(key) && firstNum) {
    sign = key;
    sign === "x"
      ? (screen.textContent = "*")
      : (screen.textContent = firstNum, `${sign}`);
    console.log(firstNum, sign, secondNum);
    return;
  }

  if (sign && !event.target.classList.contains("equal")) {
    finish = false;
    secondNum += +key;
    screen.textContent = `${firstNum} ${sign} ${secondNum}`;
    console.log(firstNum, sign, secondNum);
  }

  if (event.target.classList.contains("equal") && firstNum) {
    if (secondNum === "0" || Number(secondNum) === 0) {
      clearAll();
      return (screen.textContent = "Ділення на 0!!!");
    }
    if (!secondNum) {
      secondNum = +firstNum;
    }
    switch (sign) {
      case "+":
        firstNum = Number(+firstNum + +secondNum);
        break;
      case "-":
        firstNum = +firstNum - +secondNum;
        break;
      case "x":
        firstNum = +firstNum * +secondNum;
        break;
      case "/":
        firstNum = +firstNum / +secondNum;
        break;
    }
    screen.textContent = +firstNum;
    finish = true;
    console.log(firstNum, sign, +secondNum, finish);
  }
};
