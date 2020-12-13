module.exports = {
  /** @argument input {string} */
  first(input) {
    const lines = input.trim().split('\n');
    const { x, y } = processDirections(parseDirections(lines));

    return Math.abs(x) + Math.abs(y);
  },

  /** @argument input {string} */
  second(input) {
    const lines = input.trim().split('\n');
    const { x, y } = processWaypoint(parseDirections(lines));

    return Math.abs(x) + Math.abs(y);
  },
};

/**
 * @typedef Direction
 * @property {string} command
 * @property {number} value
 */

/**
 * @typedef Position
 * @property {number} x
 * @property {number} y
 */

/**
 * @param {Array<string>} lines
 * @returns {Array<Direction>}
 */
function parseDirections(lines) {
  const re = /(?<command>\w)(?<value>\d+)/;

  return lines.map((line) => {
    const match = re.exec(line);
    const { command, value } = match.groups;

    return { command, value: Number.parseInt(value) };
  });
}

/**
 * @param {Array<Direction>} directions
 * @returns {Position}
 */
function processDirections(directions) {
  let orientation = 90;
  let pos = { x: 0, y: 0 };

  directions.forEach(({ command, value }) => {
    switch (command) {
      case 'N':
        pos.y += value;
        break;
      case 'S':
        pos.y -= value;
        break;
      case 'E':
        pos.x += value;
        break;
      case 'W':
        pos.x -= value;
        break;
      case 'L':
        orientation -= value;
        break;
      case 'R':
        orientation += value;
        break;
      case 'F': {
        switch (orientation % 360) {
          // N
          case 0:
          case -0:
            pos.y += value;
            break;
          // E
          case 90:
          case -270:
            pos.x += value;
            break;
          // S
          case 180:
          case -180:
            pos.y -= value;
            break;
          // W
          case 270:
          case -90:
            pos.x -= value;
            break;
        }
      }
    }
  });

  return pos;
}

/**
 * @param {Array<Direction>} directions
 * @returns {Position}
 */
function processWaypoint(directions) {
  let waypoint = { x: 10, y: 1 };
  let pos = { x: 0, y: 0 };

  const degreesToRadians = (value) => (value * Math.PI) / 180;

  directions.forEach(({ command, value }) => {
    switch (command) {
      case 'N':
        waypoint.y += value;
        break;
      case 'S':
        waypoint.y -= value;
        break;
      case 'E':
        waypoint.x += value;
        break;
      case 'W':
        waypoint.x -= value;
        break;
      case 'L':
        {
          const radians = degreesToRadians(value);
          const { x, y } = waypoint;

          waypoint.x = Math.round(
            x * Math.cos(radians) - y * Math.sin(radians)
          );
          waypoint.y = Math.round(
            x * Math.sin(radians) + y * Math.cos(radians)
          );
        }
        break;
      case 'R':
        {
          const radians = degreesToRadians(-value);
          const { x, y } = waypoint;

          waypoint.x = Math.round(
            x * Math.cos(radians) - y * Math.sin(radians)
          );
          waypoint.y = Math.round(
            x * Math.sin(radians) + y * Math.cos(radians)
          );
        }
        break;
      case 'F':
        pos.x += waypoint.x * value;
        pos.y += waypoint.y * value;
        break;
    }
  });

  return pos;
}
