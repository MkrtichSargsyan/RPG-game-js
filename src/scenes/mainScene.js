import "phaser";
import Hero from "../model/hero.js";
import mapImage from "../assets/images/pipo-map001.png";
import mapJson from "../assets/images/map.json";


import Resource from "../model/resource.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Hero.preload(this);
    Resource.preload(this)
    this.load.image("tiles", mapImage);
    this.load.tilemapTiledJSON("map", mapJson);
  }
  create() {
    const map = this.make.tilemap({ key: "map" });
    this.map = map
    const tileset = map.addTilesetImage("pipo-map001", "tiles", 32, 32, 0, 0);
    const layer1 = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
    const layer2 = map.createStaticLayer("Tile Layer 2", tileset, 0, 0);
    layer1.setCollisionByProperty({ collides: true });
    layer2.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(layer1);
    this.matter.world.convertTilemapLayer(layer2);

    this.addResources()

    this.player = new Hero({
      scene: this,
      x: 80,
      y: 160,
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

  addResources() {
    const resources = this.map.getObjectLayer('Resources');
    resources.objects.forEach(resource =>{
      let resItem = new Resource({scene:this,resource})    
    })
  }

  update() {
    this.player.update();
  }
}
