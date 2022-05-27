import * as THREE from 'three';
import Scenery from '../systems/Scenery.js';

export default class HeartScenery extends Scenery {
  constructor() {
    super();

    this.light = new THREE.DirectionalLight(0xffffff, 3);
    this.light.position.set(1, 1, 1).normalize();
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 512;
    this.light.shadow.mapSize.height = 512;
    this.light.shadow.camera.near = 0.5;
    this.light.shadow.camera.far = 500;
  }
}
