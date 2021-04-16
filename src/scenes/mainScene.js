import "phaser";
import Hero from "../model/hero.js";
import mapImage from "../assets/images/pipo-map001.png";
import mapJson from "../assets/images/map.json";

import resourcesPic from "../assets/images/resources.png";
import resourcesJson from "../assets/images/resources_atlas.json";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Hero.preload(this);
    this.load.image("tiles", mapImage);
    this.load.tilemapTiledJSON("map", mapJson);
    this.load.atlas('resources',resourcesPic,resourcesJson)
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

    let castle = new Phaser.Physics.Matter.Sprite(this.matter.world,650,450,'resources','castle')
    let tree1 = new Phaser.Physics.Matter.Sprite(this.matter.world,450,150,'resources','tree')
    let tree2 = new Phaser.Physics.Matter.Sprite(this.matter.world,450,250,'resources','tree')
    let tree3 = new Phaser.Physics.Matter.Sprite(this.matter.world,450,350,'resources','tree')
    let tree4 = new Phaser.Physics.Matter.Sprite(this.matter.world,450,450,'resources','tree')
    let tree5 = new Phaser.Physics.Matter.Sprite(this.matter.world,450,550,'resources','tree')
    let tree6 = new Phaser.Physics.Matter.Sprite(this.matter.world,450,120,'resources','tree')
    let tree7 = new Phaser.Physics.Matter.Sprite(this.matter.world,450,140,'resources','tree')
    let tree8 = new Phaser.Physics.Matter.Sprite(this.matter.world,450,130,'resources','tree')
    let tree9 = new Phaser.Physics.Matter.Sprite(this.matter.world,450,200,'resources','tree')
    let tree0 = new Phaser.Physics.Matter.Sprite(this.matter.world,550,50,'resources','tree')

    let cave1 = new Phaser.Physics.Matter.Sprite(this.matter.world,150,500,'resources','cave1')
    let cave2 = new Phaser.Physics.Matter.Sprite(this.matter.world,690,120,'resources','cave2')
    let cave3 = new Phaser.Physics.Matter.Sprite(this.matter.world,300,500,'resources','cave3')
    let cave4 = new Phaser.Physics.Matter.Sprite(this.matter.world,400,500,'resources','cave4')
    let cave5 = new Phaser.Physics.Matter.Sprite(this.matter.world,450,500,'resources','cave5')
    let cave6 = new Phaser.Physics.Matter.Sprite(this.matter.world,350,500,'resources','cave6')
    let tower2 = new Phaser.Physics.Matter.Sprite(this.matter.world,250,500,'resources','tower2')
    let tower1 = new Phaser.Physics.Matter.Sprite(this.matter.world,150,500,'resources','tower1')

    let items = [castle,tree0,,tree1,tree2,tree3,tree4,tree5,tree6,tree7,tree8,tree9,cave1,cave2,cave3,cave4,cave5,cave6,tower1,tower2]
    // items.forEach((el)=>el.setStatic(true));

    this.add.existing(tree0)
    this.add.existing(tree1)
    this.add.existing(tree2)
    this.add.existing(tree3)
    this.add.existing(tree4)
    this.add.existing(tree5)
    this.add.existing(tree6)
    this.add.existing(tree7)
    this.add.existing(tree8)
    this.add.existing(tree9)
    this.add.existing(castle)
    this.add.existing(cave1)
    this.add.existing(cave2)
    this.add.existing(cave3)
    this.add.existing(cave4)
    this.add.existing(cave5)
    this.add.existing(cave6)
    this.add.existing(tower2)
    this.add.existing(tower1)

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

  update() {
    this.player.update();
  }
}
