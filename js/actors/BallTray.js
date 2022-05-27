import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export default class BallTray {
  constructor() {
    this.model = null;
    this.body = null;
  }

  async init() {
    this.geometry = new THREE.BoxGeometry(6, 0.5, 6);
    this.material = new THREE.MeshStandardMaterial({
      color: 0x3388bb,
      roughness: 0.5,
      metalness: 0.5,
    });
    this.model = new THREE.Mesh(this.geometry, this.material);
    this.model.name = 'balltray';
    this.model.receiveShadow = true;

    const floorShape = new CANNON.Box(new CANNON.Vec3(3, 3, 0.25));
    this.body = new CANNON.Body();
    this.body.mass = 0;
    this.body.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
    );
    this.body.addShape(floorShape);
  }

  update() {}
}
