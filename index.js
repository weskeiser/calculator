// - NOTES -
//Numberpad does not work as intended.
//After calculating a result, the numberpad will still allow inputs without clearing the calculator

// Create number elements for calculator
const numsArray = [];
for (i = 0; i < 10; i++) {
  let newNum = document.createElement(`button`);
  newNum.setAttribute(`id`, `num${i}`);
  newNum.textContent = `${i}`;
  document.querySelector(`#nums`).append(newNum);
  numsArray.push(newNum);
}

const calcInput = document.querySelector(`#calcInput`);
const addBtn = document.querySelector(`#addBtn`);
const display = document.querySelector(`#display`);
const tempDisplay = document.querySelector(`#tempDisplay`);
const equalsBtn = document.querySelector(`#equals`);
const clear = document.querySelector(`#clear`);
const subBtn = document.querySelector(`#subBtn`);
const divBtn = document.querySelector(`#divBtn`);
const multiBtn = document.querySelector(`#multiBtn`);
const num1 = document.querySelector(`#num1`);
const calcFrame = document.querySelector(`#calcFrame`);

// Keeps calcInput in focus
focusMethod = function getFocus() {
  document.querySelector(`#calcInput`).focus();
};
focusMethod();

class Calculator {
  constructor() {
    this.calcInput = calcInput;
    this.addBtn = addBtn;
    this.equalsBtn = equalsBtn;
    this.clear = clear;
    this.subBtn = subBtn;
    this.divBtn = divBtn;
    this.num1 = num1;
    this.multiBtn = multiBtn;
    this.calcFrame = calcFrame;

    addBtn.addEventListener(`click`, this.addition);
    subBtn.addEventListener(`click`, this.subtraction);
    divBtn.addEventListener(`click`, this.division);
    equals.addEventListener(`click`, this.equals);
    clear.addEventListener(`click`, this.clearCalc);
    multiBtn.addEventListener(`click`, this.multiplication);
    equalsBtn.addEventListener(`click`, this.equals);

    calcInput.addEventListener(`keydown`, (e) => {
      if (e.key === `Enter`) {
        e.preventDefault();
        equals.click();
      }
      if (e.key === `+`) {
        e.preventDefault();
        addBtn.click();
      }
      if (e.key === `-`) {
        e.preventDefault();
        subBtn.click();
      }
      if (e.key === `/`) {
        e.preventDefault();
        divBtn.click();
      }
      if (e.key === `*`) {
        e.preventDefault();
        multiBtn.click();
      }
      if (e.key === `c`) {
        e.preventDefault();
        clear.click();
      }
      if (e.key === `C`) {
        e.preventDefault();
        clear.click();
      }
    });

    // Listens for clicks on the numberpad
    for (let i = 0; i < 10; i++) {
      numsArray[i].addEventListener(`click`, () => {
        this.calcInput.value += i;
        focusMethod();
      });
    }
  }

  // Feeds the `inputs` array with the value of the calculator input along with the operator used following it.
  // Updates visual displays
  feedArray = (operator) => {
    if (this.calcInput.value) {
      display.textContent = null;
      switch (operator) {
        case `add`:
          tempDisplay.textContent += this.calcInput.value + ` + `;
          inputs.push(this.calcInput.value);
          inputs.push(`+`);
          break;
        case `sub`:
          tempDisplay.textContent += this.calcInput.value + ` - `;
          inputs.push(this.calcInput.value);
          inputs.push(`-`);
          break;
        case `div`:
          tempDisplay.textContent += this.calcInput.value + ` / `;
          inputs.push(this.calcInput.value);
          inputs.push(`/`);
          break;
        case `multi`:
          tempDisplay.textContent += this.calcInput.value + ` * `;
          inputs.push(this.calcInput.value);
          inputs.push(`*`);
          break;
      }
      this.calcInput.value = null;
      focusMethod();
    }
  };

  // Method to calculate the final number.
  //
  equals = () => {
    let lastInput;
    // Feeds the number in the input to the array if applicable
    if (this.calcInput.value) {
      inputs.push(this.calcInput.value);
      lastInput = inputs.slice();
    } else {
      inputs.length -= 1;
    }

    // Turns the `inputs` array into the final result
    let resString = inputs.join(``);
    let result = eval(resString);
    display.textContent = result;
    tempDisplay.textContent =
      tempDisplay.textContent +
      lastInput[lastInput.length - 1] +
      ` = ` +
      result;

    // Clears the displays when a key is pressed after a calculation. Does not work for the numberpad
    const eventHandler = (e) => {
      tempDisplay.textContent = null;
      display.textContent = null;
      this.calcInput.removeEventListener(`input`, eventHandler, false);
    };
    this.calcInput.addEventListener(`input`, eventHandler);

    // Clears inputs and results after a calculation
    inputs = [];
    result = 0;
    this.calcInput.value = null;
    focusMethod();
  };

  // Calculator functions
  addition = () => {
    if (!calcInput.value) return;
    this.feedArray(`add`);
  };

  subtraction = () => {
    if (!calcInput.value) return;
    this.feedArray(`sub`);
  };

  division = () => {
    if (!calcInput.value) return;
    this.feedArray(`div`);
  };

  multiplication = () => {
    if (!calcInput.value) return;
    this.feedArray(`multi`);
  };

  clearCalc = () => {
    inputs = [];
    result = [];
    this.calcInput.value = null;
    display.textContent = null;
    tempDisplay.textContent = null;
  };
}

let result = 0;
let inputs = [];
const calculator = new Calculator();
