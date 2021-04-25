import resourcesPic from '../assets/images/resources.png';
import resourcesJson from '../assets/images/resources_atlas.json';

import treeAudio from '../assets/sounds/tree.mp3';
import caveAudio from '../assets/sounds/cave.mp3';
import castleAudio from '../assets/sounds/castle.mp3';
import pickup from '../assets/sounds/pickup.mp3';
import MatterEntity from './MatterEntity';

export default class Resource extends MatterEntity {
  static preload(scene) {
    scene.load.atlas('resources', resourcesPic, resourcesJson);
    scene.load.audio('tree', treeAudio);
    scene.load.audio('cave1', caveAudio);
    scene.load.audio('cave2', caveAudio);
    scene.load.audio('cave3', caveAudio);
    scene.load.audio('cave4', caveAudio);
    scene.load.audio('cave5', caveAudio);
    scene.load.audio('cave6', caveAudio);
    scene.load.audio('tower1', caveAudio);
    scene.load.audio('tower2', caveAudio);
    scene.load.audio('castle', castleAudio);
    scene.load.audio('pickup', pickup);
  }

  constructor(data) {
    const { scene, resource } = data;

    const drops = JSON.parse(
      resource.properties.find((p) => p.name === 'drops').value,
    );
    super({
      scene,
      x: resource.x,
      y: resource.y,
      texture: 'resources',
      frame: resource.type,
      drops,
      health: 80,
      name: resource.type,
    });

    this.setStatic(true);
  }
}
