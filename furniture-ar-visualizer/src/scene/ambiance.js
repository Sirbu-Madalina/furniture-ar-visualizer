import * as THREE from "three";

export function setAmbiance(mode, scene, hemiLight, dirLight) {
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