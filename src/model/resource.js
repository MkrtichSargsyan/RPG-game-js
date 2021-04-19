import resourcesPic from "../assets/images/resources.png";
import resourcesJson from "../assets/images/resources_atlas.json";

export default class Resource extends Phaser.Physics.Matter.Sprite {
  static preload(scene) {
    scene.load.atlas("resources", resourcesPic, resourcesJson);
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
    this.health = 124;
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
