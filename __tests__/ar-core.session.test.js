
import { setupARDom } from "../test-utils/ar-core.setup";

let isARActive;
let modelPlaced;
let hitTestSource;
let xrRefSpace;
let lastHitPos;
let lastHitQuat;
let activeSession;
let currentScale;
let currentRotY;
let arUI, landing, htmlCursor, modelGroup, reticleEl;
let placementHint, scaleSlider, scaleValue, rotSlider, rotDisplay;

const mockSetMode = jest.fn();

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
  mockSetMode("placement");
  currentScale = 1;
  scaleSlider.value = 1;
  scaleValue.textContent = "1";
  currentRotY = 0;
  rotSlider.value = 0;
  rotDisplay.textContent = "0°";
}

describe("showARUI()", () => {
  beforeEach(() => {
    setupARDom();
    arUI = document.getElementById("ar-ui");
    landing = document.getElementById("landing");
    isARActive = false;
  });

  test("menampilkan #ar-ui (style.display = 'block')", () => {
    arUI.style.display = "none";
    showARUI();
    expect(arUI.style.display).toBe("block");
  });

  test("menambah class 'hidden' ke #landing", () => {
    landing.classList.remove("hidden");
    showARUI();
    expect(landing.classList.contains("hidden")).toBe(true);
  });

  test("isARActive menjadi true", () => {
    showARUI();
    expect(isARActive).toBe(true);
  });
});

describe("onSessionEnd()", () => {
  beforeEach(() => {
    setupARDom();

    arUI = document.getElementById("ar-ui");
    landing = document.getElementById("landing");
    htmlCursor = document.getElementById("html-cursor");
    placementHint = document.getElementById("placement-hint");
    scaleSlider = document.getElementById("scale-slider");
    scaleValue = document.getElementById("scale-value");
    rotSlider = document.getElementById("rotation-slider");
    rotDisplay = document.getElementById("rotation-display");

    const els = setupARDom();
    modelGroup = els.modelGroup;
    reticleEl = els.reticle;

    arUI = document.getElementById("ar-ui");
    landing = document.getElementById("landing");
    htmlCursor = document.getElementById("html-cursor");
    placementHint = document.getElementById("placement-hint");
    scaleSlider = document.getElementById("scale-slider");
    scaleValue = document.getElementById("scale-value");
    rotSlider = document.getElementById("rotation-slider");
    rotDisplay = document.getElementById("rotation-display");

    isARActive = true;
    modelPlaced = true;
    hitTestSource = {};
    xrRefSpace = {};
    lastHitPos = { x: 1, y: 0, z: 1 };
    lastHitQuat = {};
    activeSession = { end: jest.fn() };
    currentScale = 3;
    currentRotY = 180;

    arUI.style.display = "block";
    htmlCursor.classList.add("active");
    landing.classList.add("hidden");
    placementHint.classList.add("hidden");

    mockSetMode.mockClear();
  });


  test("isARActive menjadi false", () => {
    onSessionEnd();
    expect(isARActive).toBe(false);
  });

  test("modelPlaced menjadi false", () => {
    onSessionEnd();
    expect(modelPlaced).toBe(false);
  });

  test("hitTestSource menjadi null", () => {
    onSessionEnd();
    expect(hitTestSource).toBeNull();
  });

  test("xrRefSpace menjadi null", () => {
    onSessionEnd();
    expect(xrRefSpace).toBeNull();
  });

  test("lastHitPos menjadi null", () => {
    onSessionEnd();
    expect(lastHitPos).toBeNull();
  });

  test("lastHitQuat menjadi null", () => {
    onSessionEnd();
    expect(lastHitQuat).toBeNull();
  });

  test("activeSession menjadi null", () => {
    onSessionEnd();
    expect(activeSession).toBeNull();
  });

  test("#ar-ui disembunyikan (style.display = 'none')", () => {
    onSessionEnd();
    expect(arUI.style.display).toBe("none");
  });

  test("htmlCursor kehilangan class 'active'", () => {
    onSessionEnd();
    expect(htmlCursor.classList.contains("active")).toBe(false);
  });

  test("#landing kehilangan class 'hidden' (muncul kembali)", () => {
    onSessionEnd();
    expect(landing.classList.contains("hidden")).toBe(false);
  });

  test("placementHint kehilangan class 'hidden'", () => {
    onSessionEnd();
    expect(placementHint.classList.contains("hidden")).toBe(false);
  });

  test("reticle.object3D.visible menjadi false", () => {
    reticleEl.object3D.visible = true;
    onSessionEnd();
    expect(reticleEl.object3D.visible).toBe(false);
  });

  test("modelGroup.setAttribute dipanggil dengan 'visible' = 'false'", () => {
    onSessionEnd();
    expect(modelGroup.setAttribute).toHaveBeenCalledWith("visible", "false");
  });

  test("currentScale direset ke 1", () => {
    onSessionEnd();
    expect(currentScale).toBe(1);
  });

  test("scale-slider.value direset ke 1", () => {
    onSessionEnd();
    expect(scaleSlider.value).toBe("1");
  });

  test("scale-value.textContent direset ke '1'", () => {
    onSessionEnd();
    expect(scaleValue.textContent).toBe("1");
  });

  test("currentRotY direset ke 0", () => {
    onSessionEnd();
    expect(currentRotY).toBe(0);
  });

  test("rotation-slider.value direset ke 0", () => {
    onSessionEnd();
    expect(rotSlider.value).toBe("0");
  });

  test("rotation-display.textContent direset ke '0°'", () => {
    onSessionEnd();
    expect(rotDisplay.textContent).toBe("0°");
  });

  test("setMode('placement') dipanggil saat sesi berakhir", () => {
    onSessionEnd();
    expect(mockSetMode).toHaveBeenCalledWith("placement");
  });
});