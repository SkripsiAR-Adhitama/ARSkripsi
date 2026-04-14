/**
 * AR-CORE.JS — Logic scene AR (Integrated ES Module)
 * File ini digunakan untuk aplikasi AR dan juga untuk unit testing Jest.
 */

// Menangani referensi THREE/AFRAME agar aman di lingkungan Node (Jest) dan Browser
const T = (typeof window !== 'undefined' && window.AFRAME) 
  ? window.AFRAME.THREE 
  : (global.AFRAME ? global.AFRAME.THREE : null);

// ─── EXPORT STATE (Untuk Testing & Konsumsi Module) ──────────────────────────
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

// Helper untuk Testing (Inject state tanpa manipulasi manual)
export function _setState(patch) {
  if ("MODE" in patch) MODE = patch.MODE;
  if ("isARActive" in patch) isARActive = patch.isARActive;
  if ("modelPlaced" in patch) modelPlaced = patch.modelPlaced;
  if ("currentScale" in patch) currentScale = patch.currentScale;
  if ("currentRotY" in patch) currentRotY = patch.currentRotY;
}

// ─── FUNGSI UI & MODAL ────────────────────────────────────────────────────────
export function showModal(message, shouldGoBack = false) {
  const modal = document.getElementById("error-modal");
  const modalMsg = document.getElementById("modal-message");
  const modalBtn = document.getElementById("btn-modal-close");

  if (!modal || !modalMsg) return;

  modalMsg.textContent = message;
  modal.classList.remove("hidden");

  modalBtn.onclick = () => {
    modal.classList.add("hidden");
    if (shouldGoBack) window.history.back();
  };
}

export function showARUI() {
  document.getElementById("ar-ui").style.display = "block";
  document.getElementById("landing").classList.add("hidden");
  isARActive = true;
}

// ─── CORE AR LOGIC (Fungsi startAR Asli Tanpa Ubah Logika) ────────────────────
export async function startAR() {
  if (!navigator.xr) {
    showModal("WebXR tidak tersedia. Pastikan browser anda kompatibel.");
    return;
  }

  const ok = await navigator.xr
    .isSessionSupported("immersive-ar")
    .catch(() => false);

  if (!ok) {
    showModal("AR tidak didukung perangkat ini. Pastikan browser dan perangkat kompatibel.");
    return;
  }

  const arUI = document.getElementById("ar-ui");
  const init = {
    requiredFeatures: [],
    optionalFeatures: ["hit-test", "dom-overlay", "local-floor"],
    domOverlay: { root: arUI },
  };

  try {
    const session = await navigator.xr.requestSession("immersive-ar", init);
    const enabledFeatures = session.enabledFeatures ?? [];

    if (!enabledFeatures.includes("hit-test")) {
      showModal("Perangkat ini tidak mendukung fitur AR penuh.");
      session.end();
      window.history.back();
      return;
    }
    activeSession = session;
    session.addEventListener("end", onSessionEnd);
    const scene = document.getElementById("scene");
    scene.renderer.xr.enabled = true;
    await scene.renderer.xr.setSession(session);
    initARSession(session);
  } catch (e) {
    showModal("Gagal memulai sesi AR.");
    window.history.back();
  }
}

export function initARSession(session) {
  showARUI();
  setMode("placement");
  if (!session) return;

  const scene = document.getElementById("scene");
  const reticleEl = document.getElementById("reticle");
  const infoDesc = document.getElementById("info-desc");

  // Hit Test
  session.requestReferenceSpace("viewer").then((viewerSpace) => {
    session.requestHitTestSource({ space: viewerSpace }).then((src) => {
      hitTestSource = src;
    });
  });

  // Reference Space
  session.requestReferenceSpace("local-floor").then((ref) => {
    xrRefSpace = ref;
  }).catch(() => {
    session.requestReferenceSpace("local").then((ref) => {
      xrRefSpace = ref;
    });
  });

  // ✅ FIX UTAMA: tunggu renderer siap
  scene.addEventListener(
    "renderstart",
    () => {
      scene.renderer.setAnimationLoop((time, frame) => {
        if (!frame || !isARActive || !scene.renderer.xr.isPresenting) return;

        // ✅ Guard biar nggak error silent
        if (!reticleEl || !reticleEl.object3D) return;

        if (MODE === "placement" && hitTestSource && xrRefSpace) {
          const hits = frame.getHitTestResults(hitTestSource);

          if (hits.length > 0) {
            const pose = hits[0].getPose(xrRefSpace);

            if (pose) {
              const mat4 = new T.Matrix4().fromArray(pose.transform.matrix);
              const pos = new T.Vector3();
              const quat = new T.Quaternion();
              const scl = new T.Vector3();

              mat4.decompose(pos, quat, scl);

              lastHitPos = pos.clone();
              lastHitQuat = quat.clone();

              reticleEl.object3D.position.copy(pos);
              reticleEl.object3D.quaternion.copy(quat);
              reticleEl.object3D.visible = true;

              if (infoDesc) {
                infoDesc.textContent =
                  "✅ Permukaan terdeteksi! Ketuk untuk menempatkan organ.";
              }
            }
          } else {
            reticleEl.object3D.visible = false;

            if (!modelPlaced && infoDesc) {
              infoDesc.textContent =
                "🔍 Arahkan ke permukaan datar...";
            }
          }
        }

        if (MODE === "cursor") doCursorRaycast();
      });
    },
    { once: true }
  );
}

// ─── HANDLER & CONTROLS ───────────────────────────────────────────────────────
export function onSessionEnd() {
  isARActive = false;
  modelPlaced = false;
  hitTestSource = null;
  xrRefSpace = null;
  activeSession = null;

  document.getElementById("ar-ui").style.display = "none";
  document.getElementById("landing").classList.remove("hidden");
  document.getElementById("model-group").setAttribute("visible", "false");
  document.getElementById("reticle").object3D.visible = false;
  document.getElementById("placement-hint").classList.remove("hidden");

  setMode("placement");
  
  // Reset Skala & Rotasi UI
  currentScale = 1;
  document.getElementById("scale-slider").value = 1;
  document.getElementById("scale-value").textContent = "1";
  currentRotY = 0;
  document.getElementById("rotation-slider").value = 0;
  document.getElementById("rotation-display").textContent = "0°";
}

export function setMode(mode) {
  MODE = mode;
  const modeBadge = document.getElementById("mode-badge");
  const htmlCursor = document.getElementById("html-cursor");
  const placementHint = document.getElementById("placement-hint");
  const reticleEl = document.getElementById("reticle");

  if (mode === "placement") {
    modeBadge.textContent = "🎯 MODE PENEMPATAN";
    htmlCursor.classList.remove("active");
    placementHint.classList.remove("hidden");
    reticleEl.object3D.visible = true;
  } else {
    modeBadge.textContent = "👆 KETUK ORGAN UNTUK INFO";
    htmlCursor.classList.add("active");
    placementHint.classList.add("hidden");
    reticleEl.object3D.visible = false;
  }
  modeBadge.classList.add("show");
  setTimeout(() => modeBadge.classList.remove("show"), 2500);
}

// ─── ORGAN INTERACTION ────────────────────────────────────────────────────────
export function registerOrgan(aEntity) {
  const title = aEntity.dataset.title;
  const desc = aEntity.dataset.description;
  if (!title) return;
  aEntity.object3D.traverse((child) => {
    if (child.isMesh) meshToOrgan.set(child, { title, desc });
  });
}

export function highlightOrgan(organTitle) {
  clearHighlight();
  meshToOrgan.forEach((info, mesh) => {
    if (info.title === organTitle) {
      mesh.userData.originalEmissive = mesh.material.emissive?.clone();
      mesh.userData.originalEmissiveIntensity = mesh.material.emissiveIntensity;
      mesh.material.emissive = new T.Color(0x00aaff);
      mesh.material.emissiveIntensity = 0.6;
      mesh.material.needsUpdate = true;
      highlightedMeshes.push(mesh);
    }
  });
}

export function clearHighlight() {
  highlightedMeshes.forEach((mesh) => {
    if (mesh.userData.originalEmissive) {
      mesh.material.emissive = mesh.userData.originalEmissive;
      mesh.material.emissiveIntensity = mesh.userData.originalEmissiveIntensity ?? 0;
      mesh.material.needsUpdate = true;
    }
  });
  highlightedMeshes = [];
}

export function placeModel() {
  const modelGroup = document.getElementById("model-group");
  const reticleEl = document.getElementById("reticle");
  let px, py, pz;

  if (lastHitPos) {
    px = lastHitPos.x; py = lastHitPos.y; pz = lastHitPos.z;
  } else {
    const camObj = document.getElementById("main-cam").object3D;
    const wp = new T.Vector3();
    const wq = new T.Quaternion();
    camObj.getWorldPosition(wp);
    camObj.getWorldQuaternion(wq);
    const fwd = new T.Vector3(0, 0, -1.2).applyQuaternion(wq);
    const p = wp.clone().add(fwd);
    px = p.x; py = p.y - 0.2; pz = p.z;
  }

  placedPX = px; placedPY = py; placedPZ = pz;
  modelGroup.setAttribute("visible", "true");
  modelGroup.setAttribute("position", `${px} ${py} ${pz}`);
  modelGroup.setAttribute("rotation", `0 ${currentRotY} 0`);
  modelGroup.setAttribute("scale", `${currentScale} ${currentScale} ${currentScale}`);
  modelPlaced = true;

  reticleEl.object3D.visible = false;
  setTimeout(() => setMode("cursor"), 300);
}

// ─── RAYCAST & TOUCH ─────────────────────────────────────────────────────────
export function doCursorRaycast() {
  const htmlCursor = document.getElementById("html-cursor");
  const ray = new T.Raycaster();
  const scene = document.getElementById("scene");
  const cam = scene.renderer.xr.isPresenting
    ? scene.renderer.xr.getCamera()
    : document.getElementById("main-cam").object3D;
  
  if (!cam) return;
  ray.setFromCamera({ x: 0, y: 0 }, cam);
  const hits = ray.intersectObjects(Array.from(meshToOrgan.keys()), false);
  
  if (hits.length > 0) {
    const info = meshToOrgan.get(hits[0].object);
    if (info && info.title !== lastHoverInfo) {
      lastHoverInfo = info.title;
      hoveredOrgan = info;
      htmlCursor.classList.add("hit");
    }
  } else {
    lastHoverInfo = null;
    hoveredOrgan = null;
    htmlCursor.classList.remove("hit");
  }
}

export function handleTouch(evt) {
  if (!isARActive) return;
  const touch = evt.changedTouches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && document.getElementById("ar-ui").contains(target)) return;
  evt.preventDefault();

  if (MODE === "placement") {
    placeModel();
  } else if (hoveredOrgan) {
    const infoTitle = document.getElementById("info-title");
    const infoDesc = document.getElementById("info-desc");
    const infoPanel = document.getElementById("info-panel");
    infoTitle.textContent = hoveredOrgan.title;
    infoDesc.textContent = hoveredOrgan.desc;
    infoPanel.classList.add("flash");
    setTimeout(() => infoPanel.classList.remove("flash"), 600);
    highlightOrgan(hoveredOrgan.title);
  }
}

// ─── AUTO-INITIALIZATION (Hanya Jalan di Browser) ────────────────────────────
if (typeof window !== 'undefined') {
  window.startAR = startAR; // Ekspos ke global agar bisa dipanggil inline (opsional)

  document.addEventListener("DOMContentLoaded", () => {
    // Tombol Utama
    document.getElementById("btn-enter-ar")?.addEventListener("click", startAR);
    document.getElementById("btn-exit-page")?.addEventListener("click", () => window.history.back());
    document.getElementById("btn-back")?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (activeSession) activeSession.end();
      else onSessionEnd();
    });

    // Kontrol Slider
    document.getElementById("scale-slider")?.addEventListener("input", (e) => {
      e.stopPropagation();
      currentScale = parseFloat(e.target.value);
      document.getElementById("scale-value").textContent = currentScale.toFixed(1);
      if (modelPlaced) {
        const mg = document.getElementById("model-group");
        mg.setAttribute("scale", `${currentScale} ${currentScale} ${currentScale}`);
      }
    });

    document.getElementById("rotation-slider")?.addEventListener("input", (e) => {
      e.stopPropagation();
      currentRotY = parseInt(e.target.value);
      document.getElementById("rotation-display").textContent = currentRotY + "°";
      if (modelPlaced) document.getElementById("model-group").setAttribute("rotation", `0 ${currentRotY} 0`);
    });

    document.getElementById("btn-reset-rot")?.addEventListener("click", (e) => {
      e.stopPropagation();
      currentRotY = 0;
      document.getElementById("rotation-slider").value = 0;
      document.getElementById("rotation-display").textContent = "0°";
      if (modelPlaced) document.getElementById("model-group").setAttribute("rotation", "0 0 0");
    });

    // Model Loaded & Touch
    document.querySelectorAll(".organ").forEach((el) => {
      el.addEventListener("model-loaded", () => registerOrgan(el));
    });
    document.addEventListener("touchend", handleTouch, { passive: false });
  });
}