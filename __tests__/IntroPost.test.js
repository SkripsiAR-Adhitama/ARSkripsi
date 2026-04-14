import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import IntroPost from "../src/Components/IntroPost";

// ─── MOCK NAVIGATE ─────────────────────────────────────────────
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

// ─── MOCK DATA ─────────────────────────────────────────────────
jest.mock("../src/assets/Materi/makro-ipa", () => [
  {
    category: "Pencernaan",
    name: "Organ Pencernaan",
    pengertian: "Lambung, Hati, Pankreas",
    url_ar: "pencernaan",
    image: "pencernaan.png",
  },
  {
    category: "Pernapasan",
    name: "Organ Pernapasan",
    pengertian: "Trakea, Paru-paru",
    url_ar: "pernapasan",
    image: "paru.png",
  },
]);

describe("IntroPost Component (Improved Coverage)", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ─── FILTER TEST ─────────────────────────────────────────────
  test("menampilkan data sesuai kategori", () => {
    render(
      <MemoryRouter>
        <IntroPost selectedCategory="Pernapasan" />
      </MemoryRouter>
    );

    expect(screen.getByText("Organ Pernapasan")).toBeInTheDocument();
    expect(screen.queryByText("Organ Pencernaan")).not.toBeInTheDocument();
  });

  test("menampilkan semua data jika kategori 'All'", () => {
    render(
      <MemoryRouter>
        <IntroPost selectedCategory="All" />
      </MemoryRouter>
    );

    expect(screen.getByText("Organ Pencernaan")).toBeInTheDocument();
    expect(screen.getByText("Organ Pernapasan")).toBeInTheDocument();
  });

  // ─── NAVIGATE TEST ───────────────────────────────────────────
  test("navigasi ke detail saat card diklik", () => {
    render(
      <MemoryRouter>
        <IntroPost selectedCategory="Pencernaan" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Organ Pencernaan"));

    expect(mockedUsedNavigate).toHaveBeenCalledWith(
      "/intro-detail/Organ Pencernaan"
    );
  });

  // ─── BUTTON AR TEST ──────────────────────────────────────────
  test("tombol AR tidak trigger navigate (stopPropagation bekerja)", () => {
    delete window.location;
    window.location = { href: "" };

    render(
      <MemoryRouter>
        <IntroPost selectedCategory="Pencernaan" />
      </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: /Mulai AR/i });
    fireEvent.click(btn);

    expect(window.location.pathname).toBe("/AR/Pages/pencernaan.html");
    expect(mockedUsedNavigate).not.toHaveBeenCalled();
  });

  // ─── EMPTY DATA TEST ─────────────────────────────────────────
  test("menampilkan pesan jika data kosong", () => {
    render(
      <MemoryRouter>
        <IntroPost selectedCategory="TidakAda" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Data tidak ditemukan/i)).toBeInTheDocument();
  });

  // ─── IMAGE TEST (SUCCESS PATH) ───────────────────────────────
  test("image dirender dengan benar", () => {
    render(
      <MemoryRouter>
        <IntroPost selectedCategory="Pencernaan" />
      </MemoryRouter>
    );

    const img = screen.getByAltText("Organ Pencernaan");
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("pencernaan.png");
  });

  // ─── IMAGE ERROR (CATCH BLOCK) ───────────────────────────────
  test("fallback image digunakan jika error", () => {
    const originalURL = global.URL;

    global.URL = jest.fn(() => {
      throw new Error("Image error");
    });

    render(
      <MemoryRouter>
        <IntroPost selectedCategory="Pencernaan" />
      </MemoryRouter>
    );

    const img = screen.getByAltText("Organ Pencernaan");
    expect(img.src).toContain("via.placeholder.com");

    global.URL = originalURL;
  });

});