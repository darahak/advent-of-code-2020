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

console.log(`Result: ${puzzle()}`);
