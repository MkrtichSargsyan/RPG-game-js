import Phaser from 'phaser';
import MainScene from './scenes/mainScene';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

import './style.css';


const width = 800;
const height = 600;
const backgroundColor ='#333333'

const config = {
  width,
  height,
  backgroundColor,
  type: Phaser.AUTO,
  parent:'zombie-land',
  scene: [MainScene],
  // scale:{
  //   zoom:2
  // },
  physics:{
    default:'matter',
    matter:{
      debug:true,
      gravity:{y:0}
    }
  },
  plugins:{
    scene:[
      {
        plugin:PhaserMatterCollisionPlugin,
        key:'matterCollision',
        mapping:'matterCollision'
      }
    ]
  }
};

const game = new Phaser.Game(config);
