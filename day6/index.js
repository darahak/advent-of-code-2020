module.exports = {
  /** @argument input {string} */
  first(input) {
    const groups = input.trim().split('\n\n');

    let sum = 0;

    groups.forEach((group) => {
      group = group.split('\n').join('');

      let answers = new Set();

      for (let i = 0; i < group.length; ++i) {
        answers.add(group[i]);
      }

      sum += answers.size;
    });

    return sum;
  },

  /** @argument input {string} */
  second(input) {
    const groups = input.trim().split('\n\n');

    let sum = 0;

    groups.forEach((group) => {
      const answers = group.split('\n');

      let answerCounter = {};

      answers.forEach((answer) => {
        for (let i = 0; i < answer.length; ++i) {
          if (answerCounter[answer[i]] !== undefined) {
            ++answerCounter[answer[i]];
          } else {
            answerCounter[answer[i]] = 1;
          }
        }
      });

      Object.values(answerCounter).forEach((value) => {
        if (value === answers.length) {
          ++sum;
        }
      });
    });

    return sum;
  },
};
