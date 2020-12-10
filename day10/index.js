module.exports = {
  /** @argument input {string} */
  first(input) {
    const numbers = input
      .trim()
      .split('\n')
      .map((number) => Number.parseInt(number));

    const deviceJoltage = Math.max(...numbers) + 3;

    let list1 = [];
    let list2 = [];
    let list3 = [];
    let rating = 0;

    while (rating < deviceJoltage) {
      const i1 = numbers.indexOf(rating + 1);

      if (i1 !== -1) {
        const value = numbers[i1];

        rating = value;
        list1.push(value);
      } else {
        const i2 = numbers.indexOf(rating + 2);

        if (i2 !== -1) {
          const value = numbers[i2];

          rating = value;
          list2.push(value);
        } else {
          const i3 = numbers.indexOf(rating + 3);

          if (i3 !== -1) {
            const value = numbers[i3];

            rating = value;
            list3.push(value);
          } else {
            break;
          }
        }
      }
    }

    list3.push(deviceJoltage);

    return list1.length * list3.length;
  },

  /** @argument input {string} */
  second(input) {
    const numbers = input
      .trim()
      .split('\n')
      .map((number) => Number.parseInt(number));
  },
};
