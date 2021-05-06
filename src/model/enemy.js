import Phaser from 'phaser';

import MatterEntity from './MatterEntity';

export default class Enemy extends MatterEntity {
  constructor(data) {
    const { scene, enemy } = data;

    const drops = JSON.parse(
      enemy.properties.find((p) => p.name === 'drops').value,
    );

    super({
      scene,
      x: enemy.x,
      y: enemy.y,
      texture: 'bandit',
      frame: 'lightbandit_idle_0',
      drops,
      health: 80,
      name: 'bandit',
    });

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const enemyCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: 'enemyCollider',
    });
    const enemySensor = Bodies.circle(this.x, this.y, 80, {
      isSensor: true,
      label: 'enemySensor',
    });
    const compoundBody = Body.create({
      parts: [enemyCollider, enemySensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);

    this.setFixedRotation();
    this.scene.matterCollision.addOnCollideStart({
      objectA: [enemySensor],
      callback: (other) => {
        if (other.gameObjectB && other.gameObjectB.name === 'hero') this.attacking = other.gameObjectB;
      },
      context: this.scene,
    });
  }

  static preload() {
  }

  attack = (target) => {
    if (target.dead || this.dead) {
      clearInterval(this.attacktimer);
      return;
    }

    target.hit();
  };

  update() {
    if (this.dead) return;
    if (this.attacking) {
      const direction = this.attacking.position.subtract(this.position);
      if (direction.length() > 24) {
        direction.normalize();
        this.setVelocityX(direction.x);
        this.setVelocityY(direction.y);
        if (this.attacktimer) {
          clearInterval(this.attacktimer);
          this.attacktimer = null;
        }
      } else if (this.attacktimer == null) {
        this.attacktimer = setInterval(this.attack, 500, this.attacking);
      }
    }
    this.setFlipX(this.velocity.x < 0);
    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.scaleX = -1;
      this.anims.play('bandit_run', true);
    } else {
      this.anims.play('bandit_idle', true);
    }
  }
}
