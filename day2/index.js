const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

module.exports = {
  /** @argument input {string} */
  first(input) {
    const lines = input.split('\n').filter(Boolean);

    const rePasswords = /(?<min>\d+)-(?<max>\d+)\s(?<letter>\w):\s(?<password>\w+)/;

    const entries = lines.map((line) => {
      const match = rePasswords.exec(line);

      return {
        min: Number.parseInt(match.groups.min),
        max: Number.parseInt(match.groups.max),
        letter: match.groups.letter,
        password: match.groups.password,
      };
    });

    const validEntries = entries.filter((entry) => {
      const { min, max, letter, password } = entry;

      let count = 0;

      for (let i = 0; i < password.length; ++i) {
        if (password[i] === letter) {
          ++count;
        }
      }

      return count >= min && count <= max;
    });

    return validEntries.length;
  },

  /** @argument input {string} */
  second(input) {
    const lines = input.split('\n').filter(Boolean);

    const rePasswords = /(?<posA>\d+)-(?<posB>\d+)\s(?<letter>\w):\s(?<password>\w+)/;

    const entries = lines.map((line) => {
      const match = rePasswords.exec(line);

      return {
        posA: Number.parseInt(match.groups.posA),
        posB: Number.parseInt(match.groups.posB),
        letter: match.groups.letter,
        password: match.groups.password,
      };
    });

    const validEntries = entries.filter((entry) => {
      const { posA, posB, letter, password } = entry;

      let count = 0;

      if (password[posA - 1] === letter) {
        ++count;
      }

      if (password[posB - 1] === letter) {
        ++count;
      }

      return count === 1;
    });

    return validEntries.length;
  },
};
