import Phaser from 'phaser';

export default class Help extends Phaser.Scene {
  constructor() {
    super('helpScene');
  }

  create() {
    this.add.image(250, 100, 'instructions');
    this.add.image(250, 150, 'wasd');
    this.add.image(250, 200, 'attackText');
    this.submit = this.add.dom(250, 300, 'button', 'padding:20px;background-color:gray;', 'Go Back');

    this.btn = document.querySelector('button');
    this.btn.addEventListener('click', () => {
      this.scene.start('menuScene');
    });
  }
}