export const transformCommaToDot = (input) => input.replace(',', '.');
export const transformDotToComma = (input) => input.toString().replace('.', ',');

export const roundToFourDecimals = (number) => {
  const [integerPart, decimalPart] = number.toString().split('.');

  if (!decimalPart || decimalPart.length <= 4) {
    return number;
  }

  const truncatedDecimal = decimalPart.slice(0, 4);
  return +`${integerPart}.${truncatedDecimal}`;
};

export const percentToDecimal = (string) => {
  if (string.toString().endsWith('%')) {
    return +string.slice(0, -1) / 100;
  } else {
    return +string;
  }
};

export const joinUpdatedArray = (inputElements, i, result) => {
  return inputElements.slice(0, i - 1).concat(result, inputElements.slice(i + 2));
};

export const trimTrailingZeros = (input) => {
  if (input.includes(',')) {
    const [integerPart, decimalPart] = input.split(',');

    const trimmedDecimal = decimalPart.replace(/0+$/, '');
    return trimmedDecimal ? `${integerPart},${trimmedDecimal}` : integerPart;
  }

  return input.replace(/^0+/, '') || '0';
};
