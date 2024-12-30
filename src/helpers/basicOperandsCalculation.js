import { normalize } from './normalize';

export const calculate = (leftOperand, rightOperand, operator) => {
  const preparedLeftOperand = normalize(leftOperand);
  const preparedRightOperand = normalize(rightOperand);

  if (operator === '+') return preparedLeftOperand + preparedRightOperand;
  if (operator === '-') return preparedLeftOperand - preparedRightOperand;
  if (operator === '*') return preparedLeftOperand * preparedRightOperand;
  if (operator === '/') return preparedRightOperand === 0 ? NaN : preparedLeftOperand / preparedRightOperand;
};
