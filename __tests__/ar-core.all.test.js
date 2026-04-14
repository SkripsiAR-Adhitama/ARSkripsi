/**
 * FIXED VERSION — NO CHANGE di ar-core.js
 * Strategy:
 * - NO top-level import
 * - pakai jest.resetModules()
 * - require setelah DOM siap
 */

let arCore;

// ─── Mock AFRAME GLOBAL ─────────────────────────────────────────
global.AFRAME = {
  THREE: {
    Color: class { constructor(hex) { this.hex = hex; } },
    Raycaster: class {
      setFromCamera() {}
      intersectObjects() { return []; }
    },
    Vector3: class {
      constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z;}
      clone(){ return new global.AFRAME.THREE.Vector3(this.x,this.y,this.z); }
      add(v){ this.x+=v.x;this.y+=v.y;this.z+=v.z; return this;}
      applyQuaternion(){ return this; }
      copy(v){ this.x=v.x;this.y=v.y;this.z=v.z; }
    },
    Quaternion: class { clone(){return this;} copy(){} },
    Matrix4: class { fromArray(){return this;} decompose(){} },
  },
};

// ─── BUILD DOM ─────────────────────────────────────────
function buildBaseDOM() {
  document.body.innerHTML = `
    <div id="landing"></div>
    <div id="ar-ui">
      <button id="btn-back"></button>
      <button id="btn-reset-rot"></button>
      <div id="mode-badge"></div>
      <div id="placement-hint"></div>
      <div id="scale-value">1</div>
      <input id="scale-slider" type="range" value="1"/>
      <div id="rotation-display">0°</div>
      <input id="rotation-slider" type="range" value="0"/>
      <div id="info-panel">
        <div id="info-title">AR Info</div>
        <div id="info-desc">Deskripsi</div>
      </div>
    </div>
    <div id="html-cursor"></div>
    <div id="error-modal" class="hidden">
      <p id="modal-message"></p>
      <button id="btn-modal-close"></button>
    </div>
    <button id="btn-exit-page"></button>
    <button id="btn-enter-ar"></button>
  `;

  // reticle
  const reticle = document.createElement("div");
  reticle.id = "reticle";
  reticle.object3D = {
    visible: false,
    position: { copy: jest.fn() },
    quaternion: { copy: jest.fn() },
  };
  document.body.appendChild(reticle);

  // model-group
  const modelGroup = document.createElement("div");
  modelGroup.id = "model-group";
  modelGroup.setAttribute = jest.fn();
  document.body.appendChild(modelGroup);

  // scene
  const scene = document.createElement("div");
  scene.id = "scene";
  scene.renderer = {
    xr: {
      enabled: false,
      isPresenting: false,
      setSession: jest.fn().mockResolvedValue(),
      getCamera: jest.fn().mockReturnValue(null),
    },
    setAnimationLoop: jest.fn(),
  };
  scene.addEventListener = jest.fn();
  scene.exitVR = jest.fn();
  document.body.appendChild(scene);

  // camera
  const cam = document.createElement("div");
  cam.id = "main-cam";
  cam.object3D = {
    getWorldPosition: jest.fn(),
    getWorldQuaternion: jest.fn(),
  };
  document.body.appendChild(cam);
}

// ─── SETUP PER TEST ─────────────────────────────────────────
beforeEach(() => {
  jest.resetModules();   // 💥 penting
  buildBaseDOM();        // 💥 DOM dulu

  arCore = require("../public/AR/Pages/ar-core.js"); // 💥 baru import
});

// ───────────────────────────────────────────────────────────
// TEST
// ───────────────────────────────────────────────────────────

describe("showARUI()", () => {
  test("display block + hide landing", () => {
    arCore.showARUI();

    expect(document.getElementById("ar-ui").style.display).toBe("block");
    expect(document.getElementById("landing").classList.contains("hidden")).toBe(true);
  });
});

describe("onSessionEnd()", () => {
  test("reset UI", () => {
    document.getElementById("ar-ui").style.display = "block";
    document.getElementById("landing").classList.add("hidden");
    document.getElementById("html-cursor").classList.add("active");

    arCore.onSessionEnd();

    expect(document.getElementById("ar-ui").style.display).toBe("none");
    expect(document.getElementById("landing").classList.contains("hidden")).toBe(false);
    expect(document.getElementById("html-cursor").classList.contains("active")).toBe(false);
  });
});

describe("setMode()", () => {
  test("placement mode", () => {
    arCore.setMode("placement");

    expect(document.getElementById("mode-badge").textContent)
      .toContain("MODE PENEMPATAN");

    expect(document.getElementById("reticle").object3D.visible).toBe(true);
  });

  test("cursor mode", () => {
    arCore.setMode("cursor");

    expect(document.getElementById("html-cursor").classList.contains("active")).toBe(true);
    expect(document.getElementById("reticle").object3D.visible).toBe(false);
  });
});

describe("showInfo()", () => {
  test("update title & desc", () => {
    arCore.showInfo("Paru-Paru", "Organ napas");

    expect(document.getElementById("info-title").textContent).toBe("Paru-Paru");
    expect(document.getElementById("info-desc").textContent).toBe("Organ napas");
  });
});

describe("Scale slider", () => {
  test("update scale text", () => {
    const slider = document.getElementById("scale-slider");
    slider.value = "2.5";
    slider.dispatchEvent(new Event("input"));

    expect(document.getElementById("scale-value").textContent).toBe("2.5");
  });
});

describe("Rotation slider", () => {
  test("update rotation text", () => {
    const slider = document.getElementById("rotation-slider");
    slider.value = "90";
    slider.dispatchEvent(new Event("input"));

    expect(document.getElementById("rotation-display").textContent).toBe("90°");
  });
});

describe("placeModel()", () => {
  test("set visible & position", () => {
    arCore._setState({ lastHitPos: { x:1,y:0,z:-2 } });

    arCore.placeModel();

    expect(document.getElementById("model-group").setAttribute)
      .toHaveBeenCalledWith("visible", "true");
  });
});