const requiredProps = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:'];

module.exports = {
  /** @argument input {string} */
  first(input) {
    const blocks = input
      .trim()
      .split('\n\n')
      .map((block) => block.split('\n').join(' '));

    let validBlockCount = 0;

    blocks.forEach((block) => {
      if (isValidBlock(block)) {
        ++validBlockCount;
      }
    });

    return validBlockCount;
  },

  /** @argument input {string} */
  second(input) {
    const blocks = input
      .trim()
      .split('\n\n')
      .map((block) => block.split('\n').join(' '));

    let validPassportCount = 0;

    blocks.forEach((block) => {
      if (isValidPassport(block)) {
        ++validPassportCount;
      }
    });

    return validPassportCount;
  },
};

/** @argument block {string} */
function isValidBlock(block) {
  return requiredProps.every((prop) => block.includes(prop));
}

/** @argument block {string} */
function isValidPassport(block) {
  if (!isValidBlock(block)) {
    return false;
  }

  const pairs = block.split(' ').map((pair) => pair.split(':'));

  let valid = true;

  pairs.forEach((pair) => {
    const [prop, value] = pair;

    switch (prop) {
      case 'byr':
        {
          const byr = Number.parseInt(value);

          valid = valid && byr >= 1920 && byr <= 2002;
        }
        break;
      case 'iyr':
        {
          const iyr = Number.parseInt(value);

          valid = valid && iyr >= 2010 && iyr <= 2020;
        }
        break;
      case 'eyr':
        {
          const eyr = Number.parseInt(value);

          valid = valid && eyr >= 2020 && eyr <= 2030;
        }
        break;
      case 'hgt':
        {
          const hgt = Number.parseInt(value);

          if (value.endsWith('cm')) {
            valid = valid && hgt >= 150 && hgt <= 193;
          } else if (value.endsWith('in')) {
            valid = valid && hgt >= 59 && hgt <= 76;
          } else {
            valid = false;
          }
        }
        break;
      case 'hcl':
        {
          const regex = new RegExp(/#\w{6}/, 'g');

          valid = valid && regex.test(value);
        }
        break;
      case 'ecl':
        {
          const validEyeColors = [
            'amb',
            'blu',
            'brn',
            'gry',
            'grn',
            'hzl',
            'oth',
          ];

          valid = valid && validEyeColors.includes(value);
        }
        break;
      case 'pid':
        {
          const regex = new RegExp(/\d{9}/, 'g');

          valid = valid && value.length === 9 && regex.test(value);
        }
        break;
    }
  });

  return valid;
}
