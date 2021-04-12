import 'phaser';
import heroKnightPic from "../assets/images/hero.png";
import heroKnightJson from "../assets/images/hero_atlas.json";
import heroKnightAnim from "../assets/images/hero_anim.json";

export default class Hero extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
  }

  static preload(scene){
    scene.load.atlas('hero',heroKnightPic,heroKnightJson)
    scene.load.animation('hero_anim',heroKnightAnim)
  }

  update() {
    this.anims.play("hero_idle", true);
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }
    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
