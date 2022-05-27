// import * as THREE from 'three';
import World from '../systems/World.js';

import AmmoLights from '../scenery/AmmoLights.js';
import AmmoSphere from '../actors/AmmoSphere.js';

export default class AmmoWorld extends World {
  constructor(stage) {
    super(stage);
    this.stage = stage;
    const lights = new AmmoLights();
    this.sunlight = lights.light;
    stage.scene.add(this.sunlight);
  }

  async init() {
    await super.init();
    this.sphere = new AmmoSphere();
    await this.sphere.init();
    console.log(this.sphere);
    this.stage.scene.add(this.sphere.model);
  }

  dispose() {
    this.sunlight.removeFromParent();
  }
}
