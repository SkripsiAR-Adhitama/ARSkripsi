/**
 * ar-core.js (ES Module version)
 * Refactor dari vanilla script global menjadi ES module
 * agar bisa di-import oleh Jest dan diukur coverage-nya.
 *
 * Di HTML, ganti:
 *   <script src="ar-core.js"></script>
 * Menjadi:
 *   <script type="module" src="ar-core.js"></script>
 */

export let MODE = "placement";
export let isARActive = false;
export let modelPlaced = false;
export let currentScale = 1;
export let currentRotY = 0;
export let hitTestSource = null;
export let xrRefSpace = null;
export let lastHitPos = null;
export let lastHitQuat = null;
export let activeSession = null;
export let placedPX = 0, placedPY = 0, placedPZ = 0;
export let highlightedMeshes = [];
export let hoveredOrgan = null;
export let lastHoverInfo = null;
export const meshToOrgan = new Map();


export function _setState(patch) {
  if ("MODE"              in patch) MODE              = patch.MODE;
  if ("isARActive"        in patch) isARActive        = patch.isARActive;
  if ("modelPlaced"       in patch) modelPlaced       = patch.modelPlaced;
  if ("currentScale"      in patch) currentScale      = patch.currentScale;
  if ("currentRotY"       in patch) currentRotY       = patch.currentRotY;
  if ("hitTestSource"     in patch) hitTestSource     = patch.hitTestSource;
  if ("xrRefSpace"        in patch) xrRefSpace        = patch.xrRefSpace;
  if ("lastHitPos"        in patch) lastHitPos        = patch.lastHitPos;
  if ("lastHitQuat"       in patch) lastHitQuat       = patch.lastHitQuat;
  if ("activeSession"     in patch) activeSession     = patch.activeSession;
  if ("placedPX"          in patch) placedPX          = patch.placedPX;
  if ("placedPY"          in patch) placedPY          = patch.placedPY;
  if ("placedPZ"          in patch) placedPZ          = patch.placedPZ;
  if ("highlightedMeshes" in patch) highlightedMeshes = patch.highlightedMeshes;
  if ("hoveredOrgan"      in patch) hoveredOrgan      = patch.hoveredOrgan;
  if ("lastHoverInfo"     in patch) lastHoverInfo     = patch.lastHoverInfo;
}

let _dom = {};
export function initDOM(refs) {
  _dom = refs;
}

export function showModal(message, shouldGoBack = false) {
  const modal    = _dom.errorModal    || document.getElementById("error-modal");
  const modalMsg = _dom.modalMessage  || document.getElementById("modal-message");
  const modalBtn = _dom.modalClose    || document.getElementById("btn-modal-close");

  modalMsg.textContent = message;
  modal.classList.remove("hidden");

  modalBtn.onclick = () => {
    modal.classList.add("hidden");
    if (shouldGoBack) window.history.back();
  };
}

export function showARUI() {
  const arUI   = _dom.arUI   || document.getElementById("ar-ui");
  const landing = _dom.landing || document.getElementById("landing");
  arUI.style.display = "block";
  landing.classList.add("hidden");
  isARActive = true;
}

export function onSessionEnd() {
  const arUI          = _dom.arUI          || document.getElementById("ar-ui");
  const landing       = _dom.landing       || document.getElementById("landing");
  const htmlCursor    = _dom.htmlCursor    || document.getElementById("html-cursor");
  const modelGroup    = _dom.modelGroup    || document.getElementById("model-group");
  const reticleEl     = _dom.reticleEl     || document.getElementById("reticle");
  const placementHint = _dom.placementHint || document.getElementById("placement-hint");
  const scaleSlider   = _dom.scaleSlider   || document.getElementById("scale-slider");
  const scaleValue    = _dom.scaleValue    || document.getElementById("scale-value");
  const rotSlider     = _dom.rotSlider     || document.getElementById("rotation-slider");
  const rotDisplay    = _dom.rotDisplay    || document.getElementById("rotation-display");

  isARActive    = false;
  modelPlaced   = false;
  hitTestSource = null;
  xrRefSpace    = null;
  lastHitPos    = null;
  lastHitQuat   = null;
  activeSession = null;

  arUI.style.display = "none";
  htmlCursor.classList.remove("active");
  landing.classList.remove("hidden");
  modelGroup.setAttribute("visible", "false");
  reticleEl.object3D.visible = false;
  placementHint.classList.remove("hidden");

  setMode("placement");

  currentScale          = 1;
  scaleSlider.value     = 1;
  scaleValue.textContent = "1";
  currentRotY           = 0;
  rotSlider.value       = 0;
  rotDisplay.textContent = "0°";
}

export function setMode(mode) {
  const modeBadge     = _dom.modeBadge     || document.getElementById("mode-badge");
  const htmlCursor    = _dom.htmlCursor    || document.getElementById("html-cursor");
  const placementHint = _dom.placementHint || document.getElementById("placement-hint");
  const reticleEl     = _dom.reticleEl     || document.getElementById("reticle");
  const infoTitle     = _dom.infoTitle     || document.getElementById("info-title");
  const infoDesc      = _dom.infoDesc      || document.getElementById("info-desc");

  MODE = mode;

  if (mode === "placement") {
    modeBadge.textContent = "🎯 MODE PENEMPATAN";
    modeBadge.classList.add("show");
    htmlCursor.classList.remove("active");
    placementHint.classList.remove("hidden");
    reticleEl.object3D.visible = true;
    setTimeout(() => modeBadge.classList.remove("show"), 2500);
  } else {
    modeBadge.textContent = "👆 KETUK ORGAN UNTUK INFO";
    modeBadge.classList.add("show");
    htmlCursor.classList.add("active");
    placementHint.classList.add("hidden");
    reticleEl.object3D.visible = false;
    infoTitle.textContent =
      "🫀 Organ " + (typeof AR_SYSTEM_NAME !== "undefined" ? AR_SYSTEM_NAME : "");
    infoDesc.textContent = "Arahkan crosshair ke organ, lalu ketuk untuk info.";
    setTimeout(() => modeBadge.classList.remove("show"), 3000);
  }
}

export function showInfo(title, desc) {
  const infoTitle = _dom.infoTitle || document.getElementById("info-title");
  const infoDesc  = _dom.infoDesc  || document.getElementById("info-desc");
  const infoPanel = _dom.infoPanel || document.getElementById("info-panel");

  infoTitle.textContent = title;
  infoDesc.textContent  = desc;
  infoPanel.classList.add("flash");
  setTimeout(() => infoPanel.classList.remove("flash"), 600);
  highlightOrgan(title);
}

export function highlightOrgan(organTitle) {
  clearHighlight();
  meshToOrgan.forEach((info, mesh) => {
    if (info.title === organTitle) {
      mesh.userData.originalEmissive          = mesh.material.emissive?.clone();
      mesh.userData.originalEmissiveIntensity = mesh.material.emissiveIntensity;
      mesh.material.emissive                  = new (window.AFRAME || global.AFRAME).THREE.Color(0x00aaff);
      mesh.material.emissiveIntensity         = 0.6;
      mesh.material.needsUpdate               = true;
      highlightedMeshes.push(mesh);
    }
  });
}

export function clearHighlight() {
  highlightedMeshes.forEach((mesh) => {
    if (mesh.userData.originalEmissive) {
      mesh.material.emissive          = mesh.userData.originalEmissive;
      mesh.material.emissiveIntensity = mesh.userData.originalEmissiveIntensity ?? 0;
      mesh.material.needsUpdate       = true;
    }
  });
  highlightedMeshes = [];
}

export function onScaleInput(e) {
  const scaleSlider  = _dom.scaleSlider  || document.getElementById("scale-slider");
  const scaleValue   = _dom.scaleValue   || document.getElementById("scale-value");
  const modelGroup   = _dom.modelGroup   || document.getElementById("model-group");

  e.stopPropagation();
  currentScale = parseFloat(scaleSlider.value);
  scaleValue.textContent = currentScale.toFixed(1);

  if (modelPlaced) {
    modelGroup.setAttribute("scale",    `${currentScale} ${currentScale} ${currentScale}`);
    modelGroup.setAttribute("position", `${placedPX} ${placedPY} ${placedPZ}`);
    modelGroup.setAttribute("rotation", `0 ${currentRotY} 0`);
  }
}

// ─── Rotation ─────────────────────────────────────────────────────────────────
export function onRotInput(e) {
  const rotSlider  = _dom.rotSlider  || document.getElementById("rotation-slider");
  const rotDisplay = _dom.rotDisplay || document.getElementById("rotation-display");
  const modelGroup = _dom.modelGroup || document.getElementById("model-group");

  e.stopPropagation();
  currentRotY = parseInt(rotSlider.value);
  rotDisplay.textContent = currentRotY + "°";
  if (modelPlaced) modelGroup.setAttribute("rotation", `0 ${currentRotY} 0`);
}

export function onResetRot(e) {
  const rotSlider  = _dom.rotSlider  || document.getElementById("rotation-slider");
  const rotDisplay = _dom.rotDisplay || document.getElementById("rotation-display");
  const modelGroup = _dom.modelGroup || document.getElementById("model-group");

  e.stopPropagation();
  currentRotY            = 0;
  rotSlider.value        = 0;
  rotDisplay.textContent = "0°";
  if (modelPlaced) modelGroup.setAttribute("rotation", "0 0 0");
}

export function handleTouch(evt) {
  const arUI      = _dom.arUI      || document.getElementById("ar-ui");
  const htmlCursor = _dom.htmlCursor || document.getElementById("html-cursor");

  if (!isARActive) return;
  const touch  = evt.changedTouches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && arUI.contains(target)) return;
  evt.preventDefault();

  if (MODE === "placement") {
    placeModel();
  } else {
    if (hoveredOrgan) {
      showInfo(hoveredOrgan.title, hoveredOrgan.desc);
      htmlCursor.classList.remove("hit");
      setTimeout(() => {
        if (hoveredOrgan) htmlCursor.classList.add("hit");
      }, 100);
    } else {
      const nx   = (touch.clientX / window.innerWidth) * 2 - 1;
      const ny   = -(touch.clientY / window.innerHeight) * 2 + 1;
      const info = raycastOrgan(nx, ny);
      if (info) showInfo(info.title, info.desc);
    }
  }
}

export function doCursorRaycast() {
  const htmlCursor = _dom.htmlCursor || document.getElementById("html-cursor");
  const info = raycastOrgan(0, 0);

  if (info) {
    if (info.title !== lastHoverInfo) {
      lastHoverInfo = info.title;
      hoveredOrgan  = info;
      htmlCursor.classList.add("hit");
    }
  } else {
    if (lastHoverInfo !== null) {
      lastHoverInfo = null;
      hoveredOrgan  = null;
      htmlCursor.classList.remove("hit");
    }
  }
}

export function raycastOrgan(ndcX, ndcY) {
  if (meshToOrgan.size === 0) return null;
  const T   = (window.AFRAME || global.AFRAME).THREE;
  const scene = _dom.scene || document.getElementById("scene");
  const cam = scene.renderer.xr.isPresenting
    ? scene.renderer.xr.getCamera()
    : document.getElementById("main-cam").object3D;
  if (!cam) return null;

  const ray  = new T.Raycaster();
  ray.setFromCamera({ x: ndcX, y: ndcY }, cam);
  const hits = ray.intersectObjects(Array.from(meshToOrgan.keys()), false);
  for (const hit of hits) {
    const info = meshToOrgan.get(hit.object);
    if (info) return info;
  }
  return null;
}

// ─── Place Model ──────────────────────────────────────────────────────────────
export function placeModel() {
  const T          = (window.AFRAME || global.AFRAME).THREE;
  const modelGroup = _dom.modelGroup || document.getElementById("model-group");
  const reticleEl  = _dom.reticleEl  || document.getElementById("reticle");

  let px, py, pz;

  if (lastHitPos) {
    px = lastHitPos.x;
    py = lastHitPos.y;
    pz = lastHitPos.z;
  } else {
    const camObj = document.getElementById("main-cam").object3D;
    const wp  = new T.Vector3();
    const wq  = new T.Quaternion();
    camObj.getWorldPosition(wp);
    camObj.getWorldQuaternion(wq);
    const fwd = new T.Vector3(0, 0, -1.2).applyQuaternion(wq);
    const p   = wp.clone().add(fwd);
    px = p.x; py = p.y - 0.2; pz = p.z;
  }

  placedPX = px; placedPY = py; placedPZ = pz;

  modelGroup.setAttribute("visible",  "true");
  modelGroup.setAttribute("position", `${px} ${py} ${pz}`);
  modelGroup.setAttribute("rotation", `0 ${currentRotY} 0`);
  modelGroup.setAttribute("scale",    `${currentScale} ${currentScale} ${currentScale}`);
  modelPlaced = true;

  reticleEl.object3D.visible = false;
  setTimeout(() => setMode("cursor"), 300);
}

export function registerOrgan(aEntity) {
  const title = aEntity.dataset.title;
  const desc  = aEntity.dataset.description;
  if (!title) return;
  aEntity.object3D.traverse((child) => {
    if (child.isMesh) meshToOrgan.set(child, { title, desc });
  });
}