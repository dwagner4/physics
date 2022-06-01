import * as THREE from 'three';
// import * as CANNON from 'cannon-es'

export default class AmmoCloth {
  constructor() {
    this.model = null;
    this.body = null;
  }

  async init() {
    this.clothGeometry = new THREE.PlaneGeometry(4, 3, 5, 5);
    this.clothMaterial = new THREE.MeshStandardMaterial({
      color: 0xcc3333,
      side: THREE.DoubleSide,
    });
    this.model = new THREE.Mesh(this.clothGeometry, this.clothMaterial);
  }

  update() {}

  dispose() {
    this.clothGeometry.dispose();
    this.clothMaterial.dispose();
  }
}
