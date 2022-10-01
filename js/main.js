function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max || min < 0 || max < 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomInt(7, 9));

function getRandomArbitrary(min, max, maxDigits = 0) {
  if (min > max || min < 0 || max < 0) {
    return ('Задан неверный диапазон! Укажите другие числа.');
  }

  const digitsDegree = 10 ** maxDigits;
  return ~~((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}
console.log(getRandomArbitrary(1, 2, 6));
