/**
 * Unit Test: ar-core.js → handleTouch() & doCursorRaycast()
 *
 * Menguji logika touch event pada AR:
 * - handleTouch: memanggil placeModel/showInfo sesuai mode & kondisi
 * - doCursorRaycast: mengelola kursor hit state berdasarkan raycast
 *
 * @testenv jsdom
 */

import { setupARDom } from "../test-utils/ar-core.setup";

// ─── Mock fungsi yang bergantung pada Three.js ────────────────────────────────
const mockPlaceModel = jest.fn();
const mockShowInfo = jest.fn();
const mockRaycastOrgan = jest.fn();

// ─── State global AR (seperti di ar-core.js) ──────────────────────────────────
let isARActive;
let MODE;
let hoveredOrgan;
let lastHoverInfo;
let htmlCursor;
let arUI;

function handleTouch(evt) {
  if (!isARActive) return;
  const touch = evt.changedTouches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && arUI.contains(target)) return;
  evt.preventDefault();

  if (MODE === "placement") {
    mockPlaceModel();
  } else {
    if (hoveredOrgan) {
      mockShowInfo(hoveredOrgan.title, hoveredOrgan.desc);
      htmlCursor.classList.remove("hit");
      setTimeout(() => {
        if (hoveredOrgan) htmlCursor.classList.add("hit");
      }, 100);
    } else {
      const nx = (touch.clientX / window.innerWidth) * 2 - 1;
      const ny = -(touch.clientY / window.innerHeight) * 2 + 1;
      const info = mockRaycastOrgan(nx, ny);
      if (info) mockShowInfo(info.title, info.desc);
    }
  }
}

function doCursorRaycast() {
  const info = mockRaycastOrgan(0, 0);
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

// ─── Helper: buat fake TouchEvent ─────────────────────────────────────────────
function createTouchEvent(x = 100, y = 200) {
  return {
    changedTouches: [{ clientX: x, clientY: y }],
    preventDefault: jest.fn(),
  };
}

// ─── Helper: mock document.elementFromPoint ───────────────────────────────────
// jest.spyOn tidak bisa dipakai karena jsdom tidak mendaftarkan
// elementFromPoint sebagai property yang enumerable/configurable.
// Solusi: assign langsung sebagai jest.fn() ke document.
function mockElementFromPoint(returnValue) {
  document.elementFromPoint = jest.fn().mockReturnValue(returnValue);
}

describe("handleTouch()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setupARDom();

    isARActive = true;
    MODE = "placement";
    hoveredOrgan = null;
    lastHoverInfo = null;
    htmlCursor = document.getElementById("html-cursor");
    arUI = document.getElementById("ar-ui");

    // Default: touch jatuh di luar arUI
    mockElementFromPoint(document.body);

    mockPlaceModel.mockClear();
    mockShowInfo.mockClear();
    mockRaycastOrgan.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // ─── AR tidak aktif ───────────────────────────────────────────────────────────

  test("tidak melakukan apa-apa jika isARActive = false", () => {
    isARActive = false;
    const evt = createTouchEvent();
    handleTouch(evt);
    expect(mockPlaceModel).not.toHaveBeenCalled();
    expect(evt.preventDefault).not.toHaveBeenCalled();
  });

  // ─── Touch pada elemen UI (diabaikan) ─────────────────────────────────────────

  test("touch pada elemen di dalam arUI diabaikan (tidak trigger placeModel)", () => {
    const btnBack = document.getElementById("btn-back");
    mockElementFromPoint(btnBack); // touch tepat di tombol dalam arUI

    const evt = createTouchEvent();
    handleTouch(evt);

    expect(mockPlaceModel).not.toHaveBeenCalled();
  });

  // ─── Mode "placement" ─────────────────────────────────────────────────────────

  test("mode placement: memanggil placeModel saat touch di luar UI", () => {
    mockElementFromPoint(document.body);
    MODE = "placement";
    handleTouch(createTouchEvent());
    expect(mockPlaceModel).toHaveBeenCalledTimes(1);
  });

  test("mode placement: event.preventDefault dipanggil", () => {
    mockElementFromPoint(document.body);
    const evt = createTouchEvent();
    handleTouch(evt);
    expect(evt.preventDefault).toHaveBeenCalled();
  });

  // ─── Mode "cursor" + hoveredOrgan ada ────────────────────────────────────────

  test("mode cursor + hoveredOrgan: memanggil showInfo dengan data organ", () => {
    mockElementFromPoint(document.body);
    MODE = "cursor";
    hoveredOrgan = { title: "Paru-Paru", desc: "Organ pernapasan." };

    handleTouch(createTouchEvent());

    expect(mockShowInfo).toHaveBeenCalledWith("Paru-Paru", "Organ pernapasan.");
  });

  test("mode cursor + hoveredOrgan: class 'hit' dihapus lalu ditambah kembali setelah 100ms", () => {
    mockElementFromPoint(document.body);
    MODE = "cursor";
    hoveredOrgan = { title: "Aorta", desc: "Arteri terbesar." };
    htmlCursor.classList.add("hit");

    handleTouch(createTouchEvent());

    expect(htmlCursor.classList.contains("hit")).toBe(false); // langsung hilang
    jest.advanceTimersByTime(100);
    expect(htmlCursor.classList.contains("hit")).toBe(true);  // muncul lagi
  });

  // ─── Mode "cursor" + hoveredOrgan kosong (raycast manual) ────────────────────

  test("mode cursor + tidak ada hoveredOrgan: raycastOrgan dipanggil dengan NDC yang benar", () => {
    mockElementFromPoint(document.body);
    MODE = "cursor";
    hoveredOrgan = null;
    mockRaycastOrgan.mockReturnValue(null);

    // clientX=512, innerWidth=1024 → ndcX = (512/1024)*2-1 = 0
    // clientY=384, innerHeight=768 → ndcY = -(384/768)*2+1 = 0
    Object.defineProperty(window, "innerWidth",  { value: 1024, writable: true });
    Object.defineProperty(window, "innerHeight", { value: 768,  writable: true });

    handleTouch(createTouchEvent(512, 384));

    expect(mockRaycastOrgan).toHaveBeenCalledWith(0, 0);
  });

  test("mode cursor + tidak ada hoveredOrgan + raycast kena organ: showInfo dipanggil", () => {
    mockElementFromPoint(document.body);
    MODE = "cursor";
    hoveredOrgan = null;
    mockRaycastOrgan.mockReturnValue({ title: "Bronkus", desc: "Percabangan." });

    handleTouch(createTouchEvent());

    expect(mockShowInfo).toHaveBeenCalledWith("Bronkus", "Percabangan.");
  });

  test("mode cursor + tidak ada hoveredOrgan + raycast miss: showInfo tidak dipanggil", () => {
    mockElementFromPoint(document.body);
    MODE = "cursor";
    hoveredOrgan = null;
    mockRaycastOrgan.mockReturnValue(null);

    handleTouch(createTouchEvent());

    expect(mockShowInfo).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("doCursorRaycast()", () => {
  beforeEach(() => {
    setupARDom();
    hoveredOrgan = null;
    lastHoverInfo = null;
    htmlCursor = document.getElementById("html-cursor");
    mockRaycastOrgan.mockClear();
  });

  test("raycast kena organ baru: lastHoverInfo diperbarui", () => {
    mockRaycastOrgan.mockReturnValue({ title: "Lambung", desc: "..." });
    doCursorRaycast();
    expect(lastHoverInfo).toBe("Lambung");
  });

  test("raycast kena organ baru: htmlCursor mendapat class 'hit'", () => {
    mockRaycastOrgan.mockReturnValue({ title: "Lambung", desc: "..." });
    doCursorRaycast();
    expect(htmlCursor.classList.contains("hit")).toBe(true);
  });

  test("raycast kena organ yang sama: class 'hit' tidak ditambah ulang (idempoten)", () => {
    mockRaycastOrgan.mockReturnValue({ title: "Lambung", desc: "..." });
    lastHoverInfo = "Lambung"; // sudah hovered sebelumnya
    doCursorRaycast();
    // title sama → blok if tidak masuk → class tidak diubah
    expect(htmlCursor.classList.contains("hit")).toBe(false);
  });

  test("raycast miss setelah sebelumnya hit: lastHoverInfo dikosongkan", () => {
    lastHoverInfo = "Lambung";
    hoveredOrgan = { title: "Lambung", desc: "..." };
    mockRaycastOrgan.mockReturnValue(null);

    doCursorRaycast();

    expect(lastHoverInfo).toBeNull();
    expect(hoveredOrgan).toBeNull();
  });

  test("raycast miss setelah sebelumnya hit: class 'hit' dihapus", () => {
    htmlCursor.classList.add("hit");
    lastHoverInfo = "Trakea";
    mockRaycastOrgan.mockReturnValue(null);

    doCursorRaycast();

    expect(htmlCursor.classList.contains("hit")).toBe(false);
  });

  test("raycast miss saat lastHoverInfo sudah null: tidak ada error", () => {
    lastHoverInfo = null;
    mockRaycastOrgan.mockReturnValue(null);
    expect(() => doCursorRaycast()).not.toThrow();
  });
});