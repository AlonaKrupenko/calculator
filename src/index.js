import './styles.css';

let displayValue = document.querySelector('.displayValue');
let inputHistory = document.querySelector('.inputHistory');

let buttons = document.querySelectorAll('button');

let currentInput = '';
let realTimeScreenValue = [];

//HELPER
const updateDisplay = () => {
  displayValue.innerHTML = realTimeScreenValue.join('') + currentInput || '0';
};

//HELPER
const commitCurrentInput = () => {
  if (currentInput) {
    currentInput = trimTrailingZeros(currentInput); //! make it optional?
    realTimeScreenValue.push(currentInput);
    currentInput = '';
  }
};

//HELPER
const trimTrailingZeros = (input) => {
  if (input.includes(',')) {
    const [integerPart, decimalPart] = input.split(',');
    const trimmedDecimal = decimalPart.replace(/0+$/, '');
    return trimmedDecimal ? `${integerPart},${trimmedDecimal}` : integerPart;
  }

  return input;
};

//! Helper function: Invert the last number
//HELPER
const invertLastNumber = () => {
  if (currentInput) {
    if (currentInput.startsWith('(-') && currentInput.endsWith(')')) {
      currentInput = currentInput.slice(2, -1);
    } else {
      currentInput = `(-${currentInput})`;
    }
  } else {
    alert('The last element is symbol, not possible to invert');
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
  if (currentInput && !currentInput.includes('%')) {
    currentInput += '%';
    updateDisplay();
  } else if (!currentInput) {
    alert("You cannot add '%' without a number.");
  } else {
    alert('The percentage sign is already added.');
  }
};

const handleErase = () => {
  if (currentInput) {
    //!TO MAKE LIKE Iphone
    if (currentInput.startsWith('(-') && currentInput.endsWith(')')) {
      currentInput = '';
    } else {
      currentInput = currentInput.slice(0, -1);
    }
  } else if (realTimeScreenValue.length > 0) {
    const lastElement = realTimeScreenValue.pop();
    if (lastElement.startsWith('(-') && lastElement.endsWith(')')) {
      return;
    } else if (lastElement.length > 1) {
      realTimeScreenValue.push(lastElement.slice(0, -1));
    }
  }

  updateDisplay();
};

//Helper ',' => '.'
const transformCommaToDot = (input) => input.replace(',', '.');

//Helper '.' => ','
const transformDotToComma = (input) => {
  return input.toString().replace('.', ',');
};

const handleCalculate = () => {
  commitCurrentInput();

  if (realTimeScreenValue.length === 0) {
    alert('You need to input something before calculation');
    return;
  }

  let transformedInput = realTimeScreenValue.map((item) => {
    if (item.includes(',')) {
      return transformCommaToDot(item);
    }
    return item;
  });

  displayValue.innerHTML = transformDotToComma(evaluate(transformedInput)); //! updateDisplay function to use but need to update
  inputHistory.innerHTML = realTimeScreenValue.join('');

  console.log(transformedInput, transformDotToComma(evaluate(transformedInput)), 'higher level');

  realTimeScreenValue = [];
  currentInput = '';
};

const evaluate = (expression) => {
  const calculate = (leftOperand, rightOperand, operator) => {
    console.log(leftOperand, rightOperand, operator, 'calculate');
    if (operator === '+') return leftOperand + rightOperand;
    if (operator === '-') return leftOperand - rightOperand;
    if (operator === '*') return leftOperand * rightOperand;
    if (operator === '/') return rightOperand === 0 ? NaN : leftOperand / rightOperand;
  };

  const joinUpdatedArray = (inputElements, i, result) => {
    return inputElements.slice(0, i - 1).concat(result, inputElements.slice(i + 2));
  };

  const normalize = (value) => {
    if (!value.toString().startsWith('(-')) {
      return value;
    }
    return parseFloat(value.slice(1, -1));
  };

  function parse(inputElements) {
    if (inputElements.length === 1) {
      if (inputElements[0].toString().includes('%')) {
        return +inputElements[0].slice(0, -1) / 100;
      }

      return +inputElements[0];
    }

    for (let i = 0; i < inputElements.length; i++) {
      const leftOperand = inputElements[i - 1];
      const rightOperand = inputElements[i + 1];

      if (inputElements[i] === '*' || inputElements[i] === '/') {
        if (leftOperand.toString().includes('%') && rightOperand.toString().includes('%')) {
          const result = calculate(+leftOperand.slice(0, -1) / 100, +rightOperand.slice(0, -1) / 100, inputElements[i]);
          return parse(joinUpdatedArray(inputElements, i, result));
        } else if (leftOperand.toString().includes('%')) {
          const result = calculate(+leftOperand.slice(0, -1) / 100, +rightOperand, inputElements[i]);
          return parse(joinUpdatedArray(inputElements, i, result));
        } else if (rightOperand.toString().includes('%')) {
          //!different
          console.log(rightOperand, +rightOperand.slice(0, -1) / 100, 'check');
          const result = calculate(+leftOperand, +rightOperand.slice(0, -1) / 100, inputElements[i]);
          return parse(joinUpdatedArray(inputElements, i, result));
        } else if (leftOperand.toString().includes('(-') || rightOperand.toString().includes('(-')) {
          const result = calculate(+normalize(leftOperand), +normalize(rightOperand), inputElements[i]);
          return parse(joinUpdatedArray(inputElements, i, result));
        } else {
          const result = calculate(+leftOperand, +rightOperand, inputElements[i]);
          return parse(joinUpdatedArray(inputElements, i, result));
        }
      }
    }

    for (let i = 0; i < inputElements.length; i++) {
      const leftOperand = inputElements[i - 1];
      const rightOperand = inputElements[i + 1];

      if (inputElements[i] === '+' || inputElements[i] === '-') {
        if (leftOperand.toString().includes('%') && rightOperand.toString().includes('%')) {
          const result = calculate(+leftOperand.slice(0, -1) / 100, +rightOperand.slice(0, -1) / 100, inputElements[i]);
          return parse(joinUpdatedArray(inputElements, i, result));
        } else if (leftOperand.toString().includes('%')) {
          const result = calculate(+leftOperand.slice(0, -1) / 100, +rightOperand, inputElements[i]);
          return parse(joinUpdatedArray(inputElements, i, result));
        } else if (rightOperand.toString().includes('%')) {
          //!different
          const result = calculate(+leftOperand, (+leftOperand * +rightOperand.slice(0, -1)) / 100, inputElements[i]);
          return parse(joinUpdatedArray(inputElements, i, result));
        } else if (leftOperand.toString().includes('(-') || rightOperand.toString().includes('(-')) {
          const result = calculate(+normalize(leftOperand), +normalize(rightOperand), inputElements[i]);
          return parse(joinUpdatedArray(inputElements, i, result));
        } else {
          const result = calculate(+leftOperand, +rightOperand, inputElements[i]);
          return parse(joinUpdatedArray(inputElements, i, result));
        }
      }
    }
  }

  return parse(expression);
};

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    //? FIGURES handling
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

    //? BASIC OPERATORS handling (+,-,/,*)
    if (btn.classList.contains('basic_operator')) {
      commitCurrentInput();

      if (realTimeScreenValue.length === 0 && currentInput === '') {
        alert('Please enter a number first.');
        return;
      }

      if (
        //! To make some constant for operators
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

    //? CLEAR handling
    if (btn.id === 'clear') {
      currentInput = '';
      realTimeScreenValue = [];
      updateDisplay();

      //! maybe wrap this into func
      inputHistory.innerHTML = '';
    }

    if (btn.id === 'erase') {
      //!'Provides too much bugs'
      handleErase();
    }

    //? INVERT handling
    if (btn.id === 'invert') {
      invertLastNumber();
    }

    //? COMMA handling
    if (btn.id === 'comma') {
      handleComma();
    }

    //?PERCENT handling
    if (btn.id === 'percent') {
      handlePercentage();
    }

    if (btn.id === 'calculate') {
      handleCalculate();
    }
  });
});
