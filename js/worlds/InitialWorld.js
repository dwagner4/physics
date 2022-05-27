import * as THREE from 'three';
import World from '../systems/World.js';

import CannonScenery from '../scenery/CannonScenery.js';

import BallTray from '../actors/BallTray.js';
import FallingBalls from '../actors/FallingBalls.js';

export default class InitialWorld extends World {
  constructor(stage) {
    super(stage);
    this.stage = stage;
    this.stage.enablePhysics();
    this.stage.camera.position.set(0, 3, 16);
    this.stage.scene.background = new THREE.Color(0x003049);

    this.cannonscene = new CannonScenery();
    this.light = this.cannonscene.light;
    this.pointlight = this.cannonscene.pointlight;
    this.stage.scene.add(this.pointlight, this.light);

    this.balltray = {};
  }

  async init() {
    await super.init();

    this.balltray = new BallTray();
    await this.balltray.init();
    this.stage.scene.add(this.balltray.model);
    this.stage.physWorld.addBody(this.balltray.body);

    this.balls = new FallingBalls(200);
    this.objectsToUpdate.push(this.balls);
  }

  update(time) {
    if (this.balls.theBalls.length < this.balls.numberOfBalls) {
      const nextBall = this.balls.createABall(this.balls.theBalls.length);
      this.stage.scene.add(nextBall.model);
      this.stage.physWorld.addBody(nextBall.body);
    }
    super.update(time);
  }

  dispose() {
    this.stage.disableVR();
    this.pointlight.removeFromParent();
    this.light.removeFromParent();
    this.balltray.model.geometry.dispose();
    this.balltray.model.material.dispose();
    this.balltray.model.removeFromParent();

    this.balls.theBalls.forEach(b => b.model.removeFromParent());
    this.balls.dispose();
    // this.balls.removeFromParent()
  }
}
