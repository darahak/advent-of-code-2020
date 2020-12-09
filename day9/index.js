module.exports = {
  /** @argument input {string} */
  first(input) {
    const numbers = input
      .trim()
      .split('\n')
      .map((number) => Number.parseInt(number));

    return findInvalidNumber(numbers);
  },

  /** @argument input {string} */
  second(input) {
    const numbers = input
      .trim()
      .split('\n')
      .map((number) => Number.parseInt(number));
    const invalidNumber = findInvalidNumber(numbers);

    for (let i = 0; i < numbers.length; ++i) {
      for (let j = i + 2; j < numbers.length; ++j) {
        const range = numbers.slice(i, j);
        const sum = range.reduce((acc, value) => acc + value, 0);

        if (sum === invalidNumber) {
          return Math.min(...range) + Math.max(...range);
        }
      }
    }

    return -1;
  },
};

/**
 * @param {number} number
 * @param {Array<number>} preamble
 * @returns {boolean}
 */
function isValid(number, preamble) {
  for (let i = 0; i < preamble.length; ++i) {
    for (let j = i + 1; j < preamble.length; ++j) {
      if (preamble[i] + preamble[j] === number) {
        return true;
      }
    }
  }

  return false;
}

/**
 * @param {Array<number>} numbers
 * @returns {number}
 */
function findInvalidNumber(numbers) {
  // Clone to avoid mutating original array outside of the function.
  numbers = [...numbers];

  let preamble = numbers.splice(0, 25);
  let head = numbers.shift();

  while (isValid(head, preamble)) {
    preamble.shift();
    preamble.push(head);

    head = numbers.shift();
  }

  return head;
}
