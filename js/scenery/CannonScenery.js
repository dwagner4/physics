import * as THREE from 'three';
import Scenery from '../systems/Scenery.js';

export default class HeartScenery extends Scenery {
  constructor() {
    super();

    this.pointlight = new THREE.PointLight(0xffaaaa, 0.5, 20);
    this.pointlight.name = 'point';
    this.pointlight.position.set(2, 2, 2);

    this.light = new THREE.DirectionalLight(0xffffff, 0.75);
    this.light.name = 'directionlight';
    this.light.position.set(10, 10, 10).normalize();
    this.light.castShadow = true;
    this.light.shadow.mapSize.width = 512;
    this.light.shadow.mapSize.height = 512;
    this.light.shadow.camera.near = 0.5;
    this.light.shadow.camera.far = 500;
  }
}
