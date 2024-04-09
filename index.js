const screen = document.querySelector('.screen p');
const screenText = document.querySelector('p')
document.querySelector(".ac").onclick = clearAll;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const actions = ["-", "+", "x", "/"];
let firstNum = "";
let secondNum = "";
let totall = "";
let sign = "";
let finish = false;

function clearAll() {
  firstNum = "";
  secondNum = "";
  totall = "";
  sign = "";
  finish = false;
  screen.textContent = 0;
}

function resizeFont () {
  if (screenText.textContent.length >= 7) {
    screenText.style.fontSize= "2rem";
    screenText.style.height= "auto";
    screenText.style.width= "100%";
    screenText.style.alignContent= "end";
    screenText.style.margin= "0 0 20px 0";
    // screenText.style.textAlign= "end";
    // screenText.style.textWrap= "wrap";

  }
}

document.querySelector(".buttons").onclick = (event) => {
  resizeFont ()
  if (
    !event.target.classList.contains("btn") ||
    event.target.classList.contains("ac")
  )
    return;

  const key = event.target.textContent;

  if (digit.includes(key) && !sign) {
    firstNum += key;
    screen.textContent = firstNum;
    console.log(firstNum, sign, secondNum);
  }

  if (actions.includes(key) && firstNum) {
    sign = key;
    sign === 'x' ? (screen.textContent = "*") : (screen.textContent = key);
    console.log(firstNum, sign, secondNum);
    return;
  }

  if (sign && !event.target.classList.contains("equal")) {
    secondNum += key;
    screen.textContent = secondNum;
    console.log(firstNum, sign, secondNum);
  }

  if (event.target.classList.contains("equal") && firstNum) {
    switch (sign) {
      case "+":
        totall = +firstNum + +secondNum;
        break;
      case "-":
        totall = firstNum - secondNum;
        break;
      case "x":
        totall = firstNum * secondNum;
        break;
      case "/":
        totall = firstNum / secondNum;
        break;
    }
    screen.textContent = (+totall)
    finish = !finish;
    console.log(firstNum, sign, secondNum, totall);
  }
};
