module.exports = {
  /** @argument input {string} */
  first(input) {
    const lines = input.trim().split('\n');
    const seats = computeSeats(lines);

    return Math.max(...seats);
  },

  /** @argument input {string} */
  second(input) {
    const lines = input.trim().split('\n');
    const seats = computeSeats(lines).sort((a, b) => a - b);

    seats.splice(0, 8);
    seats.splice(-1, 8);

    for (let i = 0; i < seats.length; ++i) {
      if (seats[i] + 2 === seats[i + 1]) {
        return seats[i] + 1;
      }
    }
  },
};

/**
 * @argument lines {Array<string>}
 * @returns {Array<number>}
 * */
function computeSeats(lines) {
  return lines
    .map((line) => ({ row: line.slice(0, 7), column: line.slice(7) }))
    .map(({ row, column }) => {
      const selectedRow = Number.parseInt(
        row.replace(/F/g, '0').replace(/B/g, '1'),
        2
      );
      const selectedColumn = Number.parseInt(
        column.replace(/L/g, '0').replace(/R/g, '1'),
        2
      );

      return selectedRow * 8 + selectedColumn;
    });
}
