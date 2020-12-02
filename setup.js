const fs = require('fs');
const path = require('path');

const help = 'Please provide a date to run, e.g. `node setup.js 1` for day 1.';
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error(`Missing argument. ${help}`);
  return;
}

const number = Number.parseInt(args[0]);

const dirPath = path.join(__dirname, `day${number}`);
const indexPath = path.join(dirPath, 'index.js');

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

if (!fs.existsSync(indexPath)) {
  fs.copyFileSync(path.join(__dirname, 'template.js'), indexPath);
}

console.log('Done.');
