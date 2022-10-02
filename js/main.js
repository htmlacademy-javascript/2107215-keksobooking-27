function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max || min < 0 || max < 0) {
    return NaN
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(2, 6);

function getRandomArbitrary(min, max, maxDigits = 0) {
  if (min > max || min < 0 || max < 0) {
    return NaN
  }

  const digitsDegree = 10 ** maxDigits;
  return Math.floor((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}

getRandomArbitrary(2, 6, 7);
