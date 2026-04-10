import * as THREE from "three";

export function setupScene(canvas, container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f5);

  const sizes = {
    width: container.clientWidth,
    height: container.clientHeight,
  };

  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(-0.15, 1.1, 5.2);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcfcfcf, 1.4);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
  dirLight.position.set(5, 8, 6);
  scene.add(dirLight);

  const shadowPlane = new THREE.Mesh(
    new THREE.CircleGeometry(1.35, 32),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.08,
    })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.set(-0.1, -1.38, 0.1);
  shadowPlane.scale.set(1.3, 0.8, 1);
  scene.add(shadowPlane);

  return {
    scene,
    camera,
    renderer,
    hemiLight,
    dirLight,
    sizes,
  };
}