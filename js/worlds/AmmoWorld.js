// import * as THREE from 'three';
import World from '../systems/World.js';

import AmmoLights from '../scenery/AmmoLights.js';
import AmmoSphere from '../actors/AmmoSphere.js';
import AmmoCloth from '../actors/AmmoCloth.js';

export default class AmmoWorld extends World {
  constructor(stage) {
    super(stage);
    this.stage = stage;
    const lights = new AmmoLights();
    this.sunlight = lights.light;

    this.ambientlight = lights.ambientlight;

    stage.scene.add(this.sunlight, this.ambientlight);
  }

  async init() {
    await super.init();
    this.sphere = new AmmoSphere();
    await this.sphere.init();
    console.log(this.sphere);
    this.stage.scene.add(this.sphere.model);

    this.cloth = new AmmoCloth();
    await this.cloth.init();
    this.cloth.model.rotateX(Math.PI * 0.5);
    this.cloth.model.translateZ(-3);
    this.stage.scene.add(this.cloth.model);
  }

  dispose() {
    this.sunlight.removeFromParent();
    this.ambientlight.removeFromParent();
  }
}
