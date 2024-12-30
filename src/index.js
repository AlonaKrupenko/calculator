import './styles.css';
import { calculate } from './helpers/basicOperandsCalculation';
import { normalize } from './helpers/normalize';
import {
  transformCommaToDot,
  transformDotToComma,
  roundToFourDecimals,
  percentToDecimal,
  joinUpdatedArray,
  trimTrailingZeros,
} from './helpers/helpers';

let displayValue = document.querySelector('.displayValue');
let inputHistory = document.querySelector('.inputHistory');

let buttons = document.querySelectorAll('button');

let currentInput = '';
let realTimeScreenValue = [];

const button = document.querySelector('[data-theme-toggle]');

button.addEventListener('click', () => {
  const currentTheme = document.querySelector('html').getAttribute('data-theme');
  const newTheme = currentTheme === 'orange' ? 'green' : 'orange';
  document.querySelector('html').setAttribute('data-theme', newTheme);
});

const updateDisplay = () => {
  displayValue.innerHTML = realTimeScreenValue.join('') + currentInput || '0';
};

const commitCurrentInput = () => {
  if (currentInput) {
    currentInput = trimTrailingZeros(currentInput);

    if (currentInput.startsWith('(-') && !currentInput.includes(')')) {
      realTimeScreenValue.push(currentInput + ')');
    } else {
      realTimeScreenValue.push(currentInput);
    }

    currentInput = '';
  }
};

const invertLastNumber = () => {
  if (currentInput) {
    if (currentInput.startsWith('(-')) {
      if (currentInput.endsWith(')')) {
        currentInput = currentInput.slice(2, -1);
      } else if (!currentInput.includes(')')) {
        currentInput = currentInput.slice(2);
      }
    } else {
      currentInput = `(-${currentInput})`;
    }
  } else {
    alert('The last element is symbol, not possible to invert');
    return;
  }

  updateDisplay();
};

const handleComma = () => {
  if (currentInput) {
    if (currentInput.endsWith('%') || currentInput.endsWith(')')) {
      alert("Cannot add comma after '%' or ')'.");
      return;
    }

    if (!currentInput.includes(',')) {
      currentInput = `${currentInput},`;
    } else if (currentInput.endsWith(',')) {
      currentInput;
    } else {
      alert('Too many commas');
      return;
    }
  } else {
    currentInput = '0,';
  }

  updateDisplay();
};

const handlePercentage = () => {
  if (!currentInput || currentInput === '0,' || currentInput === '0') {
    alert("You cannot add '%' without a number.");
    return;
  }

  if (!currentInput.includes('%')) {
    currentInput += '%';
    updateDisplay();
  } else {
    alert('The percentage sign is already added.');
    return;
  }
};

const handleErase = () => {
  if (currentInput) {
    currentInput = currentInput.slice(0, -1);
  } else if (realTimeScreenValue.length > 0) {
    const lastElement = realTimeScreenValue.pop();
    currentInput = realTimeScreenValue.pop();

    if (lastElement.length > 1) {
      realTimeScreenValue.push(lastElement.slice(0, -1));
    }
  }

  updateDisplay();
};

const handleCalculate = () => {
  commitCurrentInput();

  if (realTimeScreenValue.length === 0) {
    alert('You need to input something before calculation');
    return;
  }

  if (['+', '-', '*', '/'].includes(realTimeScreenValue[realTimeScreenValue.length - 1])) {
    alert('There is no second operand');
    return;
  }

  let transformedInput = realTimeScreenValue.map((item) => {
    if (item.includes(',')) {
      return transformCommaToDot(item);
    }
    return item;
  });

  let calculationResult = transformDotToComma(roundToFourDecimals(evaluate(transformedInput)));

  displayValue.innerHTML = calculationResult;
  inputHistory.innerHTML = realTimeScreenValue.join('');

  currentInput = calculationResult;
  realTimeScreenValue = [];
};

const evaluate = (expression) => {
  function parse(inputElements) {
    if (inputElements.length === 1) {
      if (inputElements[0].toString().includes('%') && inputElements[0].startsWith('(-')) {
        return +normalize(inputElements[0]).slice(0, -1) / 100;
      } else if (inputElements[0].toString().includes('%')) {
        return +inputElements[0].slice(0, -1) / 100;
      } else {
        return +inputElements[0];
      }
    }

    for (let i = 1; i < inputElements.length; i++) {
      let leftOperand = normalize(inputElements[i - 1]);
      let rightOperand = normalize(inputElements[i + 1]);

      if (inputElements[i] === '*' || inputElements[i] === '/') {
        leftOperand = percentToDecimal(leftOperand);
        rightOperand = percentToDecimal(rightOperand);

        const result = calculate(leftOperand, rightOperand, inputElements[i]);
        return parse(joinUpdatedArray(inputElements, i, result));
      }
    }

    for (let i = 1; i < inputElements.length; i++) {
      let leftOperand = normalize(inputElements[i - 1]);
      let rightOperand = normalize(inputElements[i + 1]);

      if (inputElements[i] === '+' || inputElements[i] === '-') {
        leftOperand = percentToDecimal(leftOperand);

        if (rightOperand.toString().includes('%')) {
          rightOperand = (leftOperand * +rightOperand.slice(0, -1)) / 100;
        }

        let result = calculate(+leftOperand, +rightOperand, inputElements[i]);
        return parse(joinUpdatedArray(inputElements, i, result));
      }
    }
  }

  return parse(expression);
};

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('figure_btn')) {
      if (currentInput.endsWith('%') || currentInput.endsWith(')')) {
        alert("Cannot add numbers after '%' or')'.");
        return;
      }

      currentInput += btn.value;

      if (/^0[0-9]/.test(currentInput)) {
        currentInput = currentInput.replace(/^0+/, '0');
      }

      updateDisplay();
    }

    if (btn.classList.contains('basic_operator')) {
      commitCurrentInput();

      if (realTimeScreenValue.length === 0 && currentInput === '') {
        alert('Please enter a number first.');
        return;
      }

      if (
        realTimeScreenValue.length > 0 &&
        ['+', '-', '*', '/'].includes(realTimeScreenValue[realTimeScreenValue.length - 1])
      ) {
        realTimeScreenValue[realTimeScreenValue.length - 1] = btn.value;
      } else {
        commitCurrentInput();
        realTimeScreenValue.push(btn.value);
      }

      updateDisplay();
    }

    if (btn.id === 'clear') {
      currentInput = '';
      realTimeScreenValue = [];
      updateDisplay();

      inputHistory.innerHTML = '';
    }

    if (btn.id === 'erase') {
      handleErase();
    }

    if (btn.id === 'invert') {
      invertLastNumber();
    }

    if (btn.id === 'comma') {
      handleComma();
    }

    if (btn.id === 'percent') {
      handlePercentage();
    }

    if (btn.id === 'calculate') {
      handleCalculate();
    }
  });
});
