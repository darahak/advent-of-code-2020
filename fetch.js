// Fetch all available inputs and save them on disk.
// Example: The input for day 1 should be saved as `./day1/input.txt`.

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const eventStartDate = new Date('2020-12-01');
const today = new Date();

if (today < eventStartDate) {
  throw new Error('The event has not started yet!');
}

const FIRST_DAY = 1;
const LAST_DAY = 25;

(async () => {
  try {
    for (let i = FIRST_DAY; i <= LAST_DAY; ++i) {
      const targetDirectory = path.join(__dirname, `day${i}`);
      const targetPath = path.join(targetDirectory, 'input.txt');

      if (!fs.existsSync(targetPath)) {
        /** @type {Response} */
        const response = await fetch(`https://adventofcode.com/2020/day/${i}`);

        if (!response.ok) {
          throw new Error(
            `The input for day ${i} is not available yet. Stopping fetch here.`
          );
        }

        if (!fs.existsSync(targetDirectory)) {
          fs.mkdirSync(targetDirectory);
        }

        const text = await response.text();

        fs.writeFileSync(targetPath, text);

        console.log(`Created ${targetPath}.`);
      }
    }

    console.log('Done.');
  } catch (error) {
    console.error(error);
  }
})();
