import api from '../api/scoresApi';

describe('postData', () => {
  test('it does not return null', () => expect(api.postData()).not.toBeNull());
  test('it returns an object', () => expect(api.postData()).toBeInstanceOf(Object));
  test('it does not return null', () => expect(api.getData()).not.toBeNull());
  test('it returns an object', () => expect(api.getData()).toBeInstanceOf(Object));
});