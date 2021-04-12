import "phaser";
import Hero from "../model/hero.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Hero.preload(this);
  }
  create() {
    this.player =new Hero({
      scene: this,
      x: 20,
      y: 20,
      texture: "hero",
      frame: "heroknight_attack1_0",
    });
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }
  update() {
    this.player.update();
  }
}
