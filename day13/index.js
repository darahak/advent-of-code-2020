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

    const values = lines[1]
      .split(',')
      .map((value) => (value === 'x' ? null : Number.parseInt(value)));

    const rules = values
      .map((bus, i) => {
        return { bus, offset: i };
      })
      .filter((rule) => rule.bus !== null);

    let timestamp = 0;
    let { bus: skip } = rules.shift();

    rules.forEach(({ bus, offset }) => {
      while ((timestamp + offset) % bus !== 0) {
        timestamp += skip;
      }

      skip *= bus;
    });

    return timestamp;
  },
};
