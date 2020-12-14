module.exports = {
  /** @argument input {string} */
  first(input) {
    const lines = input.trim().split('\n');

    let mask = '';
    /** @type {Map<number, number>} */
    let memory = new Map();

    lines.forEach((line) => {
      if (line.startsWith('mask')) {
        mask = getMask(line);
      } else if (line.startsWith('mem')) {
        const { index, value } = getMem(line);
        const bin = toBinaryString(value).split('');

        for (let i = 0; i < bin.length; ++i) {
          if (mask[i] !== 'X') {
            bin[i] = mask[i];
          }
        }

        memory.set(index, Number.parseInt(bin.join(''), 2));
      }
    });

    let sum = 0;

    memory.forEach((value) => {
      sum += value;
    });

    return sum;
  },

  /** @argument input {string} */
  second(input) {
    const lines = input.trim().split('\n');
  },
};

/**
 * @param {string} line
 * @returns {string}
 */
function getMask(line) {
  const re = /mask\s=\s(?<mask>\w{36})/g;
  const match = re.exec(line);

  return match.groups.mask;
}

/**
 * @param {string} line
 * @returns {{index: number, value: number}}
 */
function getMem(line) {
  const re = /mem\[(?<index>\d+)\]\s=\s(?<value>\d+)/g;
  const match = re.exec(line);

  const { index, value } = match.groups;

  return { index: Number.parseInt(index), value: Number.parseInt(value) };
}

/**
 * @param {number} value
 * @returns {string}
 */
function toBinaryString(value) {
  return value.toString(2).padStart(36, '0');
}
