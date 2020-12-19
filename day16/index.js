module.exports = {
  /** @argument input {string} */
  first(input) {
    const [rawRanges, , rawNearbyTickets] = input.trim().split('\n\n');

    const rules = rawRanges.split('\n').map((line) => {
      const re = /(?<id>\w+\s*\w*):\s(?<range1>\d+-\d+)\sor\s(?<range2>\d+-\d+)/g;
      const match = re.exec(line);

      const { id, range1, range2 } = match.groups;

      const [min1, max1] = range1.split('-').map((x) => Number.parseInt(x));
      const [min2, max2] = range2.split('-').map((x) => Number.parseInt(x));

      return {
        id,
        range1: { min: min1, max: max1 },
        range2: { min: min2, max: max2 },
      };
    });

    const nearbyTickets = rawNearbyTickets
      .split('\n')
      .slice(1)
      .map((line) => line.split(',').map((x) => Number.parseInt(x)));

    /** @type {Array<number>} */
    let invalidValues = [];

    nearbyTickets.forEach((ticket) => {
      for (let i = 0; i < ticket.length; ++i) {
        const field = ticket[i];

        if (!matchRules(field, rules)) {
          invalidValues.push(field);
        }
      }
    });

    return invalidValues.reduce((acc, value) => acc + value, 0);
  },

  /** @argument input {string} */
  second(input) {
    const [rawRanges, rawTicket, rawNearbyTickets] = input.trim().split('\n\n');

    let rules = rawRanges.split('\n').map((line) => {
      const re = /(?<id>\w+\s*\w*):\s(?<range1>\d+-\d+)\sor\s(?<range2>\d+-\d+)/g;
      const match = re.exec(line);

      const { id, range1, range2 } = match.groups;

      const [min1, max1] = range1.split('-').map((x) => Number.parseInt(x));
      const [min2, max2] = range2.split('-').map((x) => Number.parseInt(x));

      return {
        id,
        range1: { min: min1, max: max1 },
        range2: { min: min2, max: max2 },
      };
    });

    const nearbyTickets = rawNearbyTickets
      .split('\n')
      .slice(1)
      .map((line) => line.split(',').map((x) => Number.parseInt(x)))
      .filter((ticket) => ticket.every((field) => matchRules(field, rules)));

    const ticketLength = nearbyTickets[0].length;

    /** @type {Map<number, string>} */
    let ticketFields = new Map();

    for (let i = 0; i < ticketLength; ++i) {
      for (let j = 0; j < rules.length; ++j) {
        const rule = rules[j];

        if (nearbyTickets.every((ticket) => matchRule(ticket[i], rule))) {
          console.log('Setting', rule.id, i);
          ticketFields.set(i, rule.id);

          rules.splice(j, 1);
          break;
        }
      }
    }

    console.log(ticketFields);

    /** @type {Array<number>} */
    let indexes = [];

    ticketFields.forEach((value, key) => {
      if (value.startsWith('departure')) {
        indexes.push(key);
      }
    });

    const ticket = rawTicket
      .split('\n')[1]
      .split(',')
      .map((x) => Number.parseInt(x));

    console.log(ticket);

    return indexes.reduce((acc, value) => acc * ticket[value], 1);
  },
};

/**
 * @typedef Range
 * @property {number} min
 * @property {number} max
 */

/**
 * @typedef Rule
 * @property {number} id
 * @property {Range} range1
 * @property {Range} range2
 */

/**
 * @param {number} value
 * @param {Rule} rule
 * @returns {boolean}
 */
function matchRule(value, rule) {
  const { range1, range2 } = rule;
  return (
    (value >= range1.min && value <= range1.max) ||
    (value >= range2.min && value <= range2.max)
  );
}

/**
 * @param {number} value
 * @param {Array<Rule>} rules
 * @returns {boolean}
 */
function matchRules(value, rules) {
  return rules.some((rule) => matchRule(value, rule));
}
