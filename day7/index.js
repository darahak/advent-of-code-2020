module.exports = {
  /** @param {string} input */
  first(input) {
    const lines = input
      .trim()
      .split('\n')
      .map((line) => line.replace(/\sbags?\.?/g, ''));

    const bagRules = lines
      .map((line) => line.split(' contain '))
      .filter((pair) => !pair[0].includes('shiny gold'))
      .filter((pair) => !pair[1].includes('no other'));

    const shinyGoldContainers = bagRules
      .filter((pair) => pair[1].includes('shiny gold'))
      .map((pair) => pair[0]);

    let allShinyGoldContainers = shinyGoldContainers;

    shinyGoldContainers.forEach((color) => {
      allShinyGoldContainers.push(...findContainers(color, bagRules));
    });

    return new Set(allShinyGoldContainers).size;
  },

  /** @param {string} input */
  second(input) {
    const lines = input
      .trim()
      .split('\n')
      .map((line) => line.replace(/\sbags?\.?/g, ''));

    const rules = lines
      .map((line) => line.split(' contain '))
      .map(([bag, contents]) => {
        const contentRules = contents.split(', ').map((contentRule) => {
          const re = /(?<number>\d+)\s(?<color>\w+\s\w+)/;
          const match = re.exec(contentRule);

          if (!match) {
            return { number: 0, color: null };
          }

          const { number, color } = match.groups;

          return {
            number: Number.parseInt(number),
            color,
          };
        });

        return {
          bag,
          contents: contentRules,
        };
      });

    const shinyGoldRule = rules.find((rule) => rule.bag === 'shiny gold');

    let count = 0;

    shinyGoldRule.contents.forEach((content) => {
      const { number, color } = content;
      count += number + number * findContents(color, rules);
    });

    return count;
  },
};

/**
 * @param {string} color
 * @param {Array<Array<string>>} rules
 * @returns {Array<string>}
 */
function findContainers(color, rules) {
  let parentColors = rules
    .filter((pair) => pair[1].includes(color))
    .map((pair) => pair[0]);

  if (parentColors.length > 0) {
    parentColors.forEach((parent) => {
      parentColors.push(...findContainers(parent, rules));
    });
  }

  return parentColors;
}

/**
 * @param {string} color
 * @param {object} rules
 */
function findContents(color, rules) {
  if (!color) {
    return 1;
  }

  let sum = 0;

  const { contents } = rules.find((rule) => rule.bag === color);

  contents.forEach((content) => {
    const { number, color } = content;
    sum += number + number * findContents(color, rules);
  });

  return sum;
}
