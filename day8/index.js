module.exports = {
  /** @argument input {string} */
  first(input) {
    return runCommands(parseCommands(input)).result;
  },

  /** @argument input {string} */
  second(input) {
    const commands = parseCommands(input);

    for (let i = 0; i < commands.length; ++i) {
      const { name } = commands[i];

      if (name === 'jmp' || name === 'nop') {
        let dupCommands = commands.map((command) => ({ ...command }));

        switch (name) {
          case 'jmp':
            dupCommands[i].name = 'nop';
            break;
          case 'nop':
            dupCommands[i].name = 'jmp';
            break;
        }

        const { valid, result } = runCommands(dupCommands);

        if (valid) {
          return result;
        }
      }
    }

    return -1;
  },
};

/**
 * @typedef Command
 * @property {string} name
 * @property {number} offset
 */

/**
 * @param {string} input
 * @returns {Array<Command>}
 */
function parseCommands(input) {
  return input
    .trim()
    .split('\n')
    .map((line) => {
      const re = /(?<name>\w{3})\s(?<offset>(\+|-)\d+)/g;
      const match = re.exec(line);

      if (!match) {
        return { name: '', offset: 0 };
      }

      const { name, offset } = match.groups;

      return {
        name,
        offset: Number.parseInt(offset),
      };
    });
}

/**
 * @typedef Result
 * @property {boolean} valid
 * @property {number} result
 */

/**
 * @param {Array<Command>} commands
 * @returns {Result}
 */
function runCommands(commands) {
  /** @type {Array<number>} */
  let log = [];
  let acc = 0;
  let i = 0;

  while (i < commands.length) {
    const { name, offset } = commands[i];

    if (log.includes(i)) {
      break;
    }

    switch (name) {
      case 'acc':
        acc += offset;
        log.push(i);
        ++i;
        break;
      case 'jmp':
        log.push(i);
        i += offset;
        break;
      case 'nop':
        log.push(i);
        ++i;
        break;
    }
  }

  return {
    valid: i === commands.length,
    result: acc,
  };
}
