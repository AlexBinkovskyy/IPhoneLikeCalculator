import { checkIsButton, checkOnlyDigits } from "./helpers.js";

const first = document.querySelector(".screen .first");
const third = document.querySelector(".screen .third");
document.querySelector(".ac").onclick = clearAll;
const buttons = document.querySelector(".buttons");

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const actions = ["-", "+", "x", "/", "*"];
let firstNum = "";
let secondNum = "";
let sign = "";
let finish = false;

function clearAll() {
  firstNum = "";
  first.textContent = "0";
  secondNum = "";
  sign = "";
  third.textContent = "";
  finish = false;
  screen.textContent = 0;
}

const backSpace = (someNum) => {
  if (!someNum) return;
  let temp = someNum.slice(0, someNum.length - 1);
  return (temp = temp.length >= 1 ? temp : "0");
};

const displayTextContens = () => {
  first.textContent = `${firstNum}${sign}${secondNum}`;
};

const handleKeyboard = (event) => {
  let key = event.key;

  if (
    !digit.includes(key) &&
    !actions.includes(key) &&
    key !== "Enter" &&
    key !== "Escape" &&
    key !== "Backspace"
  )
    return;
  if (key === "Backspace" && finish) return;
  if (digit.includes(key) || key === "Backspace") {
    if (!secondNum) digitPressFirst(key);
    digitPressSecond(key);
    return;
  } else if (actions.includes(key)) {
    actionsPress(key);
    return;
  } else if (key === "Enter") {
    countEqual(key);
    return;
  } else if (key === "Escape") {
    clearAll();
  }
};
document.addEventListener("keydown", handleKeyboard);

const actionsPress = (key) => {
  if (actions.includes(key)) {
    if (!firstNum) return;
    if (firstNum && secondNum && sign) {
      countEqual("=");
    }
    if (finish) {
      secondNum = "";
      sign = key === "x" ? "*" : key;
      displayTextContens();
      finish = false;
      return;
    }
    sign = key === "x" ? "*" : key;
    displayTextContens();
    return;
  }
};

const digitPressFirst = (key) => {
  if ((digit.includes(key) && !sign) || key === "Backspace") {
    if (key === "0" && firstNum[0] === "0" && firstNum.length <= 1) return;
    if (key === "." && firstNum.includes(".")) return;
    else if (key === "." && firstNum === "") {
      firstNum = "0.";
      displayTextContens();
      return;
    } else if (key !== "Backspace") {
      firstNum += key;
      displayTextContens();
    } else if (key === "Backspace") {
      firstNum = backSpace(firstNum);
      displayTextContens();
    }
    return;
  }
};

const digitPressSecond = (key) => {
  if ((digit.includes(key) || key === "Backspace") && sign && firstNum) {
    if (key === "." && secondNum.includes(".")) return;
    if (key === "0" && secondNum[0] === "0" && secondNum.length <= 1) return;
    if (key === "." && secondNum === "") {
      secondNum = "0.";
      displayTextContens();
      return;
    }
    if (finish) {
      if (key === ".") {
        clearAll();
        firstNum = "0.";
        displayTextContens();
        return;
      }
      clearAll();
      firstNum += key;
      displayTextContens();
      return;
    } else if (key !== "Backspace") {
      secondNum += key;
      displayTextContens();
    } else {
      secondNum = backSpace(secondNum);
      displayTextContens();
    }
  }
};

const countEqual = (key) => {
  if (key === "=" || key === "Enter") {
    if (!secondNum && !sign) return;
    if (secondNum === "") {
      secondNum = firstNum;
      displayTextContens();
    }
    if (firstNum[0] === "0" && firstNum[1] !== ".") {
      firstNum = firstNum.slice(1);
      displayTextContens();
    }
    if (secondNum[0] === "0" && secondNum[1] !== ".") {
      secondNum = secondNum.slice(1);
      displayTextContens();
    }
    if (firstNum[firstNum.length - 1] === ".") {
      firstNum = firstNum.slice(0, -1);
      displayTextContens();
    }
    if (firstNum && secondNum && sign && finish) {
      displayTextContens();
    }
    if ((secondNum === "0" || !Number(secondNum)) && sign === "/") {
      first.textContent = "Помилка!!! Ділення на нуль!";
      firstNum = "";
      secondNum = "";
      sign = "";
      return;
    }
    if (
      Number.isInteger(Number(firstNum)) &&
      Number.isInteger(Number(secondNum))
    ) {
      firstNum = eval(first.textContent);
    } else {
      const result = eval(first.textContent);
      firstNum = result;
      if (firstNum.toString().includes(".")) {
        firstNum = firstNum.toString().replace(/\.?0*$/, "");
      }
    }
    finish = true;
    return (third.textContent = firstNum);
  }

  if (firstNum && secondNum && sign && key === "%") {
    secondNum = ((firstNum * secondNum) / 100).toFixed(2);
    displayTextContens();
    return;
  }
};

const handleClick = (event) => {
  if (checkIsButton(event)) return;
  const key = event.target.textContent;

  if (key === "AC") {
    return clearAll();
  }

  if (event.target.classList.contains("plusMinus")) {
    if (sign && secondNum !== "") {
      secondNum = `(${(parseFloat(secondNum) * -1).toString()})`;
      displayTextContens();
    } else if (firstNum !== "") {
      firstNum = `(${(parseFloat(firstNum) * -1).toString()})`;
      first.textContent = firstNum;
    }
    return;
  }
  if (digit.includes(key)) {
    digitPressFirst(key);
    digitPressSecond(key);
    return;
  } else if (actions.includes(key)) {
    actionsPress(key);
    return;
  }
  countEqual(key);
};

buttons.addEventListener("click", handleClick);
