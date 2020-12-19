module.exports = {
  /** @argument input {string} */
  first(input) {
    const [rawRanges, , rawNearbyTickets] = input.trim().split('\n\n');

    const rules = parseRules(rawRanges);
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

    const rules = parseRules(rawRanges);
    const nearbyTickets = rawNearbyTickets
      .split('\n')
      .slice(1)
      .map((line) => line.split(',').map((x) => Number.parseInt(x)))
      .filter((ticket) => ticket.every((field) => matchRules(field, rules)));
    const possibleTicketFields = getPossibleTicketFields(nearbyTickets, rules);
    const finalTicketFields = refineTicketFields(possibleTicketFields);

    /** @type {Array<number>} */
    let indexes = [];

    finalTicketFields.forEach((name, i) => {
      if (name.startsWith('departure')) {
        indexes.push(i);
      }
    });

    const ticket = rawTicket
      .split('\n')[1]
      .split(',')
      .map((x) => Number.parseInt(x));

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
 * @param {string} ranges
 * @returns {Array<Rule>}
 */
function parseRules(ranges) {
  return ranges.split('\n').map((line) => {
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
}

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

/**
 * @param {Array<Array<number>>} nearbyTickets
 * @param {Array<Rule>} rules
 * @returns {Array<Set<string>>}
 */
function getPossibleTicketFields(nearbyTickets, rules) {
  /** @type {Array<Set<string>>} */
  let possibleTicketFields = [];

  const ticketLength = nearbyTickets[0].length;

  for (let i = 0; i < ticketLength; ++i) {
    for (let j = 0; j < rules.length; ++j) {
      const rule = rules[j];

      if (nearbyTickets.every((ticket) => matchRule(ticket[i], rule))) {
        let ruleset = possibleTicketFields[i];

        if (ruleset) {
          ruleset.add(rule.id);
        } else {
          ruleset = new Set([rule.id]);
        }

        possibleTicketFields[i] = ruleset;
      }
    }
  }

  return possibleTicketFields;
}

/**
 * @param {Array<Set<string>>} ticketFields
 * @returns {Array<string>}
 */
function refineTicketFields(ticketFields) {
  /** @type Array<number> */
  let validIndexes = [];

  while (ticketFields.some((field) => field.size > 1)) {
    const indexes = ticketFields
      .map((set, i) => (set.size === 1 ? i : null))
      .filter((value) => value !== null);
    const [index] = indexes.filter((i) => !validIndexes.includes(i));
    const [name] = ticketFields[index].values();

    validIndexes.push(index);

    ticketFields.forEach((field, i) => {
      if (!validIndexes.includes(i)) {
        field.delete(name);
      }
    });
  }

  return ticketFields.flatMap((field) => Array.from(field.values()));
}
