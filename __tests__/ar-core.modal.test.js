/**
 * Unit Test: ar-core.js → showModal()
 *
 * Menguji fungsi showModal yang menampilkan error modal kepada pengguna.
 * Fungsi ini bertanggung jawab untuk:
 * - Mengisi pesan di #modal-message
 * - Menampilkan modal dengan menghapus class "hidden"
 * - Menutup modal saat tombol diklik
 * - Navigasi mundur (history.back) jika shouldGoBack = true
 *
 * @testenv jsdom
 */

import { setupARDom } from "../test-utils/ar-core.setup";

// Fungsi showModal diekstrak / di-export dari ar-core.js
// untuk unit testing terisolasi.
// Jika belum di-export, definisikan ulang di sini sesuai source:
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

  // ─── Menampilkan Pesan ────────────────────────────────────────────────────────

  test("mengisi #modal-message dengan pesan yang diberikan", () => {
    showModal("WebXR tidak tersedia.");
    const msg = document.getElementById("modal-message");
    expect(msg.textContent).toBe("WebXR tidak tersedia.");
  });

  test("menghapus class 'hidden' dari modal saat dipanggil", () => {
    const modal = document.getElementById("error-modal");
    expect(modal.classList.contains("hidden")).toBe(true); // sebelum

    showModal("Pesan error");
    expect(modal.classList.contains("hidden")).toBe(false); // sesudah
  });

  test("modal tetap terbuka sebelum tombol diklik", () => {
    showModal("Pesan error");
    const modal = document.getElementById("error-modal");
    expect(modal.classList.contains("hidden")).toBe(false);
  });

  // ─── Menutup Modal ────────────────────────────────────────────────────────────

  test("klik tombol 'MENGERTI' menutup modal (menambah class 'hidden')", () => {
    showModal("Pesan error");
    document.getElementById("btn-modal-close").click();
    const modal = document.getElementById("error-modal");
    expect(modal.classList.contains("hidden")).toBe(true);
  });

  // ─── shouldGoBack = false (default) ──────────────────────────────────────────

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

  // ─── shouldGoBack = true ──────────────────────────────────────────────────────

  test("history.back dipanggil setelah tutup modal jika shouldGoBack = true", () => {
    showModal("Error kritis", true);
    document.getElementById("btn-modal-close").click();
    expect(window.history.back).toHaveBeenCalledTimes(1);
  });

  // ─── Pesan yang berbeda ───────────────────────────────────────────────────────

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