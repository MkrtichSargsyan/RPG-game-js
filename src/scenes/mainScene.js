import 'phaser';
import heroKnightPic from '../assets/images/hero.png'
import heroKnightJson from '../assets/images/hero_atlas.json'


export default class MainScene extends Phaser.Scene{
  constructor(){
    super('MainScene')
  }

  preload(){
    console.log('preload');
    this.load.atlas('hero',heroKnightPic,heroKnightJson)
  }
  create(){
    console.log('create');
    let f = heroKnightJson.frames[0]
    console.log(f);
    this.player = new Phaser.Physics.Matter.Sprite(this.matter.world,20,20,'hero',f.frame)
    this.add.existing(this.player)
    this.inputKeys = this.input.keyboard.addKeys({
      up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D,
    })
  }
  update(){
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if(this.inputKeys.left.isDown){
      playerVelocity.x = -1;
    }else if(this.inputKeys.right.isDown){
      playerVelocity.x = 1;
    }
    if(this.inputKeys.up.isDown){
      playerVelocity.y = -1;
    }else if(this.inputKeys.down.isDown){
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed)
    this.player.setVelocity(playerVelocity.x,playerVelocity.y)
  }
}