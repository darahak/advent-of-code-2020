const fs = require('fs');
const path = require('path');

const help = 'Please provide a date to run, e.g. `node main.js 1` for day 1.';
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error(`Missing argument. ${help}`);
  return;
}

const number = Number.parseInt(args[0]);

if (Number.isNaN(number)) {
  console.error(`Argument ${args[0]} is not a number. ${help}`);
  return;
}

const puzzle = require(`./day${number}`);
const input = fs.readFileSync(
  path.join(__dirname, `day${number}`, 'input.txt'),
  { encoding: 'utf8' }
);

const start1 = Date.now();
const result1 = puzzle.first(input);
const seconds1 = (Date.now() - start1) / 1000;

console.log(
  `Result for day ${number} part 1: ${result1} (${seconds1} seconds)`
);

const start2 = Date.now();
const result2 = puzzle.second(input);
const seconds2 = (Date.now() - start2) / 1000;

console.log(
  `Result for day ${number} part 2: ${result2} (${seconds2} seconds)`
);
