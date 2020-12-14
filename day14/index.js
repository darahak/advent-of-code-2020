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

        const alteredBin = bin.join('');

        memory.set(index, Number.parseInt(alteredBin, 2));
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

    let mask = '';
    /** @type {Map<number, number>} */
    let memory = new Map();

    lines.forEach((line) => {
      if (line.startsWith('mask')) {
        mask = getMask(line);
      } else if (line.startsWith('mem')) {
        const { index, value } = getMem(line);
        const bin = toBinaryString(index).split('');

        for (let i = 0; i < bin.length; ++i) {
          if (mask[i] !== '0') {
            bin[i] = mask[i];
          }
        }

        const alteredBin = bin.join('');
        const addresses = computeAddresses(alteredBin, mask);

        addresses.forEach((address) => {
          memory.set(address, value);
        });
      }
    });

    let sum = 0;

    memory.forEach((value) => {
      sum += value;
    });

    return sum;
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

/**
 * @param {string} value
 * @returns {Array<number>}
 */
function computeAddresses(value) {
  let xPositions = [];

  for (let i = 0; i < value.length; ++i) {
    if (value[i] === 'X') {
      xPositions.push(i);
    }
  }

  const max = Math.pow(2, xPositions.length);

  let addresses = [];

  for (let x = 0; x < max; ++x) {
    const bin = x.toString(2).padStart(xPositions.length, '0');

    let valueArray = value.split('');

    for (let i = 0; i < bin.length; ++i) {
      valueArray[xPositions[i]] = bin[i];
    }

    const alteredValue = valueArray.join('');

    addresses.push(Number.parseInt(alteredValue, 2));
  }

  return addresses;
}
