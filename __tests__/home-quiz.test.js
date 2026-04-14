import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeQuiz from "../src/quiz/home-quiz";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Helper render
const renderHomeQuiz = () =>
  render(
    <MemoryRouter>
      <HomeQuiz />
    </MemoryRouter>
  );

describe("HomeQuiz Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // ─── Rendering Dasar ─────────────────────────────────────────────────────────

  test("menampilkan judul 'Halaman Kuis'", () => {
    renderHomeQuiz();
    expect(screen.getByText("Halaman Kuis")).toBeInTheDocument();
  });

  test("menampilkan input nama pemain", () => {
    renderHomeQuiz();
    expect(screen.getByPlaceholderText(/Masukkan nama/i)).toBeInTheDocument();
  });

  test("menampilkan high score awal 0 jika localStorage kosong", () => {
    renderHomeQuiz();
    expect(screen.getByText(/High Score : 0/i)).toBeInTheDocument();
  });

  // ─── High Score dari localStorage ────────────────────────────────────────────

  test("membaca high score dari localStorage", () => {
    localStorage.setItem("quizHighScore", "80");
    renderHomeQuiz();
    expect(screen.getByText(/High Score : 80/i)).toBeInTheDocument();
  });

  test("menampilkan badge jika highScore > 0", () => {
    localStorage.setItem("quizHighScore", "90");
    renderHomeQuiz();
    expect(screen.getByText("Quiz Master")).toBeInTheDocument();
  });

  test("tidak menampilkan badge jika highScore = 0", () => {
    renderHomeQuiz();
    expect(screen.queryByText("Quiz Master")).not.toBeInTheDocument();
    expect(screen.queryByText("Beginner")).not.toBeInTheDocument();
  });

  // ─── Validasi Nama ────────────────────────────────────────────────────────────

  test("menampilkan peringatan jika nama kosong dan klik Mulai", () => {
    renderHomeQuiz();
    fireEvent.click(screen.getByText("Mulai Kuis"));
    expect(screen.getByText(/Nama Belum Diisi/i)).toBeInTheDocument();
  });

  test("modal warning nama hilang setelah klik OK", () => {
    renderHomeQuiz();
    fireEvent.click(screen.getByText("Mulai Kuis"));
    fireEvent.click(screen.getByText("OK"));
    expect(screen.queryByText(/Nama Belum Diisi/i)).not.toBeInTheDocument();
  });

  test("tidak menampilkan peringatan jika nama diisi lalu klik Mulai", () => {
    renderHomeQuiz();
    fireEvent.change(screen.getByPlaceholderText(/Masukkan nama/i), {
      target: { value: "Siti" },
    });
    fireEvent.click(screen.getByText("Mulai Kuis"));
    expect(screen.queryByText(/Nama Belum Diisi/i)).not.toBeInTheDocument();
  });

  // ─── Navigasi ke halaman kuis ────────────────────────────────────────────────

  test("navigate dipanggil dengan state yang benar saat Mulai Kuis", () => {
    renderHomeQuiz();
    fireEvent.change(screen.getByPlaceholderText(/Masukkan nama/i), {
      target: { value: "  Doni  " },
    });
    fireEvent.click(screen.getByText("Mulai Kuis"));
    expect(mockNavigate).toHaveBeenCalledWith(
      "halaman-kuis",
      expect.objectContaining({
        state: expect.objectContaining({ playerName: "Doni" }),
      })
    );
  });

  test("nama di-trim sebelum dikirim ke navigate", () => {
    renderHomeQuiz();
    fireEvent.change(screen.getByPlaceholderText(/Masukkan nama/i), {
      target: { value: "   Rina   " },
    });
    fireEvent.click(screen.getByText("Mulai Kuis"));
    const callArg = mockNavigate.mock.calls[0][1];
    expect(callArg.state.playerName).toBe("Rina");
  });

  // ─── Reset High Score ────────────────────────────────────────────────────────

  test("klik Reset High Score membuka modal konfirmasi", () => {
    renderHomeQuiz();
    fireEvent.click(screen.getByText("Reset High Score"));
    expect(screen.getByText("Reset High Score?")).toBeInTheDocument();
  });

  test("klik 'Ya' mereset high score ke 0 dan menutup modal", () => {
    localStorage.setItem("quizHighScore", "60");
    renderHomeQuiz();
    fireEvent.click(screen.getByText("Reset High Score"));
    fireEvent.click(screen.getByText("Ya"));
    expect(screen.queryByText("Reset High Score?")).not.toBeInTheDocument();
    expect(screen.getByText(/High Score : 0/i)).toBeInTheDocument();
    expect(localStorage.getItem("quizHighScore")).toBeNull();
  });

  test("klik 'Batal' menutup modal tanpa mereset", () => {
    localStorage.setItem("quizHighScore", "60");
    renderHomeQuiz();
    fireEvent.click(screen.getByText("Reset High Score"));
    fireEvent.click(screen.getByText("Batal"));
    expect(screen.queryByText("Reset High Score?")).not.toBeInTheDocument();
    expect(screen.getByText(/High Score : 60/i)).toBeInTheDocument();
  });

  // ─── Info Panel ──────────────────────────────────────────────────────────────

  test("klik tombol info menampilkan panel Level Penilaian", () => {
    renderHomeQuiz();
    fireEvent.click(screen.getByRole("button", { name: "" })); // Info icon button
    expect(screen.getByText("Level Penilaian")).toBeInTheDocument();
  });
});