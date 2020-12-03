module.exports = {
  /** @argument input {string} */
  first(input) {
    const lines = input.trim().split('\n');

    return countTrees(lines, 3, 1);
  },

  /** @argument input {string} */
  second(input) {
    const lines = input.trim().split('\n');

    const slopes = [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ];

    let total = 1;

    slopes.forEach((slope) => {
      total *= countTrees(lines, slope[0], slope[1]);
    });

    return total;
  },
};

function countTrees(lines, right, down) {
  let treesHit = 0;

  for (let x = 0, y = 0; y < lines.length; x += right, y += down) {
    const line = lines[y];
    const actualX = x % line.length;

    if (line[actualX] === '#') {
      ++treesHit;
    }
  }

  return treesHit;
}
