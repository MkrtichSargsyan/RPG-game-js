/* eslint-disable no-new */

import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import MainScene from './scenes/mainScene';

import './style.css';

const width = 800;
const height = 600;
const backgroundColor = '#333333';

const config = {
  width,
  height,
  backgroundColor,
  type: Phaser.AUTO,
  parent: 'zombie-land',
  scene: [MainScene],
  physics: {
    default: 'matter',
    matter: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: 'matterCollision',
        mapping: 'matterCollision',
      },
    ],
  },
};

new Phaser.Game(config);
