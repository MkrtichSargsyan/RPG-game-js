import "phaser";


export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }


  create() {
    var width = this.cameras.main.width/2;

    this.play = this.add.image(width, 150, "play").setInteractive();
    this.play.on('pointerdown', () => {
      this.scene.start('userName');
    });
    this.help = this.add.image(width, 250, 'help').setInteractive();
    this.help.on('pointerdown', () => {
      this.scene.start('helpScene');
    });
    this.scores = this.add.image(width, 350, 'scores').setInteractive();
    this.scores.on('pointerdown', () => {
      this.scene.start('scoreScene');
    });
  }
}
