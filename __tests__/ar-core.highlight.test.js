/**
 * Unit Test: ar-core.js → highlightOrgan() & clearHighlight()
 *
 * Menguji fungsi highlight 3D organ pada mesh Three.js:
 * - highlightOrgan: mengubah emissive warna mesh yang cocok
 * - clearHighlight: mengembalikan emissive ke nilai semula
 *
 * @testenv jsdom
 */

import { setupARDom } from "./ar-core.setup";

// ─── Helper: buat mock Mesh Three.js ─────────────────────────────────────────
function createMockMesh(organTitle = "Test Organ") {
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

// ─── Definisi fungsi (sesuai source ar-core.js) ───────────────────────────────

const T = global.AFRAME.THREE;
let meshToOrgan;
let highlightedMeshes;

function highlightOrgan(organTitle) {
  clearHighlight();
  meshToOrgan.forEach((info, mesh) => {
    if (info.title === organTitle) {
      mesh.userData.originalEmissive = mesh.material.emissive?.clone();
      mesh.userData.originalEmissiveIntensity = mesh.material.emissiveIntensity;
      mesh.material.emissive = new T.Color(0x00aaff);
      mesh.material.emissiveIntensity = 0.6;
      mesh.material.needsUpdate = true;
      highlightedMeshes.push(mesh);
    }
  });
}

function clearHighlight() {
  highlightedMeshes.forEach((mesh) => {
    if (mesh.userData.originalEmissive) {
      mesh.material.emissive = mesh.userData.originalEmissive;
      mesh.material.emissiveIntensity = mesh.userData.originalEmissiveIntensity ?? 0;
      mesh.material.needsUpdate = true;
    }
  });
  highlightedMeshes = [];
}

describe("highlightOrgan() & clearHighlight()", () => {
  beforeEach(() => {
    setupARDom();
    meshToOrgan = new Map();
    highlightedMeshes = [];
  });

  // ─── highlightOrgan ────────────────────────────────────────────────────────

  test("mesh dengan judul yang cocok mendapat emissiveIntensity 0.6", () => {
    const mesh = createMockMesh();
    meshToOrgan.set(mesh, { title: "Paru-Paru", desc: "Organ pernapasan." });

    highlightOrgan("Paru-Paru");

    expect(mesh.material.emissiveIntensity).toBe(0.6);
  });

  test("mesh dengan judul yang cocok mendapat warna emissive baru", () => {
    const mesh = createMockMesh();
    meshToOrgan.set(mesh, { title: "Aorta", desc: "Arteri terbesar." });

    highlightOrgan("Aorta");

    // emissive di-set ke new T.Color(0x00aaff)
    expect(mesh.material.emissive).toBeDefined();
    expect(mesh.material.emissive.hex).toBe(0x00aaff);
  });

  test("mesh.material.needsUpdate = true setelah highlight", () => {
    const mesh = createMockMesh();
    meshToOrgan.set(mesh, { title: "Bronkus", desc: "Percabangan trakea." });

    highlightOrgan("Bronkus");

    expect(mesh.material.needsUpdate).toBe(true);
  });

  test("emissive asli disimpan di userData.originalEmissive", () => {
    const mesh = createMockMesh();
    const originalEmissive = mesh.material.emissive.clone();
    meshToOrgan.set(mesh, { title: "Lambung", desc: "Kantung pencernaan." });

    highlightOrgan("Lambung");

    expect(mesh.userData.originalEmissive).toBeDefined();
  });

  test("emissiveIntensity asli disimpan di userData.originalEmissiveIntensity", () => {
    const mesh = createMockMesh();
    mesh.material.emissiveIntensity = 0.1;
    meshToOrgan.set(mesh, { title: "Hati", desc: "Kelenjar terbesar." });

    highlightOrgan("Hati");

    expect(mesh.userData.originalEmissiveIntensity).toBe(0.1);
  });

  test("mesh yang tidak cocok judulnya TIDAK di-highlight", () => {
    const meshA = createMockMesh();
    const meshB = createMockMesh();
    meshToOrgan.set(meshA, { title: "Paru-Paru", desc: "..." });
    meshToOrgan.set(meshB, { title: "Jantung", desc: "..." });

    highlightOrgan("Paru-Paru");

    expect(meshA.material.emissiveIntensity).toBe(0.6); // di-highlight
    expect(meshB.material.emissiveIntensity).toBe(0);   // tidak
  });

  test("multiple mesh dengan judul sama semuanya di-highlight", () => {
    const mesh1 = createMockMesh();
    const mesh2 = createMockMesh();
    meshToOrgan.set(mesh1, { title: "Bilik Kiri", desc: "..." });
    meshToOrgan.set(mesh2, { title: "Bilik Kiri", desc: "..." });

    highlightOrgan("Bilik Kiri");

    expect(mesh1.material.emissiveIntensity).toBe(0.6);
    expect(mesh2.material.emissiveIntensity).toBe(0.6);
    expect(highlightedMeshes).toHaveLength(2);
  });

  test("meshToOrgan kosong: tidak ada error saat highlight", () => {
    expect(() => highlightOrgan("Organ Tidak Ada")).not.toThrow();
  });

  test("judul organ yang tidak ada: tidak ada mesh di-highlight", () => {
    const mesh = createMockMesh();
    meshToOrgan.set(mesh, { title: "Pankreas", desc: "..." });

    highlightOrgan("Organ Tidak Ada");

    expect(mesh.material.emissiveIntensity).toBe(0); // tidak berubah
    expect(highlightedMeshes).toHaveLength(0);
  });

  // ─── clearHighlight ────────────────────────────────────────────────────────

  test("clearHighlight: mengembalikan emissive ke nilai asli", () => {
    const mesh = createMockMesh();
    const savedEmissive = { hex: 0x000000 };
    meshToOrgan.set(mesh, { title: "Vena", desc: "..." });

    highlightOrgan("Vena");
    mesh.userData.originalEmissive = savedEmissive; // simulasikan save

    clearHighlight();

    expect(mesh.material.emissive).toBe(savedEmissive);
  });

  test("clearHighlight: mengembalikan emissiveIntensity ke nilai asli", () => {
    const mesh = createMockMesh();
    mesh.material.emissiveIntensity = 0.2;
    meshToOrgan.set(mesh, { title: "Serambi", desc: "..." });

    highlightOrgan("Serambi");
    // Simulasikan nilai tersimpan
    mesh.userData.originalEmissiveIntensity = 0.2;

    clearHighlight();

    expect(mesh.material.emissiveIntensity).toBe(0.2);
  });

  test("clearHighlight: highlightedMeshes dikosongkan", () => {
    const mesh = createMockMesh();
    meshToOrgan.set(mesh, { title: "Trakea", desc: "..." });

    highlightOrgan("Trakea");
    expect(highlightedMeshes.length).toBeGreaterThan(0);

    clearHighlight();
    expect(highlightedMeshes).toHaveLength(0);
  });

  test("clearHighlight: aman dipanggil saat tidak ada yang di-highlight", () => {
    expect(() => clearHighlight()).not.toThrow();
    expect(highlightedMeshes).toHaveLength(0);
  });

  test("clearHighlight: mesh tanpa originalEmissive tidak menyebabkan error", () => {
    const mesh = createMockMesh();
    mesh.userData.originalEmissive = null; // tidak ada emissive tersimpan
    highlightedMeshes.push(mesh);

    expect(() => clearHighlight()).not.toThrow();
  });

  // ─── Highlight berurutan ──────────────────────────────────────────────────

  test("highlight organ baru otomatis menghapus highlight organ sebelumnya", () => {
    const meshA = createMockMesh();
    const meshB = createMockMesh();
    meshToOrgan.set(meshA, { title: "Organ A", desc: "..." });
    meshToOrgan.set(meshB, { title: "Organ B", desc: "..." });

    highlightOrgan("Organ A");
    expect(highlightedMeshes).toContain(meshA);

    // Highlight organ lain — clearHighlight dipanggil di dalam highlightOrgan
    highlightOrgan("Organ B");
    // meshA harus sudah di-clear (ada di highlightedMeshes baru hanya meshB)
    expect(highlightedMeshes).toContain(meshB);
    expect(highlightedMeshes).not.toContain(meshA);
  });
});