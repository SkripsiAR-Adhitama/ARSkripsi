// ═══════════════════════════════════════════════════
//  AR-CORE.JS — Shared logic untuk semua scene AR
//  Dipakai oleh: ar-pencernaan.html, ar-peredaran.html, ar-pernapasan.html
//
//  Sebelum <script src="ar-core.js"> di tiap HTML, definisikan:
//  const AR_SYSTEM_NAME = "Pencernaan"; // atau "Peredaran" / "Pernapasan"
// ═══════════════════════════════════════════════════

const T = AFRAME.THREE;

let MODE = "placement";
let isARActive = false;
let modelPlaced = false;
let currentScale = 1;
let currentRotY = 0;
let hitTestSource = null;
let xrRefSpace = null;
let lastHitPos = null;
let lastHitQuat = null;
let activeSession = null;
let placedPX = 0, placedPY = 0, placedPZ = 0;

const scene = document.getElementById("scene");
const modelGroup = document.getElementById("model-group");
const reticleEl = document.getElementById("reticle");
const arUI = document.getElementById("ar-ui");
const landing = document.getElementById("landing");
const placementHint = document.getElementById("placement-hint");
const htmlCursor = document.getElementById("html-cursor");
const modeBadge = document.getElementById("mode-badge");
const infoPanel = document.getElementById("info-panel");
const infoTitle = document.getElementById("info-title");
const infoDesc = document.getElementById("info-desc");
const scaleSlider = document.getElementById("scale-slider");
const scaleValue = document.getElementById("scale-value");
const rotSlider = document.getElementById("rotation-slider");
const rotDisplay = document.getElementById("rotation-display");

// ── Mesh → Organ Map ──────────────────────────────────
const meshToOrgan = new Map();

function registerOrgan(aEntity) {
  const title = aEntity.dataset.title;
  const desc = aEntity.dataset.description;
  if (!title) return;
  aEntity.object3D.traverse((child) => {
    if (child.isMesh) meshToOrgan.set(child, { title, desc });
  });
}

document.querySelectorAll(".organ").forEach((el) => {
  el.addEventListener("model-loaded", () => registerOrgan(el));
});

// ── Landing ───────────────────────────────────────────
document.getElementById("btn-enter-ar").addEventListener("click", startAR);
document.getElementById("btn-enter-vr").addEventListener("click", () => {
  scene.addEventListener("enter-vr", showARUI, { once: true });
  scene.enterVR();
});

async function startAR() {
  if (!navigator.xr) {
    alert("WebXR tidak tersedia. Gunakan Chrome terbaru di Android.");
    return;
  }
  const ok = await navigator.xr
    .isSessionSupported("immersive-ar")
    .catch(() => false);
  if (!ok) {
    alert("AR tidak didukung perangkat ini. Pastikan ARCore terinstall.");
    return;
  }

  const init = {
    requiredFeatures: ["hit-test"],
    optionalFeatures: ["dom-overlay", "local-floor"],
    domOverlay: { root: arUI },
  };

  try {
    const session = await navigator.xr.requestSession("immersive-ar", init);
    activeSession = session;
    session.addEventListener("end", onSessionEnd);
    scene.renderer.xr.enabled = true;
    await scene.renderer.xr.setSession(session);
    initARSession(session);
  } catch (e) {
    console.error("[AR] requestSession failed:", e);
    scene.addEventListener("enter-vr", () => initARSession(null), {
      once: true,
    });
    scene.enterAR();
  }
}

// ── AR Session Init ───────────────────────────────────
function initARSession(session) {
  showARUI();
  setMode("placement");
  if (!session) return;

  session.requestReferenceSpace("viewer").then((viewerSpace) => {
    session
      .requestHitTestSource({ space: viewerSpace })
      .then((src) => {
        hitTestSource = src;
      })
      .catch((e) => console.warn("[AR] hit-test unavailable:", e));
  });

  session
    .requestReferenceSpace("local-floor")
    .then((ref) => {
      xrRefSpace = ref;
    })
    .catch(() => {
      session
        .requestReferenceSpace("local")
        .then((ref) => {
          xrRefSpace = ref;
        })
        .catch((e) => console.warn("[AR] refSpace gagal:", e));
    });

  scene.addEventListener(
    "renderstart",
    () => {
      scene.renderer.setAnimationLoop((time, frame) => {
        if (!frame || !isARActive || !scene.renderer.xr.isPresenting) return;

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
              infoDesc.textContent =
                "✅ Permukaan terdeteksi! Ketuk untuk menempatkan organ.";
            }
          } else {
            reticleEl.object3D.visible = false;
            if (!modelPlaced)
              infoDesc.textContent = "🔍 Arahkan ke permukaan datar...";
          }
        }

        if (MODE === "cursor") doCursorRaycast();
      });
    },
    { once: true },
  );
}

function showARUI() {
  arUI.style.display = "block";
  landing.classList.add("hidden");
  isARActive = true;
}

function onSessionEnd() {
  isARActive = false;
  modelPlaced = false;
  hitTestSource = null;
  xrRefSpace = null;
  lastHitPos = null;
  lastHitQuat = null;
  activeSession = null;
  arUI.style.display = "none";
  htmlCursor.classList.remove("active");
  landing.classList.remove("hidden");
  modelGroup.setAttribute("visible", "false");
  reticleEl.object3D.visible = false;
  placementHint.classList.remove("hidden");
  setMode("placement");
  currentScale = 1;
  scaleSlider.value = 1;
  scaleValue.textContent = "1";
  currentRotY = 0;
  rotSlider.value = 0;
  rotDisplay.textContent = "0°";
}

scene.addEventListener("exit-vr", () => {
  if (isARActive) onSessionEnd();
});

// ── Mode ──────────────────────────────────────────────
function setMode(mode) {
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
      "🫀 Organ " +
      (typeof AR_SYSTEM_NAME !== "undefined" ? AR_SYSTEM_NAME : "");
    infoDesc.textContent = "Arahkan crosshair ke organ, lalu ketuk untuk info.";
    setTimeout(() => modeBadge.classList.remove("show"), 3000);
  }
}

// ── Back ──────────────────────────────────────────────
document.getElementById("btn-back").addEventListener("click", (e) => {
  e.stopPropagation();
  if (activeSession) activeSession.end();
  else {
    scene.exitVR();
    onSessionEnd();
  }
});

// ── Scale ─────────────────────────────────────────────
scaleSlider.addEventListener("input", (e) => {
  e.stopPropagation();
  currentScale = parseFloat(scaleSlider.value);
  scaleValue.textContent = currentScale.toFixed(1);
  if (modelPlaced) {
    modelGroup.setAttribute(
      "scale",
      `${currentScale} ${currentScale} ${currentScale}`,
    );
    modelGroup.setAttribute("position", `${placedPX} ${placedPY} ${placedPZ}`);
    modelGroup.setAttribute("rotation", `0 ${currentRotY} 0`);
  }
});

// ── Rotation ──────────────────────────────────────────
rotSlider.addEventListener("input", (e) => {
  e.stopPropagation();
  currentRotY = parseInt(rotSlider.value);
  rotDisplay.textContent = currentRotY + "°";
  if (modelPlaced)
    modelGroup.setAttribute("rotation", `0 ${currentRotY} 0`);
});

document.getElementById("btn-reset-rot").addEventListener("click", (e) => {
  e.stopPropagation();
  currentRotY = 0;
  rotSlider.value = 0;
  rotDisplay.textContent = "0°";
  if (modelPlaced) modelGroup.setAttribute("rotation", "0 0 0");
});

// ── Info Panel ────────────────────────────────────────
function showInfo(title, desc) {
  infoTitle.textContent = title;
  infoDesc.textContent = desc;
  infoPanel.classList.add("flash");
  setTimeout(() => infoPanel.classList.remove("flash"), 600);
}

// ── Raycast via meshToOrgan map ───────────────────────
function raycastOrgan(ndcX, ndcY) {
  if (meshToOrgan.size === 0) return null;
  const cam = scene.renderer.xr.isPresenting
    ? scene.renderer.xr.getCamera()
    : document.getElementById("main-cam").object3D;
  if (!cam) return null;
  const ray = new T.Raycaster();
  ray.setFromCamera({ x: ndcX, y: ndcY }, cam);
  const hits = ray.intersectObjects(Array.from(meshToOrgan.keys()), false);
  for (const hit of hits) {
    const info = meshToOrgan.get(hit.object);
    if (info) return info;
  }
  return null;
}

// ── Cursor hover ──────────────────────────────────────
let hoveredOrgan = null;
let lastHoverInfo = null;

function doCursorRaycast() {
  const info = raycastOrgan(0, 0);
  if (info) {
    if (info.title !== lastHoverInfo) {
      lastHoverInfo = info.title;
      hoveredOrgan = info;
      htmlCursor.classList.add("hit");
    }
  } else {
    if (lastHoverInfo !== null) {
      lastHoverInfo = null;
      hoveredOrgan = null;
      htmlCursor.classList.remove("hit");
    }
  }
}

// ── Touch ─────────────────────────────────────────────
arUI.querySelectorAll("input, button").forEach((el) => {
  ["touchstart", "touchend", "pointerdown", "pointerup"].forEach((ev) =>
    el.addEventListener(ev, (e) => e.stopPropagation(), { passive: false }),
  );
});

document.addEventListener("touchend", handleTouch, { passive: false });

function handleTouch(evt) {
  if (!isARActive) return;
  const touch = evt.changedTouches[0];
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
      const nx = (touch.clientX / window.innerWidth) * 2 - 1;
      const ny = -(touch.clientY / window.innerHeight) * 2 + 1;
      const info = raycastOrgan(nx, ny);
      if (info) showInfo(info.title, info.desc);
    }
  }
}

// ── Place Model ───────────────────────────────────────
function placeModel() {
  let px, py, pz;

  if (lastHitPos) {
    px = lastHitPos.x;
    py = lastHitPos.y;
    pz = lastHitPos.z;
  } else {
    const camObj = document.getElementById("main-cam").object3D;
    const wp = new T.Vector3();
    const wq = new T.Quaternion();
    camObj.getWorldPosition(wp);
    camObj.getWorldQuaternion(wq);
    const fwd = new T.Vector3(0, 0, -1.2).applyQuaternion(wq);
    const p = wp.clone().add(fwd);
    px = p.x;
    py = p.y - 0.2;
    pz = p.z;
  }

  // Simpan posisi untuk dipakai scale slider
  placedPX = px;
  placedPY = py;
  placedPZ = pz;

  modelGroup.setAttribute("visible", "true");
  modelGroup.setAttribute("position", `${px} ${py} ${pz}`);
  modelGroup.setAttribute("rotation", `0 ${currentRotY} 0`);
  modelGroup.setAttribute(
    "scale",
    `${currentScale} ${currentScale} ${currentScale}`,
  );
  modelPlaced = true;

  reticleEl.object3D.visible = false;
  setTimeout(() => setMode("cursor"), 300);
}