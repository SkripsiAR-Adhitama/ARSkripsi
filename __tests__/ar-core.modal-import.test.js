/**
 * arcore.modal.test.js  (import-based — coverage terdeteksi)
 * Menguji showModal() dengan import langsung dari ar-core.js
 */

import { showModal } from "../public/AR/Pages/ar-core.module";
import { setupARDom } from "./ar-core.setup";

describe("showModal()", () => {
  beforeEach(() => {
    setupARDom();
    jest.spyOn(window.history, "back").mockImplementation(() => {});
  });
  afterEach(() => jest.restoreAllMocks());

  test("mengisi #modal-message dengan pesan yang diberikan", () => {
    showModal("WebXR tidak tersedia.");
    expect(document.getElementById("modal-message").textContent).toBe("WebXR tidak tersedia.");
  });

  test("menghapus class 'hidden' dari modal", () => {
    showModal("Error");
    expect(document.getElementById("error-modal").classList.contains("hidden")).toBe(false);
  });

  test("klik tombol menutup modal", () => {
    showModal("Error");
    document.getElementById("btn-modal-close").click();
    expect(document.getElementById("error-modal").classList.contains("hidden")).toBe(true);
  });

  test("history.back TIDAK dipanggil jika shouldGoBack = false (default)", () => {
    showModal("Error");
    document.getElementById("btn-modal-close").click();
    expect(window.history.back).not.toHaveBeenCalled();
  });

  test("history.back dipanggil jika shouldGoBack = true", () => {
    showModal("Error kritis", true);
    document.getElementById("btn-modal-close").click();
    expect(window.history.back).toHaveBeenCalledTimes(1);
  });

  test("pesan diperbarui jika showModal dipanggil dua kali", () => {
    showModal("Pertama");
    showModal("Kedua");
    expect(document.getElementById("modal-message").textContent).toBe("Kedua");
  });

  test("modal muncul kembali setelah ditutup lalu showModal dipanggil lagi", () => {
    showModal("Pertama");
    document.getElementById("btn-modal-close").click();
    showModal("Kedua");
    expect(document.getElementById("error-modal").classList.contains("hidden")).toBe(false);
  });
});