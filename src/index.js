/* eslint-disable no-new */

import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import MainScene from './scenes/mainScene';
import MenuScene from './scenes/menuScene';
import UserName from './scenes/userName';
import HelpScene from './scenes/helpScene';
import PreloaderScene from './scenes/preloaderScene';

import './style.css';
import ScoreScene from './scenes/scoreScene';

const width = 800;
const height = 600;
const backgroundColor = '#333333';

const config = {
  width,
  height,
  backgroundColor,

  dom: { createContainer: true },
  type: Phaser.AUTO,
  parent: 'zombie-land',
  scene: [PreloaderScene, MenuScene, UserName, HelpScene, MainScene, ScoreScene],
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
