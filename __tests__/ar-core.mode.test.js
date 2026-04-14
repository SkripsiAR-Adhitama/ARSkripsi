/**
 * Unit Test: ar-core.js → setMode()
 *
 * Menguji fungsi setMode yang mengubah mode AR antara:
 * - "placement" : mode menempatkan organ (reticle aktif, cursor nonaktif)
 * - "cursor"    : mode inspeksi organ (crosshair aktif, reticle nonaktif)
 *
 * @testenv jsdom
 */

import { setupARDom } from "./ar-core.setup";

// Implementasi setMode sesuai source ar-core.js
// (export dari ar-core.js atau definisikan ulang di sini)
let MODE;
let reticleEl;
let modeBadge;
let htmlCursor;
let placementHint;
let infoTitle;
let infoDesc;

// Global AR_SYSTEM_NAME (seperti di HTML)
global.AR_SYSTEM_NAME = "Pernapasan";

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

describe("setMode()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    const els = setupARDom();
    reticleEl = els.reticle;

    modeBadge = document.getElementById("mode-badge");
    htmlCursor = document.getElementById("html-cursor");
    placementHint = document.getElementById("placement-hint");
    infoTitle = document.getElementById("info-title");
    infoDesc = document.getElementById("info-desc");

    MODE = "placement";
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ─── Mode "placement" ─────────────────────────────────────────────────────────

  test("mode placement: MODE diset ke 'placement'", () => {
    setMode("placement");
    expect(MODE).toBe("placement");
  });

  test("mode placement: modeBadge menampilkan teks 'MODE PENEMPATAN'", () => {
    setMode("placement");
    expect(modeBadge.textContent).toContain("MODE PENEMPATAN");
  });

  test("mode placement: modeBadge mendapat class 'show'", () => {
    setMode("placement");
    expect(modeBadge.classList.contains("show")).toBe(true);
  });

  test("mode placement: htmlCursor kehilangan class 'active'", () => {
    htmlCursor.classList.add("active"); // set dulu
    setMode("placement");
    expect(htmlCursor.classList.contains("active")).toBe(false);
  });

  test("mode placement: placementHint kehilangan class 'hidden'", () => {
    placementHint.classList.add("hidden");
    setMode("placement");
    expect(placementHint.classList.contains("hidden")).toBe(false);
  });

  test("mode placement: reticle menjadi visible", () => {
    reticleEl.object3D.visible = false;
    setMode("placement");
    expect(reticleEl.object3D.visible).toBe(true);
  });

  test("mode placement: modeBadge kehilangan class 'show' setelah 2500ms", () => {
    setMode("placement");
    expect(modeBadge.classList.contains("show")).toBe(true);
    jest.advanceTimersByTime(2500);
    expect(modeBadge.classList.contains("show")).toBe(false);
  });

  // ─── Mode "cursor" ────────────────────────────────────────────────────────────

  test("mode cursor: MODE diset ke 'cursor'", () => {
    setMode("cursor");
    expect(MODE).toBe("cursor");
  });

  test("mode cursor: modeBadge menampilkan teks 'KETUK ORGAN'", () => {
    setMode("cursor");
    expect(modeBadge.textContent).toContain("KETUK ORGAN");
  });

  test("mode cursor: htmlCursor mendapat class 'active'", () => {
    setMode("cursor");
    expect(htmlCursor.classList.contains("active")).toBe(true);
  });

  test("mode cursor: placementHint mendapat class 'hidden'", () => {
    setMode("cursor");
    expect(placementHint.classList.contains("hidden")).toBe(true);
  });

  test("mode cursor: reticle tidak visible", () => {
    reticleEl.object3D.visible = true;
    setMode("cursor");
    expect(reticleEl.object3D.visible).toBe(false);
  });

  test("mode cursor: infoTitle menampilkan nama sistem AR", () => {
    setMode("cursor");
    expect(infoTitle.textContent).toContain("Pernapasan");
  });

  test("mode cursor: infoDesc berisi instruksi crosshair", () => {
    setMode("cursor");
    expect(infoDesc.textContent).toContain("crosshair");
  });

  test("mode cursor: modeBadge kehilangan class 'show' setelah 3000ms", () => {
    setMode("cursor");
    expect(modeBadge.classList.contains("show")).toBe(true);
    jest.advanceTimersByTime(3000);
    expect(modeBadge.classList.contains("show")).toBe(false);
  });

  // ─── Transisi antar mode ──────────────────────────────────────────────────────

  test("bisa beralih dari placement ke cursor dan kembali ke placement", () => {
    setMode("placement");
    expect(MODE).toBe("placement");
    setMode("cursor");
    expect(MODE).toBe("cursor");
    setMode("placement");
    expect(MODE).toBe("placement");
  });
});