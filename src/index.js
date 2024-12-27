import './styles.css';

// let inputHistory = document.querySelector('.inputHistory');
// let calculateBtn = document.querySelector('#calculate');

let displayValue = document.querySelector('.displayValue');

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
    }

    if (btn.id === 'erase') {
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
  });
});
