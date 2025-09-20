let display = document.getElementById("display");
let currentInput = "0";

// update display
function updateDisplay() {
  display.innerText = currentInput;
}

function appendNumber(number) {
  if (currentInput === "0") {
    currentInput = number.toString();
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// operators (+, -, ×, ÷, %, .)
function appendOperator(operator) {
  currentInput += operator;
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  updateDisplay();
}

// evaluate result
function calculateResult() {
  try {
    // replace symbols with JS operators
    let expression = currentInput
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/%/g, "*0.01")
      .replace(/−/g, "-");

    currentInput = eval(expression).toString();
  } catch {
    currentInput = "Error";
  }
  updateDisplay();
}

// button clicks
document.querySelectorAll(".number").forEach(btn => {
  btn.addEventListener("click", () => appendNumber(btn.innerText));
});

document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => appendOperator(btn.innerText));
});

document.querySelector(".clear").addEventListener("click", clearDisplay);
document.querySelector(".equal").addEventListener("click", calculateResult);

// keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    appendNumber(key); // numbers
  } else if (["+", "-", "*", "/", "%", "."].includes(key)) {
    appendOperator(key); // operators
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult(); // result
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1) || "0";
    updateDisplay();
  } else if (key.toLowerCase() === "c") {
    clearDisplay(); // press "c" to clear
  }
});