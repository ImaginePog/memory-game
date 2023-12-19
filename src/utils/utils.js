export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export function splitArrayToChunks(array, nChunks) {
  let result = [];
  for (let i = nChunks; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}
