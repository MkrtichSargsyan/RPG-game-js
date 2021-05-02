import Phaser from 'phaser';

import api from '../api/scoresApi'

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('scoreScene');
  }

  create() {
    const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/7vSAsY26XJBzTY7u4Shv/scores';
    const score = JSON.parse(localStorage.getItem('score:'));
    const username = JSON.parse(localStorage.getItem('username:'));
    const obj = {
      user: username,
      score,
    };


    APIHandler.getData(url)
      .then(data => {
        this.space = 0;

        data.result.sort((a, b) => b.score - a.score).slice(0, 10).forEach((userObj, index) => {
          this.add.text(
            150,
            170 + this.space,
            `${index + 1}. ${userObj.user} | ${userObj.score}`,
            {
              font: '19px monospace',
              fill: '#0000ff',
            },
          );
          this.space += 30;
        });
      });

    this.submit = this.add.dom(240, 100, 'button', 'padding:20px;background-color:gray;', 'Go Back');

    this.btn = document.querySelector('button');
    this.btn.addEventListener('click', () => {
      this.scene.start('titleScene');
    });
  }
}