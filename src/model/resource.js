import MatterEntity from './MatterEntity';

export default class Resource extends MatterEntity {
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

  static preload() {
  }
}
