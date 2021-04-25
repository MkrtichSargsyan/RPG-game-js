import banditPic from "../assets/images/bandit.png";
import banditJson from "../assets/images/bandit_atlas.json";
import banditAnim from "../assets/images/bandit_anim.json";
import MatterEntity from "./MatterEntity";

import banditAudio from "../assets/sounds/moan.mp3";

export default class Enemy extends MatterEntity {
  constructor(data) {
    let { scene, enemy } = data;

    let drops = JSON.parse(
      enemy.properties.find((p) => p.name == "drops").value
    );

    super({
      scene,
      x: enemy.x,
      y: enemy.y,
      texture: "bandit",
      frame: "lightbandit_idle_0",
      drops,
      health: 80,
      name:'bandit'
    });

    this.setStatic(true);
    this.scene.add.existing(this);
  }

  static preload(scene) {
    scene.load.atlas("bandit", banditPic, banditJson);
    scene.load.animation("bandit_anim", banditAnim);
    scene.load.audio('bandit',banditAudio)
  }

  // update(){
  //   console.log('update');
  // }
}
