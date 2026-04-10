import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 2.5;
  controls.maxDistance = 8;
  controls.target.set(-0.15, -0.2, 0);

  return controls;
}

export function resetControls(camera, controls) {
  camera.position.set(-0.15, 1.1, 5.2);
  controls.target.set(-0.15, -0.2, 0);
  controls.update();
}