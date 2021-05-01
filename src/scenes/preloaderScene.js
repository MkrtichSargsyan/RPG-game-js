import "phaser";

import play from '../assets/images/play.png'
import scores from '../assets/images/scores.png'
import help from '../assets/images/help.png'

import instructions from '../assets/images/INSTRUCTIONS.png'
import wasd from '../assets/images/WASD-for-movement.png'
import attackText from '../assets/images/Left-click-for-attack.png'


import banditPic from "../assets/images/bandit.png";
import banditJson from "../assets/images/bandit_atlas.json";
import banditAnim from "../assets/images/bandit_anim.json";
import banditAudio from "../assets/sounds/moan.mp3";

import heroKnightPic from '../assets/images/hero.png';
import heroKnightJson from '../assets/images/hero_atlas.json';
import heroKnightAnim from '../assets/images/hero_anim.json';
import itemsPic from '../assets/images/items.png';
import playerAudio from '../assets/sounds/moan.mp3';

import resourcesPic from '../assets/images/resources.png';
import resourcesJson from '../assets/images/resources_atlas.json';

import treeAudio from '../assets/sounds/tree.mp3';
import caveAudio from '../assets/sounds/cave.mp3';
import castleAudio from '../assets/sounds/castle.mp3';
import pickup from '../assets/sounds/pickup.mp3';
import mapImage from '../assets/images/pipo-map001.png';



export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super("preloaderScene");
  }

  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50, 
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on("progress", function (value) {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
    });

    // remove progress bar when complete
    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('play', play);
    this.load.image('scores', scores);
    this.load.image('help', help);
    this.load.image('tiles', mapImage);

    this.load.atlas("bandit", banditPic, banditJson);
    this.load.animation("bandit_anim", banditAnim);
    this.load.audio("bandit", banditAudio);

    this.load.atlas('hero', heroKnightPic, heroKnightJson);
    this.load.animation('hero_anim', heroKnightAnim);
    this.load.spritesheet('items', itemsPic, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio('hero', playerAudio);


    this.load.atlas('resources', resourcesPic, resourcesJson);
    this.load.audio('tree', treeAudio);
    this.load.audio('cave1', caveAudio);
    this.load.audio('cave2', caveAudio);
    this.load.audio('cave3', caveAudio);
    this.load.audio('cave4', caveAudio);
    this.load.audio('cave5', caveAudio);
    this.load.audio('cave6', caveAudio);
    this.load.audio('tower1', caveAudio);
    this.load.audio('tower2', caveAudio);
    this.load.audio('castle', castleAudio);
    this.load.audio('pickup', pickup);

    this.load.image('wasd', wasd);
    this.load.image('attackText', attackText);
    this.load.image('instructions', instructions);
  }

  create() {
    this.scene.start('menuScene');
  }

  init () {
    this.readyCount = 0;
  }
   
  ready () {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('menuScene');
    }
  }
}
