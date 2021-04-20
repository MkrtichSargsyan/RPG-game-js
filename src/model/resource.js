import resourcesPic from "../assets/images/resources.png";
import resourcesJson from "../assets/images/resources_atlas.json";

import treeAudio from '../assets/sounds/tree.mp3'
import cave1Audio from '../assets/sounds/cave1.mp3'
import cave2Audio from '../assets/sounds/cave2.mp3'
import castleAudio from '../assets/sounds/castle.mp3'

export default class Resource extends Phaser.Physics.Matter.Sprite {
  static preload(scene) {
    scene.load.atlas("resources", resourcesPic, resourcesJson);
    scene.load.audio('tree',treeAudio)
    scene.load.audio('cave1',cave1Audio)
    scene.load.audio('cave2',cave2Audio)
    scene.load.audio('cave3',cave2Audio)
    scene.load.audio('cave4',cave2Audio)
    scene.load.audio('cave5',cave2Audio)
    scene.load.audio('cave6',cave2Audio)
    scene.load.audio('tower1',cave2Audio)
    scene.load.audio('tower2',cave2Audio)
    scene.load.audio('castle',castleAudio)
  }

  constructor(data) {
    let { scene, resource } = data;
    super(
      scene.matter.world,
      resource.x,
      resource.y,
      "resources",
      resource.type
    );
    this.health = 80;
    this.sound = this.scene.sound.add(this.frame.name)
    this.scene.add.existing(this);
    this.setStatic(true);
  }

  get dead() {
    return this.health <= 0;
  }

  hit = () => {
    if (this.sound) this.sound.play();
    this.health--;
    console.log(`Hitting ${this.name}--${this.health}`);
  };
}
