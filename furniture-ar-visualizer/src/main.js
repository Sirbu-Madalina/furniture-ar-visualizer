import { setupScene } from "./scene/setupScene.js";
import { createControls, resetControls } from "./scene/controls.js";
import { setAmbiance } from "./scene/ambiance.js";
import { loadChair, setFabricColor } from "./scene/loadChair.js";

const canvas = document.getElementById("scene");
const heroRight = document.querySelector(".hero-right");

const { scene, camera, renderer, hemiLight, dirLight } = setupScene(
  canvas,
  heroRight
);

const controls = createControls(camera, renderer);
controls.update();

let chairState = null;

loadChair(scene)
  .then((state) => {
    chairState = state;

    setFabricColor(chairState, "#7a7a7a"); // Grey
  })
  .catch((error) => {
    console.error(error);
  });

document.querySelectorAll(".ambiance-btn[data-ambiance]").forEach((btn) => {
  btn.addEventListener("click", () => {
    setAmbiance(btn.dataset.ambiance, scene, hemiLight, dirLight);
  });
});

document.getElementById("resetViewBtn").addEventListener("click", () => {
  resetControls(camera, controls);
});

document.getElementById("arBtn").addEventListener("click", () => {
  document.getElementById("ar-section").scrollIntoView({
    behavior: "smooth",
  });
});

document.querySelectorAll(".material-btn[data-fabric]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!chairState) return;
    setFabricColor(chairState, btn.dataset.fabric);
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