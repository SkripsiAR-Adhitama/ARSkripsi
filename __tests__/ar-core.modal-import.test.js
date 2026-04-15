import { setupARDom } from "../test-utils/ar-core.setup";

let showModal;

describe("showModal()", () => {
  beforeEach(async () => {
    setupARDom();

    global.AFRAME = {
      THREE: {
        Color: class {},
        Raycaster: class {
          setFromCamera() {}
          intersectObjects() {
            return [];
          }
        },
        Vector3: class {
          constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
          }
          clone() {
            return new global.AFRAME.THREE.Vector3(this.x, this.y, this.z);
          }
          add(v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
          }
          applyQuaternion() {
            return this;
          }
          copy(v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
          }
        },
        Quaternion: class {},
        Matrix4: class {
          fromArray() {
            return this;
          }
          decompose() {}
        },
      },
    };

    jest.resetModules();

    const module = await import("../public/AR/Pages/ar-core");
    showModal = module.showModal;

    jest.spyOn(window.history, "back").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("mengisi #modal-message", () => {
    showModal("WebXR tidak tersedia.");
    expect(document.getElementById("modal-message").textContent)
      .toBe("WebXR tidak tersedia.");
  });

  test("menghapus class hidden", () => {
    showModal("Error");
    expect(document.getElementById("error-modal").classList.contains("hidden"))
      .toBe(false);
  });

  test("klik tombol menutup modal", () => {
    showModal("Error");
    document.getElementById("btn-modal-close").click();
    expect(document.getElementById("error-modal").classList.contains("hidden"))
      .toBe(true);
  });

  test("history.back tidak dipanggil default", () => {
    showModal("Error");
    document.getElementById("btn-modal-close").click();
    expect(window.history.back).not.toHaveBeenCalled();
  });

  test("history.back dipanggil jika true", () => {
    showModal("Error kritis", true);
    document.getElementById("btn-modal-close").click();
    expect(window.history.back).toHaveBeenCalledTimes(1);
  });

  test("pesan update jika dipanggil dua kali", () => {
    showModal("Pertama");
    showModal("Kedua");
    expect(document.getElementById("modal-message").textContent)
      .toBe("Kedua");
  });

  test("modal muncul lagi setelah ditutup", () => {
    showModal("Pertama");
    document.getElementById("btn-modal-close").click();
    showModal("Kedua");
    expect(document.getElementById("error-modal").classList.contains("hidden"))
      .toBe(false);
  });
});