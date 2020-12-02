module.exports = {
  /** @argument input {string} */
  first(input) {
    const entries = input
      .trim()
      .split('\n')
      .map((entry) => Number.parseInt(entry));

    for (let i = 0; i < entries.length; ++i) {
      for (let j = i + 1; j < entries.length; ++j) {
        if (entries[i] + entries[j] === 2020) {
          return entries[i] * entries[j];
        }
      }
    }

    return -1;
  },

  /** @argument input {string} */
  second(input) {
    const entries = input
      .trim()
      .split('\n')
      .map((entry) => Number.parseInt(entry));

    for (let i = 0; i < entries.length; ++i) {
      for (let j = i + 1; j < entries.length; ++j) {
        for (let k = j + 1; k < entries.length; ++k) {
          if (entries[i] + entries[j] + entries[k] === 2020) {
            return entries[i] * entries[j] * entries[k];
          }
        }
      }
    }

    return -1;
  },
};
