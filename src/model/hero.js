/* eslint-disable no-unused-expressions */

import '@babel/polyfill';

import Phaser from 'phaser';
import api from '../api/scoresApi';

import MatterEntity from './MatterEntity';

export default class Hero extends MatterEntity {
  constructor(data) {
    super({
      ...data,
      health: 5,
      drops: [],
      name: 'hero',
    });

    this.touching = [];

    this.score = 0;
    localStorage.setItem('score:', JSON.stringify(this.score));

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const playerCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: 'playerCollider',
    });
    const playerSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: 'playerSensor',
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.CreateMiningCollisions(playerSensor);
    this.CreatePickupCollisions(playerCollider);
    this.scene.input.on('pointermove', (pointer) => {
      if (!this.dead) this.setFlipX(pointer.worldX < this.x);
    });
  }

  static preload() {}

  onDeath = () => {
    this.anims.stop();
    this.anims.play('hero_death', 60, false);

    const username = JSON.parse(localStorage.getItem('username:'));
    const obj = {
      user: username,
      score: this.score,
    };
    api
      .postData(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/KgZJx3pWKX0uX5A67Ryb/scores',
        obj,
      ).then(data=>{});
      setTimeout(()=>{
        this.scene.scene.stop('mainScene');
        this.scene.scene.start('menuScene');
        window.location.reload();
      },3000)
   
  };

  update() {
    if (this.dead) return;
    const speed = 2.5;
    const playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
      (pointer) => this.setFlipX(pointer.worldX < this.x);
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

    const pointer = this.scene.input.activePointer;

    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play('hero_run', true);
    } else if (pointer.isDown) {
      this.anims.play('hero_atack', true);
      this.whackStuff();
    } else {
      this.anims.play('hero_idle', true);
    }
    this.scene.input.on('pointermove', (pointer) => this.setFlipX(pointer.worldX < this.x));
  }

  CreateMiningCollisions(playerSensor) {
    this.scene.matterCollision.addOnCollideStart({
      objectA: [playerSensor],
      callback: (other) => {
        if (other.bodyB.isSensor) return;
        this.touching.push(other.gameObjectB);
      },
      context: this.scene,
    });
    this.scene.matterCollision.addOnCollideEnd({
      objectA: [playerSensor],
      callback: (other) => {
        this.touching = this.touching.filter(
          (gameObject) => gameObject !== other.gameObjectB,
        );
      },
      context: this.scene,
    });
  }

  CreatePickupCollisions(playerCollider) {
    this.scene.matterCollision.addOnCollideStart({
      objectA: [playerCollider],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.pickup) other.gameObjectB.pickup();
      },
      context: this.scene,
    });
    this.scene.matterCollision.addOnCollideActive({
      objectA: [playerCollider],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.pickup) other.gameObjectB.pickup();
      },
      context: this.scene,
    });
  }

  whackStuff() {
    this.touching = this.touching.filter(
      (gameObject) => gameObject.hit && !gameObject.dead,
    );
    this.touching.forEach((gameObject) => {
      gameObject.hit();
      if (gameObject.dead) {
        if (gameObject.name === 'bandit') {
          this.score += 200;
        } else {
          this.score += 50;
        }
        localStorage.setItem('score:', JSON.stringify(this.score));
        gameObject.destroy();
      }
    });
  }
}
