import "phaser";
import heroKnightPic from "../assets/images/hero.png";
import heroKnightJson from "../assets/images/hero_atlas.json";
import heroKnightAnim from "../assets/images/hero_anim.json";
import itemsPic from "../assets/images/items.png";

export default class Hero extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.touching = [];
    this.scene.add.existing(this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var playerCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: "playerCollider",
    });
    var playerSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "playerSensor",
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    this.CreateMiningCollisions(playerSensor);
  }

  static preload(scene) {
    scene.load.atlas("hero", heroKnightPic, heroKnightJson);
    scene.load.animation("hero_anim", heroKnightAnim);
    scene.load.spritesheet("items", itemsPic, {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  get velocity() {
    return this.body.velocity;
  }

  update() {
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
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

    let pointer = this.scene.input.activePointer;

    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play("hero_run", true);
    } else if (pointer.isDown) {
      this.anims.play("hero_atack", true);
      this.whackStuff();
    } else {
      this.anims.play("hero_idle", true);
    }
    this.scene.input.on("pointermove", (pointer) =>
      this.setFlipX(pointer.worldX < this.x)
    );
  }

  CreateMiningCollisions(playerSensor) {
    this.scene.matterCollision.addOnCollideStart({
      objectA: [playerSensor],
      callback: (other) => {
        if (other.bodyB.isSensor) return;
        this.touching.push(other.gameObjectB);
        console.log(this.touching.length);
        if (other.gameObjectB.frame) {
          console.log(other.gameObjectB.frame.name);
        }
      },
      context: this.scene,
    });
    this.scene.matterCollision.addOnCollideEnd({
      objectA:[playerSensor],
      callback: other=>{
        this.touching = this.touching.filter(gameObject=> gameObject != other.gameObjectB)
        console.log(this.touching.length);
      },
      context:this.scene
    })
  }

  whackStuff(){
    this.touching = this.touching.filter(gameObject =>gameObject.hit && !gameObject.dead);
    this.touching.forEach(gameObject=>{
      gameObject.hit();
      if(gameObject.dead) gameObject.destroy()
    })
  }
}