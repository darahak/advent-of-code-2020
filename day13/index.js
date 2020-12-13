module.exports = {
  /** @argument input {string} */
  first(input) {
    const lines = input.trim().split('\n');

    const timestamp = Number.parseInt(lines[0]);
    const buses = lines[1]
      .split(',')
      .map((value) => Number.parseInt(value))
      .filter((value) => !Number.isNaN(value));

    const times = buses.map((bus) => {
      let i = bus;

      while (i < timestamp) {
        i += bus;
      }

      return { bus, time: i };
    });

    let earliest = { bus: 0, time: Number.MAX_SAFE_INTEGER };

    times.forEach(({ bus, time }) => {
      if (time - timestamp < earliest.time - timestamp) {
        earliest = { bus, time };
      }
    });

    return earliest.bus * (earliest.time - timestamp);
  },

  /** @argument input {string} */
  second(input) {
    const lines = input.trim().split('\n');

    const buses = lines[1]
      .split(',')
      .map((value) => (value === 'x' ? null : Number.parseInt(value)));

    const rules = buses
      .map((bus, i) => {
        return { bus, offset: i };
      })
      .filter((rule) => rule.bus !== null);

    let timestamp = 0;

    for (let i = 1; ; ++i) {
      timestamp = rules[0].bus * i;

      let valid = true;

      for (let j = 0; j < rules.length; ++j) {
        const { bus, offset } = rules[j];

        valid = valid && (timestamp + offset) % bus === 0;
      }

      if (valid) {
        break;
      }
    }

    return timestamp;
  },
};
