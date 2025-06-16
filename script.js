// theme toggle
const theme = document.querySelector(".themes__toggle");

const themeMode = () => theme.classList.toggle("themes__toggle--isActive");
const tabTheme = (e) => e.key === "Enter" && themeMode();

theme.addEventListener("keydown", tabTheme);
theme.addEventListener("click", themeMode);

// logic
let currentValue = "";
let storedValue = "";
let operator = "";

const resultElement = document.querySelector(".calc__result");
const keyEle = document.querySelectorAll("[data-type]");

const updateResult = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numberButtons = (value) => {
  if (value === "." && currentValue.includes(".")) return;
  if (value === "0" && !currentValue) return;
  currentValue += value;
  updateResult(currentValue);
};
const resetButton = () => {
  currentValue = "";
  storedValue = "";
  operator = "";
  updateResult(currentValue);
  document.querySelector('[data-value="c"]').blur(); // commit solve problem reset 
};
const deleteButton = () => {
  if (!currentValue || currentValue === "0") return;
  if (currentValue.length === 1) {
    currentValue = "";
  } else {
    currentValue = currentValue.substring(0, currentValue.length - 1);
  }
  updateResult(currentValue);
};
oprationButtonHandler = (value) => {
  if (!currentValue && !storedValue) return;
  if (currentValue && !storedValue) {
    storedValue = currentValue;
    currentValue = "";
    operator = value;
  } else if (storedValue) {
    operator = value;
    if (currentValue) excuteOperation();
  }
};
excuteOperation = () => {
  if (currentValue && storedValue && operator) {
    switch (operator) {
      case "+":
        storedValue = parseFloat(storedValue) + parseFloat(currentValue);
        break;
      case "-":
        storedValue = parseFloat(storedValue) - parseFloat(currentValue);
        break;
      case "*":
        storedValue = parseFloat(storedValue) * parseFloat(currentValue);
        break;
      case "/":
        storedValue = parseFloat(storedValue) / parseFloat(currentValue);
        break;
    }
    currentValue = "";
    updateResult(storedValue);
  }
};
const keyHandler = (ele) => {
  ele.addEventListener("click", () => {
    const type = ele.dataset.type;
    const value = ele.dataset.value;

    if (type === "number") {
      numberButtons(value);
    } else if (type === "operation") {
      switch (value) {
        case "c":
          resetButton();
          break;
        case "Backspace":
          deleteButton();
          break;
        case "Enter":
          excuteOperation();
          break;
        default:
          oprationButtonHandler(value);
      }
    }
  });
};
keyEle.forEach(keyHandler);

// user keyboard
const availableKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const operationKeys = ["+", "-", "*", "/"];
const availableKeysWithOperation = [
  ...availableKeys,
  ...operationKeys,
  "Backspace",
  "Enter",
  "c",
];
const keyboardwithouthaver = (key) => {
  if (availableKeys.includes(key)) {
    numberButtons(key);
  } else if (operationKeys.includes(key)) {
    oprationButtonHandler(key);
  } else if (key === "Backspace") {
    deleteButton();
  } else if (key === "Enter") {
    excuteOperation();
  } else if (key === "c") {
    resetButton();
  }
};
const keyboardwithhaver = (key) => {
  if (availableKeysWithOperation.includes(key)) {
    const ele = document.querySelector(`[data-value="${key}"]`);
    ele.classList.add("hover");
    ele.click();
    setTimeout(() => ele.classList.remove("hover"), 100);
  }
};
window.addEventListener("keydown", (e) => {
  //keyboardwithouthaver(e.key);
  keyboardwithhaver(e.key);
});
