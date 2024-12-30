export const normalize = (value) => {
  if (value || value === 0) {
    if (!value.toString().startsWith('(-')) {
      return value;
    }

    if (value.toString().endsWith(')')) {
      return value.slice(1, -1);
    } else if (value.toString().endsWith('%')) {
      return `${value.slice(1, -2)}%`;
    }

    return value;
  }
};
