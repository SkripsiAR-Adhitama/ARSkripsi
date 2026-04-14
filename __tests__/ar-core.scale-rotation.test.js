/**
 * Unit Test: ar-core.js → Scale Slider & Rotation Slider
 *
 * Menguji kontrol skala dan rotasi model 3D AR:
 * - Scale slider: mengubah ukuran model
 * - Rotation slider: mengubah rotasi sumbu Y model
 * - Reset rotation: mengembalikan rotasi ke 0
 *
 * @testenv jsdom
 */

import { setupARDom } from "./ar-core.setup";

// ─── State global (sesuai ar-core.js) ────────────────────────────────────────
let currentScale;
let currentRotY;
let modelPlaced;
let placedPX, placedPY, placedPZ;
let modelGroup;
let scaleSlider, scaleValue;
let rotSlider, rotDisplay;

// ─── Handler sesuai source ar-core.js ────────────────────────────────────────
function onScaleInput(e) {
  e.stopPropagation();
  currentScale = parseFloat(scaleSlider.value);
  scaleValue.textContent = currentScale.toFixed(1);
  if (modelPlaced) {
    modelGroup.setAttribute(
      "scale",
      `${currentScale} ${currentScale} ${currentScale}`
    );
    modelGroup.setAttribute("position", `${placedPX} ${placedPY} ${placedPZ}`);
    modelGroup.setAttribute("rotation", `0 ${currentRotY} 0`);
  }
}

function onRotInput(e) {
  e.stopPropagation();
  currentRotY = parseInt(rotSlider.value);
  rotDisplay.textContent = currentRotY + "°";
  if (modelPlaced) modelGroup.setAttribute("rotation", `0 ${currentRotY} 0`);
}

function onResetRot(e) {
  e.stopPropagation();
  currentRotY = 0;
  rotSlider.value = 0;
  rotDisplay.textContent = "0°";
  if (modelPlaced) modelGroup.setAttribute("rotation", "0 0 0");
}

const fakeEvent = { stopPropagation: jest.fn() };

describe("Scale Slider", () => {
  beforeEach(() => {
    const els = setupARDom();
    modelGroup = els.modelGroup;
    scaleSlider = document.getElementById("scale-slider");
    scaleValue = document.getElementById("scale-value");
    rotSlider = document.getElementById("rotation-slider");
    rotDisplay = document.getElementById("rotation-display");

    currentScale = 1;
    currentRotY = 0;
    modelPlaced = false;
    placedPX = 0;
    placedPY = 0;
    placedPZ = 0;
    fakeEvent.stopPropagation.mockClear();
  });

  // ─── Perubahan nilai currentScale ────────────────────────────────────────────

  test("currentScale diperbarui sesuai nilai slider", () => {
    scaleSlider.value = "2.5";
    onScaleInput(fakeEvent);
    expect(currentScale).toBe(2.5);
  });

  test("scaleValue.textContent menampilkan satu angka desimal", () => {
    scaleSlider.value = "3";
    onScaleInput(fakeEvent);
    expect(scaleValue.textContent).toBe("3.0");
  });

  test("scaleValue.textContent diperbarui ke '1.5' saat slider = 1.5", () => {
    scaleSlider.value = "1.5";
    onScaleInput(fakeEvent);
    expect(scaleValue.textContent).toBe("1.5");
  });

  // ─── Model belum ditempatkan ──────────────────────────────────────────────────

  test("modelGroup.setAttribute TIDAK dipanggil jika modelPlaced = false", () => {
    modelPlaced = false;
    scaleSlider.value = "2";
    onScaleInput(fakeEvent);
    expect(modelGroup.setAttribute).not.toHaveBeenCalled();
  });

  // ─── Model sudah ditempatkan ──────────────────────────────────────────────────

  test("modelGroup scale di-set saat modelPlaced = true", () => {
    modelPlaced = true;
    scaleSlider.value = "2";
    onScaleInput(fakeEvent);
    expect(modelGroup.setAttribute).toHaveBeenCalledWith("scale", "2 2 2");
  });

  test("modelGroup position di-set ulang saat scale berubah (mempertahankan posisi)", () => {
    modelPlaced = true;
    placedPX = 1; placedPY = 0; placedPZ = -2;
    scaleSlider.value = "2";
    onScaleInput(fakeEvent);
    expect(modelGroup.setAttribute).toHaveBeenCalledWith("position", "1 0 -2");
  });

  test("modelGroup rotation di-set ulang saat scale berubah (mempertahankan rotasi)", () => {
    modelPlaced = true;
    currentRotY = 90;
    scaleSlider.value = "2";
    onScaleInput(fakeEvent);
    expect(modelGroup.setAttribute).toHaveBeenCalledWith("rotation", "0 90 0");
  });

  test("scale string yang dikirim ke setAttribute selalu simetris (x y z sama)", () => {
    modelPlaced = true;
    scaleSlider.value = "3.5";
    onScaleInput(fakeEvent);
    const call = modelGroup.setAttribute.mock.calls.find((c) => c[0] === "scale");
    expect(call[1]).toBe("3.5 3.5 3.5");
  });

  // ─── stopPropagation ──────────────────────────────────────────────────────────

  test("event.stopPropagation dipanggil untuk mencegah bubbling ke A-Frame", () => {
    scaleSlider.value = "1";
    onScaleInput(fakeEvent);
    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
  });
});

describe("Rotation Slider", () => {
  beforeEach(() => {
    const els = setupARDom();
    modelGroup = els.modelGroup;
    rotSlider = document.getElementById("rotation-slider");
    rotDisplay = document.getElementById("rotation-display");
    scaleSlider = document.getElementById("scale-slider");

    currentRotY = 0;
    modelPlaced = false;
    fakeEvent.stopPropagation.mockClear();
  });

  // ─── Perubahan currentRotY ────────────────────────────────────────────────────

  test("currentRotY diperbarui sesuai nilai slider", () => {
    rotSlider.value = "180";
    onRotInput(fakeEvent);
    expect(currentRotY).toBe(180);
  });

  test("rotDisplay.textContent menampilkan nilai dengan ° suffix", () => {
    rotSlider.value = "45";
    onRotInput(fakeEvent);
    expect(rotDisplay.textContent).toBe("45°");
  });

  test("rotDisplay menampilkan '0°' saat nilai slider 0", () => {
    rotSlider.value = "0";
    onRotInput(fakeEvent);
    expect(rotDisplay.textContent).toBe("0°");
  });

  test("rotDisplay menampilkan '360°' saat slider max", () => {
    rotSlider.value = "360";
    onRotInput(fakeEvent);
    expect(rotDisplay.textContent).toBe("360°");
  });

  // ─── Efek pada model ──────────────────────────────────────────────────────────

  test("modelGroup.setAttribute TIDAK dipanggil jika modelPlaced = false", () => {
    modelPlaced = false;
    rotSlider.value = "90";
    onRotInput(fakeEvent);
    expect(modelGroup.setAttribute).not.toHaveBeenCalled();
  });

  test("modelGroup rotation di-set saat modelPlaced = true", () => {
    modelPlaced = true;
    rotSlider.value = "90";
    onRotInput(fakeEvent);
    expect(modelGroup.setAttribute).toHaveBeenCalledWith("rotation", "0 90 0");
  });

  test("rotation selalu format '0 Y 0' (hanya sumbu Y)", () => {
    modelPlaced = true;
    rotSlider.value = "270";
    onRotInput(fakeEvent);
    const call = modelGroup.setAttribute.mock.calls.find((c) => c[0] === "rotation");
    expect(call[1]).toMatch(/^0 270 0$/);
  });

  // ─── stopPropagation ──────────────────────────────────────────────────────────

  test("event.stopPropagation dipanggil", () => {
    rotSlider.value = "30";
    onRotInput(fakeEvent);
    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
  });
});

describe("Reset Rotation (btn-reset-rot)", () => {
  beforeEach(() => {
    const els = setupARDom();
    modelGroup = els.modelGroup;
    rotSlider = document.getElementById("rotation-slider");
    rotDisplay = document.getElementById("rotation-display");

    currentRotY = 90; // Sudah dirotasi
    rotSlider.value = "90";
    modelPlaced = false;
    fakeEvent.stopPropagation.mockClear();
  });

  test("currentRotY direset ke 0", () => {
    onResetRot(fakeEvent);
    expect(currentRotY).toBe(0);
  });

  test("rotSlider.value direset ke 0", () => {
    onResetRot(fakeEvent);
    expect(rotSlider.value).toBe("0");
  });

  test("rotDisplay.textContent direset ke '0°'", () => {
    onResetRot(fakeEvent);
    expect(rotDisplay.textContent).toBe("0°");
  });

  test("modelGroup TIDAK di-set jika model belum ditempatkan", () => {
    modelPlaced = false;
    onResetRot(fakeEvent);
    expect(modelGroup.setAttribute).not.toHaveBeenCalled();
  });

  test("modelGroup rotation di-set ke '0 0 0' jika model sudah ditempatkan", () => {
    modelPlaced = true;
    onResetRot(fakeEvent);
    expect(modelGroup.setAttribute).toHaveBeenCalledWith("rotation", "0 0 0");
  });

  test("event.stopPropagation dipanggil", () => {
    onResetRot(fakeEvent);
    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
  });
});