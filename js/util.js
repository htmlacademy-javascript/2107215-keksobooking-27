export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max || min < 0 || max < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArbitrary(min, max, maxDigits = 0) {
  if (min > max || min < 0 || max < 0) {
    return NaN;
  }

  const digitsDegree = 10 ** maxDigits;
  return Math.floor((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}

export function getArray(features) {
  const maxLength = features.length - 1;
  const lengthOfArray = getRandomInt(1, maxLength);
  const array = [];

  for(let i = 0; i < lengthOfArray; i++) {
    const indexOfEl = getRandomInt(0, maxLength);
    const el = features[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
}

export const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];
