import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

const canvas = document.getElementById("scene");
const heroRight = document.querySelector(".hero-right");

const sizes = {
  width: heroRight.clientWidth,
  height: heroRight.clientHeight,
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

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 2.5;
controls.maxDistance = 8;
controls.target.set(-0.15, -0.2, 0);
controls.update();

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcfcfcf, 1.4);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
dirLight.position.set(5, 8, 6);
scene.add(dirLight);

let chairModel;

const loader = new GLTFLoader();

loader.load(
  "/models/chair.glb",
  (gltf) => {
    chairModel = gltf.scene;
    chairModel.scale.set(2.8, 2.8, 2.8);
    chairModel.position.set(-0.35, -1.35, 0);
    scene.add(chairModel);
  },
  undefined,
  (error) => {
    console.error("Error loading model:", error);
  }
);

function setAmbiance(mode) {
  const body = document.body;

  if (mode === "neutral") {
    scene.background = new THREE.Color(0xf5f5f5);
    hemiLight.intensity = 1.4;
    hemiLight.color.set(0xffffff);
    hemiLight.groundColor.set(0xcfcfcf);
    dirLight.intensity = 1.4;
    dirLight.color.set(0xffffff);
    body.style.background = "#f5f5f5";
    body.style.color = "#111";
  }

  if (mode === "warm") {
    scene.background = new THREE.Color(0xe8dcc8);
    hemiLight.intensity = 1.6;
    hemiLight.color.set(0xfff2d6);
    hemiLight.groundColor.set(0xd2b48c);
    dirLight.intensity = 1.2;
    dirLight.color.set(0xffe0b2);
    body.style.background = "#e8dcc8";
    body.style.color = "#111";
  }

  if (mode === "dark") {
    scene.background = new THREE.Color(0x2b2b2b);
    hemiLight.intensity = 0.8;
    hemiLight.color.set(0xbfc7d1);
    hemiLight.groundColor.set(0x111111);
    dirLight.intensity = 0.9;
    dirLight.color.set(0xffffff);
    body.style.background = "#2b2b2b";
    body.style.color = "#fff";
  }

  document.querySelectorAll(".ambiance-btn[data-ambiance]").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.ambiance === mode) {
      btn.classList.add("active");
    }
  });
}

document.querySelectorAll(".ambiance-btn[data-ambiance]").forEach((btn) => {
  btn.addEventListener("click", () => {
    setAmbiance(btn.dataset.ambiance);
  });
});

document.getElementById("resetViewBtn").addEventListener("click", () => {
  camera.position.set(-0.15, 1.1, 5.2);
  controls.target.set(-0.15, -0.2, 0);
  controls.update();
});

document.getElementById("arBtn").addEventListener("click", () => {
  document.getElementById("ar-section").scrollIntoView({
    behavior: "smooth",
  });
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  const newWidth = heroRight.clientWidth;
  const newHeight = heroRight.clientHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});