import { createGame } from './create-game';

describe('Test to add a game, add a score to it and request it back', () => {
  test('Add a mock game and receive a message with the id', () => {
    let id = '';
    const result1 = createGame();
    result1.then((answer1) => {
      expect(answer1).toMatch(/(Game with ID).*(added)/);
      id = answer1.split(' ')[3]; // eslint-disable-line

      test('Add a record for the previous id', () => {
        const user = 'UserName';
        const score = 5000;
        const result2 = submitScore(user, score, id); // eslint-disable-line
        result2.then((answer2) => {
          expect(answer2).toBe('Leaderboard score created correctly.');
        });
      });
    });
  });

  test('Add a mock game and receive a message with the id', () => {
    let id = '';
    const result1 = createGame();
    result1.then((answer1) => {
      expect(answer1).toMatch(/(Game with ID).*(added)/);
      id = answer1.split(' ')[3]; // eslint-disable-line

      test('Get the record added previously', () => {
        const result3 = getScoreBoard(id); // eslint-disable-line
        result3.then((answer3) => {
          expect(answer3.user).toBe('UserName');
          expect(answer3.score).toBe(5000);
        });
      });
    });
  });
});