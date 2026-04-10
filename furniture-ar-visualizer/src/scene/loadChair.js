import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadChair(scene) {
  const loader = new GLTFLoader();

  const state = {
    chairModel: null,
    meshes: [],
  };

  return new Promise((resolve, reject) => {
    loader.load(
      "/models/chair.glb",
      (gltf) => {
        const chairModel = gltf.scene;
        chairModel.scale.set(2.8, 2.8, 2.8);
        chairModel.position.set(-0.35, -1.35, 0);

        chairModel.traverse((child) => {
          if (!child.isMesh) return;
          state.meshes.push(child);
        });

        state.chairModel = chairModel;
        scene.add(chairModel);

        resolve(state);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
        reject(error);
      }
    );
  });
}

function applyColorToMeshes(meshes, colorHex) {
  meshes.forEach((mesh) => {
    if (!mesh.material) return;

    mesh.material = mesh.material.clone();
    mesh.material.color.set(colorHex);
    mesh.material.needsUpdate = true;
  });
}

export function setFabricColor(state, colorHex) {
  applyColorToMeshes(state.meshes, colorHex);

  document.querySelectorAll(".material-btn[data-fabric]").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.fabric === colorHex) {
      btn.classList.add("active");
    }
  });
}