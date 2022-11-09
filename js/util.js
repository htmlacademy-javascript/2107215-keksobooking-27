const getSentenceWithCount = (num, [form1, form2 = form1, form3 = form2]) => {
  const lastDigit = num % 10;

  if ((num % 100) - lastDigit === 10 || lastDigit >= 5) {
    return form3;
  }

  if (lastDigit === 1) {
    return form1;
  }

  return form2;
};

const createSentenceWithCount = (num, forms) => `${num} ${getSentenceWithCount(num, forms)}`;

export {createSentenceWithCount};
