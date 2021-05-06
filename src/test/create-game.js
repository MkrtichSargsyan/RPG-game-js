async function createGame() {
  const game = {
    name: 'Mock Game',
  };
  const post = JSON.stringify(game);
  const address = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: post,
  };
  const response = await fetch(address, settings);
  const answer = await response.json();

  return answer;
}

export { createGame }; // eslint-disable-line