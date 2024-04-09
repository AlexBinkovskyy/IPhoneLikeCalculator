const first = document.querySelector(".screen .first");
const third = document.querySelector(".screen .third");
document.querySelector(".ac").onclick = clearAll;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const actions = ["-", "+", "x", "/"];
let percent = false;
let plusMinus = false;
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

document.querySelector(".buttons").addEventListener("click", (event) => {
  if (
    !event.target.classList.contains("btn") ||
    event.target.classList.contains("ac")
  )
    return;

  const key = event.target.textContent;
  if (key === "AC") {
    return clearAll();
  }

  if (event.target.classList.contains("percent")) return (percent = true);

  if (event.target.classList.contains("plusMinus")) {
    if (sign && secondNum !== "") {
      secondNum = (parseFloat(secondNum) * -1).toString();
      first.textContent = `${firstNum}${sign}${secondNum}`;
    } else if (firstNum !== "") {
      firstNum = (parseFloat(firstNum) * -1).toString();
      first.textContent = firstNum;
    }
    return;
  }

  if (actions.includes(key)) {
    if (!firstNum) return;
    if (finish) {
      secondNum = "";
      sign = key === "x" ? "*" : key;
      first.textContent = `${firstNum}${sign}${secondNum}`;
      finish = false;
      return;
    }
    sign = key === "x" ? "*" : key;
    first.textContent = `${firstNum}${sign}${secondNum}`;
    return;
  }

  if (digit.includes(key) && !sign) {
    if (key === "0" && firstNum[0] === "0" && firstNum.length <=2) return;
    if (key === "." && firstNum.includes(".")) {
      return;
    } else if (key === "." && firstNum === "") {
      firstNum = "0.";
      first.textContent = firstNum;
      return;
    }
    firstNum += key;
    first.textContent = firstNum;
    return;
  }

  if (digit.includes(key) && sign) {
    if (key === "." && secondNum.includes(".")) {
      return;
    } else if (key === "." && secondNum === "") {
      secondNum = "0.";
      first.textContent = `${firstNum}${sign}${secondNum}`;
      return;
    }
    if (finish) {
      firstNum = "";
      firstNum = key;
      secondNum = "";
      sign = "";
      finish = false;
      first.textContent = `${firstNum}${sign}${secondNum}`;
      return;
    }
    secondNum += key;
    first.textContent = `${firstNum}${sign}${secondNum}`;
    return;
  }

  if (key === "=") {
    if (
      Number.isInteger(Number(firstNum)) &&
      Number.isInteger(Number(secondNum))
    ) {
      firstNum = eval(first.textContent);
      Number.isInteger(Number(firstNum))
        ? firstNum
        : (firstNum = Number(firstNum).toFixed(6));
    } else {
      const firstStrLength = firstNum.includes(".")
        ? firstNum.split(".")[1].length
        : 0;
      const secondStrLength = secondNum.includes(".")
        ? secondNum.split(".")[1].length
        : 0;
      const result = eval(first.textContent);
      const maxLength = Math.max(firstStrLength, secondStrLength);
      firstNum = result.toFixed(maxLength);
      if (firstNum.includes(".")) {
        firstNum = firstNum.replace(/\.?0*$/, "");
      }
    }
    finish = true;
    return (third.textContent = firstNum);
  }
});
