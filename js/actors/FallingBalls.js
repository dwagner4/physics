import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export default class FallingBalls {
  constructor(numBalls) {
    this.theBalls = [];
    this.lastBall = Date.now();
    this.ballcount = 0;
    this.numberOfBalls = numBalls;
  }

  async init() {
    this.createABall();
  }

  createABall(num) {
    const ballRadius = Math.random() * 0.2 + 0.1;
    const theBall = {};
    theBall.model = new THREE.Mesh(
      new THREE.SphereGeometry(ballRadius, 20, 20),
      new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff,
        metalness: 0.3,
        roughness: 0.4,
      })
    );
    theBall.model.name = `ball${num}`;
    theBall.model.castShadow = true;

    const shape = new CANNON.Sphere(ballRadius);
    theBall.body = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(
        Math.random() * 3 - 1.5,
        6,
        Math.random() * 3 - 1.5
      ),
      shape,
    });
    this.theBalls.push(theBall);
    // console.log(this.theBalls)
    return theBall;
  }

  update() {
    const currentTime = Date.now();
    const ballWait = currentTime - this.lastBall;
    if (ballWait > 200 && this.theBalls.length >= this.numberOfBalls) {
      this.theBalls[this.ballcount].body.position = new CANNON.Vec3(
        Math.random() * 3 - 1.5,
        6,
        Math.random() * 3 - 1.5
      );
      this.theBalls[this.ballcount].body.velocity = new CANNON.Vec3(0, 0, 0);
      // eslint-disable-next-line no-unused-expressions
      this.ballcount >= this.numberOfBalls - 1
        ? (this.ballcount = 0)
        : (this.ballcount += 1);
      this.lastBall = currentTime;
    }

    this.theBalls.forEach(b => {
      b.model.position.copy(b.body.position);
    });
  }

  dispose() {
    this.numberOfBalls = -1;
    this.theBalls.forEach(el => {
      el.model.geometry.dispose();
      el.model.material.dispose();
    });
    this.theBalls = [];
  }
}
