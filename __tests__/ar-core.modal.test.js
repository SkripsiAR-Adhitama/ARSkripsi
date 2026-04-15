
import { setupARDom } from "../test-utils/ar-core.setup";

function showModal(message, shouldGoBack = false) {
  const modal = document.getElementById("error-modal");
  const modalMsg = document.getElementById("modal-message");
  const modalBtn = document.getElementById("btn-modal-close");

  modalMsg.textContent = message;
  modal.classList.remove("hidden");

  modalBtn.onclick = () => {
    modal.classList.add("hidden");
    if (shouldGoBack) {
      window.history.back();
    }
  };
}

describe("showModal()", () => {
  beforeEach(() => {
    setupARDom();
    jest.spyOn(window.history, "back").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  
  test("mengisi #modal-message dengan pesan yang diberikan", () => {
    showModal("WebXR tidak tersedia.");
    const msg = document.getElementById("modal-message");
    expect(msg.textContent).toBe("WebXR tidak tersedia.");
  });

  test("menghapus class 'hidden' dari modal saat dipanggil", () => {
    const modal = document.getElementById("error-modal");
    expect(modal.classList.contains("hidden")).toBe(true); 

    showModal("Pesan error");
    expect(modal.classList.contains("hidden")).toBe(false);
  });

  test("modal tetap terbuka sebelum tombol diklik", () => {
    showModal("Pesan error");
    const modal = document.getElementById("error-modal");
    expect(modal.classList.contains("hidden")).toBe(false);
  });


  test("klik tombol 'MENGERTI' menutup modal (menambah class 'hidden')", () => {
    showModal("Pesan error");
    document.getElementById("btn-modal-close").click();
    const modal = document.getElementById("error-modal");
    expect(modal.classList.contains("hidden")).toBe(true);
  });


  test("history.back TIDAK dipanggil jika shouldGoBack = false", () => {
    showModal("Pesan", false);
    document.getElementById("btn-modal-close").click();
    expect(window.history.back).not.toHaveBeenCalled();
  });

  test("history.back TIDAK dipanggil saat default (tanpa argumen kedua)", () => {
    showModal("Pesan");
    document.getElementById("btn-modal-close").click();
    expect(window.history.back).not.toHaveBeenCalled();
  });


  test("history.back dipanggil setelah tutup modal jika shouldGoBack = true", () => {
    showModal("Error kritis", true);
    document.getElementById("btn-modal-close").click();
    expect(window.history.back).toHaveBeenCalledTimes(1);
  });


  test("pesan modal diperbarui jika showModal dipanggil dua kali", () => {
    showModal("Pesan pertama");
    showModal("Pesan kedua");
    const msg = document.getElementById("modal-message");
    expect(msg.textContent).toBe("Pesan kedua");
  });

  test("modal muncul lagi jika showModal dipanggil ulang setelah ditutup", () => {
    showModal("Pertama");
    document.getElementById("btn-modal-close").click();
    showModal("Kedua");
    const modal = document.getElementById("error-modal");
    expect(modal.classList.contains("hidden")).toBe(false);
  });
});