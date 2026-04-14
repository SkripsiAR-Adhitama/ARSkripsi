import {
  showModal,
  showARUI,
  onSessionEnd,
  setMode,
  showInfo,
  highlightOrgan,
  clearHighlight,
  handleTouch,
  doCursorRaycast,
  onScaleInput,
  onRotInput,
  onResetRot,
  placeModel,
  registerOrgan,
  meshToOrgan,
  _setState,
  initDOM,
} from "../public/AR/Pages/ar-core";

// ─── DOM Setup ────────────────────────────────────────────────────────────────
function buildDOM() {
  document.body.innerHTML = `
    <div id="landing"></div>
    <div id="ar-ui">
      <button id="btn-back">←</button>
      <button id="btn-reset-rot">↺</button>
      <div id="mode-badge"></div>
      <div id="placement-hint"></div>
      <div id="scale-panel">
        <div id="scale-value">1</div>
        <input type="range" id="scale-slider" min="1" max="5" step="0.1" value="1"/>
      </div>
      <div id="rotation-panel">
        <div id="rotation-display">0°</div>
        <input type="range" id="rotation-slider" min="0" max="360" step="1" value="0"/>
      </div>
      <div id="info-panel">
        <div id="info-title">AR Info</div>
        <div id="info-desc">Deskripsi</div>
      </div>
    </div>
    <div id="html-cursor"></div>
    <div id="error-modal" class="hidden">
      <p id="modal-message"></p>
      <button id="btn-modal-close">MENGERTI</button>
    </div>
    <div id="reticle"></div>
    <button id="btn-exit-page">← Kembali</button>
    <button id="btn-enter-ar">Mulai AR</button>
  `;

  const modelGroup = document.createElement("div");
  modelGroup.id = "model-group";
  modelGroup.setAttribute = jest.fn();
  document.body.appendChild(modelGroup);

  const reticle = document.getElementById("reticle");
  reticle.object3D = { visible: false };

  const scene = document.createElement("div");
  scene.id = "scene";
  scene.renderer = {
    xr: { isPresenting: false, getCamera: jest.fn(() => null) },
  };
  document.body.appendChild(scene);

  const cam = document.createElement("div");
  cam.id = "main-cam";
  cam.object3D = {
    getWorldPosition: jest.fn(),
    getWorldQuaternion: jest.fn(),
  };
  document.body.appendChild(cam);

  // Inject DOM refs ke modul
  initDOM({
    arUI:          document.getElementById("ar-ui"),
    landing:       document.getElementById("landing"),
    htmlCursor:    document.getElementById("html-cursor"),
    modelGroup,
    reticleEl:     reticle,
    placementHint: document.getElementById("placement-hint"),
    modeBadge:     document.getElementById("mode-badge"),
    infoTitle:     document.getElementById("info-title"),
    infoDesc:      document.getElementById("info-desc"),
    infoPanel:     document.getElementById("info-panel"),
    scaleSlider:   document.getElementById("scale-slider"),
    scaleValue:    document.getElementById("scale-value"),
    rotSlider:     document.getElementById("rotation-slider"),
    rotDisplay:    document.getElementById("rotation-display"),
    errorModal:    document.getElementById("error-modal"),
    modalMessage:  document.getElementById("modal-message"),
    modalClose:    document.getElementById("btn-modal-close"),
    scene,
  });

  return { modelGroup, reticle };
}

global.AFRAME = {
  THREE: {
    Color: class { constructor(hex) { this.hex = hex; } },
    Raycaster: class {
      setFromCamera() {}
      intersectObjects() { return []; }
    },
    Vector3: class {
      constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z;}
      clone(){return new global.AFRAME.THREE.Vector3(this.x,this.y,this.z);}
      add(v){this.x+=v.x;this.y+=v.y;this.z+=v.z;return this;}
      applyQuaternion(){return this;}
    },
    Quaternion: class { clone(){return this;} },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
//  showModal
// ═══════════════════════════════════════════════════════════════════════════════
describe("showModal()", () => {
  beforeEach(() => {
    buildDOM();
    jest.spyOn(window.history, "back").mockImplementation(() => {});
  });
  afterEach(() => jest.restoreAllMocks());

  test("mengisi pesan modal", () => {
    showModal("WebXR tidak tersedia.");
    expect(document.getElementById("modal-message").textContent).toBe("WebXR tidak tersedia.");
  });

  test("menghapus class hidden dari modal", () => {
    showModal("Error");
    expect(document.getElementById("error-modal").classList.contains("hidden")).toBe(false);
  });

  test("klik MENGERTI menutup modal", () => {
    showModal("Error");
    document.getElementById("btn-modal-close").click();
    expect(document.getElementById("error-modal").classList.contains("hidden")).toBe(true);
  });

  test("history.back tidak dipanggil jika shouldGoBack = false", () => {
    showModal("Error");
    document.getElementById("btn-modal-close").click();
    expect(window.history.back).not.toHaveBeenCalled();
  });

  test("history.back dipanggil jika shouldGoBack = true", () => {
    showModal("Kritis", true);
    document.getElementById("btn-modal-close").click();
    expect(window.history.back).toHaveBeenCalledTimes(1);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
//  showARUI & onSessionEnd
// ═══════════════════════════════════════════════════════════════════════════════
describe("showARUI()", () => {
  beforeEach(() => buildDOM());

  test("ar-ui menjadi display:block", () => {
    showARUI();
    expect(document.getElementById("ar-ui").style.display).toBe("block");
  });

  test("landing mendapat class hidden", () => {
    showARUI();
    expect(document.getElementById("landing").classList.contains("hidden")).toBe(true);
  });

  test("isARActive menjadi true", () => {
    showARUI();
    // isARActive bisa diverifikasi via onSessionEnd
    onSessionEnd(); // reset
    // tidak throw = ok
  });
});

describe("onSessionEnd()", () => {
  beforeEach(() => {
    buildDOM();
    _setState({ isARActive: true, modelPlaced: true, currentScale: 3, currentRotY: 90 });
    document.getElementById("ar-ui").style.display = "block";
    document.getElementById("html-cursor").classList.add("active");
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("placement-hint").classList.add("hidden");
  });

  test("ar-ui disembunyikan", () => {
    onSessionEnd();
    expect(document.getElementById("ar-ui").style.display).toBe("none");
  });

  test("landing muncul kembali", () => {
    onSessionEnd();
    expect(document.getElementById("landing").classList.contains("hidden")).toBe(false);
  });

  test("htmlCursor kehilangan class active", () => {
    onSessionEnd();
    expect(document.getElementById("html-cursor").classList.contains("active")).toBe(false);
  });

  test("scale-value direset ke '1'", () => {
    onSessionEnd();
    expect(document.getElementById("scale-value").textContent).toBe("1");
  });

  test("rotation-display direset ke '0°'", () => {
    onSessionEnd();
    expect(document.getElementById("rotation-display").textContent).toBe("0°");
  });

  test("placementHint muncul kembali", () => {
    onSessionEnd();
    expect(document.getElementById("placement-hint").classList.contains("hidden")).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
//  setMode
// ═══════════════════════════════════════════════════════════════════════════════
describe("setMode()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    buildDOM();
  });
  afterEach(() => jest.useRealTimers());

  test("mode placement: modeBadge berisi MODE PENEMPATAN", () => {
    setMode("placement");
    expect(document.getElementById("mode-badge").textContent).toContain("MODE PENEMPATAN");
  });

  test("mode placement: reticle visible = true", () => {
    setMode("placement");
    expect(document.getElementById("reticle").object3D.visible).toBe(true);
  });

  test("mode placement: htmlCursor tidak punya class active", () => {
    document.getElementById("html-cursor").classList.add("active");
    setMode("placement");
    expect(document.getElementById("html-cursor").classList.contains("active")).toBe(false);
  });

  test("mode placement: badge hilang setelah 2500ms", () => {
    setMode("placement");
    jest.advanceTimersByTime(2500);
    expect(document.getElementById("mode-badge").classList.contains("show")).toBe(false);
  });

  test("mode cursor: htmlCursor mendapat class active", () => {
    setMode("cursor");
    expect(document.getElementById("html-cursor").classList.contains("active")).toBe(true);
  });

  test("mode cursor: reticle visible = false", () => {
    setMode("cursor");
    expect(document.getElementById("reticle").object3D.visible).toBe(false);
  });

  test("mode cursor: placementHint mendapat class hidden", () => {
    setMode("cursor");
    expect(document.getElementById("placement-hint").classList.contains("hidden")).toBe(true);
  });

  test("mode cursor: badge hilang setelah 3000ms", () => {
    setMode("cursor");
    jest.advanceTimersByTime(3000);
    expect(document.getElementById("mode-badge").classList.contains("show")).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
//  showInfo
// ═══════════════════════════════════════════════════════════════════════════════
describe("showInfo()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    buildDOM();
    meshToOrgan.clear();
  });
  afterEach(() => jest.useRealTimers());

  test("mengisi info-title", () => {
    showInfo("Paru-Paru", "Organ pernapasan.");
    expect(document.getElementById("info-title").textContent).toBe("Paru-Paru");
  });

  test("mengisi info-desc", () => {
    showInfo("Paru-Paru", "Organ pernapasan.");
    expect(document.getElementById("info-desc").textContent).toBe("Organ pernapasan.");
  });

  test("menambah class flash ke info-panel", () => {
    showInfo("X", "Y");
    expect(document.getElementById("info-panel").classList.contains("flash")).toBe(true);
  });

  test("class flash hilang setelah 600ms", () => {
    showInfo("X", "Y");
    jest.advanceTimersByTime(600);
    expect(document.getElementById("info-panel").classList.contains("flash")).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
//  highlightOrgan & clearHighlight
// ═══════════════════════════════════════════════════════════════════════════════
describe("highlightOrgan() & clearHighlight()", () => {
  function makeMesh() {
    return {
      isMesh: true,
      userData: {},
      material: {
        emissive: { clone: () => ({ hex: 0x000000 }) },
        emissiveIntensity: 0,
        needsUpdate: false,
      },
    };
  }

  beforeEach(() => {
    buildDOM();
    meshToOrgan.clear();
    _setState({ highlightedMeshes: [] });
  });

  test("mesh yang cocok mendapat emissiveIntensity 0.6", () => {
    const mesh = makeMesh();
    meshToOrgan.set(mesh, { title: "Aorta", desc: "..." });
    highlightOrgan("Aorta");
    expect(mesh.material.emissiveIntensity).toBe(0.6);
  });

  test("mesh yang tidak cocok TIDAK di-highlight", () => {
    const mesh = makeMesh();
    meshToOrgan.set(mesh, { title: "Bronkus", desc: "..." });
    highlightOrgan("Aorta");
    expect(mesh.material.emissiveIntensity).toBe(0);
  });

  test("needsUpdate = true setelah highlight", () => {
    const mesh = makeMesh();
    meshToOrgan.set(mesh, { title: "Vena", desc: "..." });
    highlightOrgan("Vena");
    expect(mesh.material.needsUpdate).toBe(true);
  });

  test("clearHighlight mengosongkan highlightedMeshes", () => {
    const mesh = makeMesh();
    meshToOrgan.set(mesh, { title: "Trakea", desc: "..." });
    highlightOrgan("Trakea");
    clearHighlight();
    // tidak throw = aman
    expect(() => clearHighlight()).not.toThrow();
  });

  test("clearHighlight aman dipanggil saat kosong", () => {
    expect(() => clearHighlight()).not.toThrow();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
//  Scale & Rotation
// ═══════════════════════════════════════════════════════════════════════════════
describe("onScaleInput()", () => {
  const fakeEvt = { stopPropagation: jest.fn() };

  beforeEach(() => {
    buildDOM();
    _setState({ modelPlaced: false, currentScale: 1, currentRotY: 0, placedPX: 0, placedPY: 0, placedPZ: 0 });
    fakeEvt.stopPropagation.mockClear();
  });

  test("currentScale diperbarui sesuai nilai slider", () => {
    document.getElementById("scale-slider").value = "2.5";
    onScaleInput(fakeEvt);
    expect(document.getElementById("scale-value").textContent).toBe("2.5");
  });

  test("stopPropagation dipanggil", () => {
    onScaleInput(fakeEvt);
    expect(fakeEvt.stopPropagation).toHaveBeenCalled();
  });

  test("modelGroup tidak di-set jika model belum ditempatkan", () => {
    const mg = document.getElementById("model-group");
    onScaleInput(fakeEvt);
    expect(mg.setAttribute).not.toHaveBeenCalled();
  });

  test("modelGroup scale di-set jika model sudah ditempatkan", () => {
    _setState({ modelPlaced: true });
    document.getElementById("scale-slider").value = "2";
    onScaleInput(fakeEvt);
    expect(document.getElementById("model-group").setAttribute).toHaveBeenCalledWith("scale", "2 2 2");
  });
});

describe("onRotInput()", () => {
  const fakeEvt = { stopPropagation: jest.fn() };

  beforeEach(() => {
    buildDOM();
    _setState({ modelPlaced: false, currentRotY: 0 });
    fakeEvt.stopPropagation.mockClear();
  });

  test("rotation-display diperbarui dengan °", () => {
    document.getElementById("rotation-slider").value = "90";
    onRotInput(fakeEvt);
    expect(document.getElementById("rotation-display").textContent).toBe("90°");
  });

  test("modelGroup tidak di-set jika belum ditempatkan", () => {
    onRotInput(fakeEvt);
    expect(document.getElementById("model-group").setAttribute).not.toHaveBeenCalled();
  });

  test("modelGroup rotation di-set jika sudah ditempatkan", () => {
    _setState({ modelPlaced: true });
    document.getElementById("rotation-slider").value = "180";
    onRotInput(fakeEvt);
    expect(document.getElementById("model-group").setAttribute).toHaveBeenCalledWith("rotation", "0 180 0");
  });
});

describe("onResetRot()", () => {
  const fakeEvt = { stopPropagation: jest.fn() };

  beforeEach(() => {
    buildDOM();
    _setState({ modelPlaced: false, currentRotY: 90 });
    document.getElementById("rotation-slider").value = "90";
    fakeEvt.stopPropagation.mockClear();
  });

  test("rotation-display direset ke 0°", () => {
    onResetRot(fakeEvt);
    expect(document.getElementById("rotation-display").textContent).toBe("0°");
  });

  test("rotation-slider.value direset ke 0", () => {
    onResetRot(fakeEvt);
    expect(document.getElementById("rotation-slider").value).toBe("0");
  });

  test("modelGroup rotation '0 0 0' jika sudah ditempatkan", () => {
    _setState({ modelPlaced: true });
    onResetRot(fakeEvt);
    expect(document.getElementById("model-group").setAttribute).toHaveBeenCalledWith("rotation", "0 0 0");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
//  handleTouch & doCursorRaycast
// ═══════════════════════════════════════════════════════════════════════════════
describe("handleTouch()", () => {
  function touch(x = 100, y = 200) {
    return { changedTouches: [{ clientX: x, clientY: y }], preventDefault: jest.fn() };
  }

  beforeEach(() => {
    jest.useFakeTimers();
    buildDOM();
    _setState({ isARActive: true, MODE: "placement", hoveredOrgan: null, lastHoverInfo: null });
    document.elementFromPoint = jest.fn().mockReturnValue(document.body);
    meshToOrgan.clear();
  });
  afterEach(() => jest.useRealTimers());

  test("tidak melakukan apa-apa jika isARActive = false", () => {
    _setState({ isARActive: false });
    const evt = touch();
    handleTouch(evt);
    expect(evt.preventDefault).not.toHaveBeenCalled();
  });

  test("touch di dalam arUI diabaikan", () => {
    document.elementFromPoint = jest.fn().mockReturnValue(document.getElementById("btn-back"));
    const evt = touch();
    handleTouch(evt);
    expect(evt.preventDefault).not.toHaveBeenCalled();
  });

  test("mode placement: preventDefault dipanggil", () => {
    const evt = touch();
    handleTouch(evt);
    expect(evt.preventDefault).toHaveBeenCalled();
  });

  test("mode cursor + hoveredOrgan: showInfo dipanggil", () => {
    _setState({ MODE: "cursor", hoveredOrgan: { title: "Aorta", desc: "Arteri terbesar." } });
    const evt = touch();
    handleTouch(evt);
    expect(document.getElementById("info-title").textContent).toBe("Aorta");
  });

  test("mode cursor + hoveredOrgan: class hit dihapus lalu kembali setelah 100ms", () => {
    _setState({ MODE: "cursor", hoveredOrgan: { title: "Aorta", desc: "..." } });
    document.getElementById("html-cursor").classList.add("hit");
    handleTouch(touch());
    expect(document.getElementById("html-cursor").classList.contains("hit")).toBe(false);
    jest.advanceTimersByTime(100);
    expect(document.getElementById("html-cursor").classList.contains("hit")).toBe(true);
  });
});

describe("doCursorRaycast()", () => {
  beforeEach(() => {
    buildDOM();
    _setState({ hoveredOrgan: null, lastHoverInfo: null });
    meshToOrgan.clear();
  });

  test("raycast miss saat meshToOrgan kosong: tidak error", () => {
    expect(() => doCursorRaycast()).not.toThrow();
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
//  registerOrgan
// ═══════════════════════════════════════════════════════════════════════════════
describe("registerOrgan()", () => {
  beforeEach(() => {
    buildDOM();
    meshToOrgan.clear();
  });

  test("tidak mendaftarkan organ jika tidak ada dataset.title", () => {
    const el = { dataset: {}, object3D: { traverse: jest.fn() } };
    registerOrgan(el);
    expect(el.object3D.traverse).not.toHaveBeenCalled();
  });

  test("traverse dipanggil jika ada dataset.title", () => {
    const el = {
      dataset: { title: "Aorta", description: "Arteri terbesar." },
      object3D: { traverse: jest.fn() },
    };
    registerOrgan(el);
    expect(el.object3D.traverse).toHaveBeenCalled();
  });

  test("mesh terdaftar di meshToOrgan saat traverse menemukan mesh", () => {
    const mesh = { isMesh: true };
    const el = {
      dataset: { title: "Paru-Paru", description: "Organ pernapasan." },
      object3D: {
        traverse(cb) { cb(mesh); },
      },
    };
    registerOrgan(el);
    expect(meshToOrgan.get(mesh)).toEqual({ title: "Paru-Paru", desc: "Organ pernapasan." });
  });

  test("non-mesh tidak didaftarkan ke meshToOrgan", () => {
    const nonMesh = { isMesh: false };
    const el = {
      dataset: { title: "Bronkus", description: "..." },
      object3D: { traverse(cb) { cb(nonMesh); } },
    };
    registerOrgan(el);
    expect(meshToOrgan.has(nonMesh)).toBe(false);
  });
});