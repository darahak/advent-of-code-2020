module.exports = {
  /** @argument input {string} */
  first(input) {
    const numbers = input
      .trim()
      .split('\n')
      .map((number) => Number.parseInt(number));

    const deviceJoltage = Math.max(...numbers) + 3;

    let list1 = [];
    let list3 = [];
    let rating = 0;

    while (rating < deviceJoltage) {
      const i1 = numbers.indexOf(rating + 1);

      if (i1 !== -1) {
        const value = numbers[i1];

        rating = value;
        list1.push(value);
      } else {
        const i2 = numbers.indexOf(rating + 2);

        if (i2 !== -1) {
          const value = numbers[i2];

          rating = value;
        } else {
          const i3 = numbers.indexOf(rating + 3);

          if (i3 !== -1) {
            const value = numbers[i3];

            rating = value;
            list3.push(value);
          } else {
            break;
          }
        }
      }
    }

    list3.push(deviceJoltage);

    return list1.length * list3.length;
  },

  /** @argument input {string} */
  second(input) {
    const numbers = input
      .trim()
      .split('\n')
      .map((number) => Number.parseInt(number));

    const sortedNumbers = [
      0,
      ...numbers.sort((a, b) => a - b),
      Math.max(...numbers) + 3,
    ];

    /** @type {Map<string, number>} */
    let results = new Map();

    return countCombinations(sortedNumbers, results);
  },
};

/**
 * @param {Array<number>} sortedNumbers
 * @param {Map<string, number>} results
 * @returns {number}
 */
function countCombinations(sortedNumbers, results) {
  const id = sortedNumbers.join();

  if (results.has(id)) {
    return results.get(id);
  }

  let result = 1;

  for (let i = 1; i < sortedNumbers.length - 1; ++i) {
    const previous = sortedNumbers[i - 1];
    const next = sortedNumbers[i + 1];

    if (next - previous < 4) {
      result += countCombinations(
        [previous, ...sortedNumbers.slice(i + 1)],
        results
      );
    }
  }

  results.set(id, result);

  return result;
}
