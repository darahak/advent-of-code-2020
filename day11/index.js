module.exports = {
  /** @argument input {string} */
  first(input) {
    const lines = input.trim().split('\n');

    const rowLength = lines[0].length;
    const columnLength = lines.length;

    let seats = lines.join('');
    let oldSeats = '';

    while (oldSeats !== seats) {
      oldSeats = seats;
      seats = processSeats(seats, rowLength, columnLength);
    }

    return seats.split('').filter((seat) => seat === '#').length;
  },

  /** @argument input {string} */
  second(input) {
    const lines = input.trim().split('\n');

    const rowLength = lines[0].length;
    const columnLength = lines.length;

    let seats = lines.join('');
    let oldSeats = '';

    while (oldSeats !== seats) {
      oldSeats = seats;
      seats = processSeats2(seats, rowLength, columnLength);
    }

    return seats.split('').filter((seat) => seat === '#').length;
  },
};

/**
 * @param {string} seats
 * @param {number} width
 * @param {number} height
 * @returns {string}
 */
function processSeats(seats, width, height) {
  let updatedSeats = seats;

  for (let j = 0; j < height; ++j) {
    for (let i = 0; i < width; ++i) {
      const index = j * width + i;

      const currentSeat = seats[index];
      const adjacentSeats = getAdjacentSeats(seats, i, j, width, height);

      switch (currentSeat) {
        // Empty.
        case 'L':
          if (adjacentSeats.every((seat) => seat !== '#')) {
            updatedSeats = updateString(updatedSeats, index, '#');
          }
          break;
        // Occupied.
        case '#':
          if (adjacentSeats.filter((seat) => seat === '#').length > 3) {
            updatedSeats = updateString(updatedSeats, index, 'L');
          }
          break;
      }
    }
  }

  return updatedSeats;
}

/**
 * @param {string} input
 * @param {number} index
 * @param {string} value
 */
function updateString(input, index, value) {
  if (input[index]) {
    let chars = input.split('');

    chars.splice(index, 1, value);

    return chars.join('');
  }

  return input;
}

/**
 * @param {string} seats
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @returns {Array<string>}
 */
function getAdjacentSeats(seats, x, y, width, height) {
  let adjacentSeats = [];

  if (y > 0) {
    if (x > 0) {
      adjacentSeats.push(seats[(y - 1) * width + (x - 1)]);
    }
    adjacentSeats.push(seats[(y - 1) * width + x]);
    if (x < width - 1) {
      adjacentSeats.push(seats[(y - 1) * width + (x + 1)]);
    }
  }

  if (x > 0) {
    adjacentSeats.push(seats[y * width + (x - 1)]);
  }
  if (x < width - 1) {
    adjacentSeats.push(seats[y * width + (x + 1)]);
  }

  if (y < height - 1) {
    if (x > 0) {
      adjacentSeats.push(seats[(y + 1) * width + (x - 1)]);
    }
    adjacentSeats.push(seats[(y + 1) * width + x]);
    if (x < width - 1) {
      adjacentSeats.push(seats[(y + 1) * width + (x + 1)]);
    }
  }

  return adjacentSeats;
}

/**
 * @param {string} seats
 * @param {number} width
 * @param {number} height
 * @returns {string}
 */
function processSeats2(seats, width, height) {
  let updatedSeats = seats;

  for (let j = 0; j < height; ++j) {
    for (let i = 0; i < width; ++i) {
      const index = j * width + i;

      const currentSeat = seats[index];
      const adjacentSeats = getSurroundingSeats(seats, i, j, width, height);

      switch (currentSeat) {
        // Empty.
        case 'L':
          if (adjacentSeats.every((seat) => seat !== '#')) {
            updatedSeats = updateString(updatedSeats, index, '#');
          }
          break;
        // Occupied.
        case '#':
          if (adjacentSeats.filter((seat) => seat === '#').length > 4) {
            updatedSeats = updateString(updatedSeats, index, 'L');
          }
          break;
      }
    }
  }

  return updatedSeats;
}

/**
 * @param {string} seats
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @returns {Array<string>}
 */
function getSurroundingSeats(seats, x, y, width, height) {
  let surroundingSeats = [];

  // NW
  for (let i = x - 1, j = y - 1; ; --i, --j) {
    if (i < 0 || j < 0) {
      break;
    }

    const currentSeat = seats[j * width + i];

    if (currentSeat === 'L' || currentSeat === '#') {
      surroundingSeats.push(currentSeat);
      break;
    }
  }

  // N
  for (let i = x, j = y - 1; ; --j) {
    if (j < 0) {
      break;
    }

    const currentSeat = seats[j * width + i];

    if (currentSeat === 'L' || currentSeat === '#') {
      surroundingSeats.push(currentSeat);
      break;
    }
  }

  // NE
  for (let i = x + 1, j = y - 1; ; ++i, --j) {
    if (i >= width || j < 0) {
      break;
    }

    const currentSeat = seats[j * width + i];

    if (currentSeat === 'L' || currentSeat === '#') {
      surroundingSeats.push(currentSeat);
      break;
    }
  }

  // W
  for (let i = x - 1, j = y; ; --i) {
    if (i < 0) {
      break;
    }

    const currentSeat = seats[j * width + i];

    if (currentSeat === 'L' || currentSeat === '#') {
      surroundingSeats.push(currentSeat);
      break;
    }
  }

  // E
  for (let i = x + 1, j = y; ; ++i) {
    if (i >= width) {
      break;
    }

    const currentSeat = seats[j * width + i];

    if (currentSeat === 'L' || currentSeat === '#') {
      surroundingSeats.push(currentSeat);
      break;
    }
  }

  // SW
  for (let i = x - 1, j = y + 1; ; --i, ++j) {
    if (i < 0 || j >= height) {
      break;
    }

    const currentSeat = seats[j * width + i];

    if (currentSeat === 'L' || currentSeat === '#') {
      surroundingSeats.push(currentSeat);
      break;
    }
  }

  // S
  for (let i = x, j = y + 1; ; ++j) {
    if (j >= height) {
      break;
    }

    const currentSeat = seats[j * width + i];

    if (currentSeat === 'L' || currentSeat === '#') {
      surroundingSeats.push(currentSeat);
      break;
    }
  }

  // SE
  for (let i = x + 1, j = y + 1; ; ++i, ++j) {
    if (i >= width || j >= height) {
      break;
    }

    const currentSeat = seats[j * width + i];

    if (currentSeat === 'L' || currentSeat === '#') {
      surroundingSeats.push(currentSeat);
      break;
    }
  }

  return surroundingSeats;
}
