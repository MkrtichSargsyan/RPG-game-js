/* eslint-disable no-plusplus */

import Phaser from 'phaser';
import DropItem from './dropItem';

export default class MatterEntity extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    const {
      name, scene, x, y, health, drops, texture, frame,
    } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.x = x;
    this.y = y;
    this.name = name;
    this.health = health;
    this.drops = drops;
    this.postion = new Phaser.Math.Vector2(this.x, this.y);
    if (this.name) this.sound = this.scene.sound.add(this.name);
    this.scene.add.existing(this);
  }

  get position() {
    this.postion.set(this.x, this.y);
    return this.postion;
  }

  get velocity() {
    return this.body.velocity;
  }

  get dead() {
    return this.health <= 0;
  }

  onDeath = () => {

  }

  hit = () => {
    if (this.sound) this.sound.play();
    this.health--;
    if (this.dead) {
      this.onDeath();
      this.drops.forEach((drop) => new DropItem({
        scene: this.scene, x: this.x, y: this.y, frame: drop,
      }));
    }
  };
}