module.exports = {
  /** @argument input {string} */
  first(input) {
    const [line] = input.trim().split('\n');
    const max = 2020;

    let values = line.split(',').map((x) => Number.parseInt(x));

    while (values.length < max) {
      const lastValue = last(values);

      if (count(lastValue, values) === 1) {
        values.push(0);
      } else {
        const lastIndex = values.lastIndexOf(lastValue) + 1;
        const previousIndex =
          values.slice(0, lastIndex - 1).lastIndexOf(lastValue) + 1;

        values.push(lastIndex - previousIndex);
      }
    }

    return last(values);
  },

  /** @argument input {string} */
  second(input) {
    const [line] = input.trim().split('\n');
    const numbers = line.split(',').map((x) => Number.parseInt(x));

    const initialCount = numbers.length;
    const max = 30000000;

    /** @type {Map<number, {count: number, indexes: Array<number>}>} */
    let values = new Map(
      numbers.map((x, i) => [x, { count: 1, indexes: [i] }])
    );
    let lastValue = last(numbers);

    for (let i = initialCount; i < max; ++i) {
      if (values.get(lastValue).count === 1) {
        if (values.has(0)) {
          let props = values.get(0);
          ++props.count;
          props.indexes.push(i);

          values.set(0, props);
        } else {
          values.set(0, { count: 1, indexes: [i] });
        }

        lastValue = 0;
      } else {
        let props = values.get(lastValue);

        const lastIndex = last(props.indexes) + 1;
        const previousIndex = props.indexes[props.indexes.length - 2] + 1;

        const newValue = lastIndex - previousIndex;

        if (values.has(newValue)) {
          let props = values.get(newValue);
          ++props.count;
          props.indexes.push(i);

          values.set(newValue, props);
        } else {
          values.set(newValue, { count: 1, indexes: [i] });
        }

        lastValue = newValue;
      }
    }

    return lastValue;
  },
};

/**
 * @param {Array<number>} list
 * @returns {number}
 */
function last(list) {
  return list[list.length - 1];
}

/**
 * @param {number} value
 * @param {Array<number>} list
 * @returns {number}
 */
function count(value, list) {
  return list.filter((x) => x === value).length;
}
