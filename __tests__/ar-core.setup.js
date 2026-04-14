/**
 * ar-core.setup.js
 * Setup DOM global yang dibutuhkan oleh ar-core.js.
 * Di-import di awal setiap test file.
 *
 * Cara pakai di setiap test file:
 *   import './ar-core.setup';
 */

// ─── Buat elemen DOM minimal yang dibutuhkan ar-core.js ─────────────────────
export function setupARDom() {
  document.body.innerHTML = `
    <div id="landing"></div>
    <div id="ar-ui">
      <button id="btn-back">←</button>
      <button id="btn-reset-rot">↺</button>
      <div id="mode-badge"></div>
      <div id="placement-hint"></div>
      <div id="scale-panel">
        <div id="scale-value">1</div>
        <input type="range" id="scale-slider" min="1" max="5" step="0.1" value="1" />
        <div id="scale-label">SCALE</div>
      </div>
      <div id="rotation-panel">
        <div id="rotation-display">0°</div>
        <input type="range" id="rotation-slider" min="0" max="360" step="1" value="0" />
      </div>
      <div id="info-panel">
        <div id="info-title">AR Info</div>
        <div id="info-desc">Deskripsi</div>
      </div>
    </div>
    <div id="html-cursor">
      <div class="hcursor-outer"></div>
      <div class="hcursor-inner"></div>
      <div class="hcursor-dot"></div>
    </div>
    <div id="error-modal" class="modal-overlay hidden">
      <div class="modal-content">
        <p id="modal-message"></p>
        <button id="btn-modal-close">MENGERTI</button>
      </div>
    </div>
    <div id="model-group"></div>
    <div id="reticle"></div>
    <button id="btn-exit-page">← Kembali</button>
    <button id="btn-enter-ar">🥽 Mulai AR</button>
  `;

  // Mock elemen A-Frame scene dengan object3D minimal
  const scene = document.createElement("div");
  scene.id = "scene";
  scene.renderer = {
    xr: {
      enabled: false,
      isPresenting: false,
      setSession: jest.fn().mockResolvedValue(undefined),
      getCamera: jest.fn().mockReturnValue(null),
    },
    setAnimationLoop: jest.fn(),
  };
  scene.addEventListener = jest.fn((ev, cb, opts) => {
    if (ev === "renderstart") cb(); // langsung trigger
  });
  scene.exitVR = jest.fn();
  document.body.appendChild(scene);

  // Mock elemen model-group dan reticle dengan object3D A-Frame style
  const modelGroup = document.getElementById("model-group");
  modelGroup.setAttribute = jest.fn();
  modelGroup.object3D = { visible: false };

  const reticle = document.getElementById("reticle");
  reticle.object3D = { visible: false, position: {}, quaternion: {} };

  // Mock main-cam
  const cam = document.createElement("div");
  cam.id = "main-cam";
  cam.object3D = {
    getWorldPosition: jest.fn(),
    getWorldQuaternion: jest.fn(),
  };
  document.body.appendChild(cam);

  return { scene, modelGroup, reticle };
}

// ─── Mock AFRAME global ───────────────────────────────────────────────────────
global.AFRAME = {
  THREE: {
    Matrix4: class {
      fromArray() { return this; }
      decompose() {}
    },
    Vector3: class {
      constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
      clone() { return new global.AFRAME.THREE.Vector3(this.x, this.y, this.z); }
      copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; }
      add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
      applyQuaternion() { return this; }
    },
    Quaternion: class {
      clone() { return new global.AFRAME.THREE.Quaternion(); }
      copy() {}
    },
    Raycaster: class {
      setFromCamera() {}
      intersectObjects() { return []; }
    },
    Color: class {
      constructor(hex) { this.hex = hex; }
    },
  },
};

// ─── Mock navigator.xr ───────────────────────────────────────────────────────
global.navigator.xr = {
  isSessionSupported: jest.fn().mockResolvedValue(true),
  requestSession: jest.fn(),
};

// ─── Suppress console.warn dari A-Frame ──────────────────────────────────────
global.console.warn = jest.fn();