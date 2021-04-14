import "phaser";
import Hero from "../model/hero.js";
import mapImage from '../assets/images/pipo-map001_at.png'
import mapJson from '../assets/images/map.json'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Hero.preload(this);
    this.load.image('tiles',mapImage)
    this.load.tilemapTiledJSON('map',mapJson)
  }
  create() {
    const map = this.make.tilemap({key:'map'})
    const tileset = map.addTilesetImage('pipo-map001_at','tiles',32,32,0,0)
    const layer1 = map.createLayer('Tile Layer 1',tileset,0,0);
    this.player =new Hero({
      scene: this,
      x: 20,
      y: 20,
      texture: "hero",
      frame: "heroknight_idle_0",
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
