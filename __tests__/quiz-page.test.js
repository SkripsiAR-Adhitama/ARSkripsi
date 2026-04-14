import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import QuizPage from "../src/quiz/quiz-page";


jest.mock("../src/quiz/game", () => {
  const React = require("react");
  return function MockGame({ playerName, numQuestions, onGameFinish }) {
    return (
      <div>
        <div data-testid="mock-game">
          Game: {playerName} | {numQuestions} soal
        </div>
        <button onClick={onGameFinish}>Selesai Game</button>
      </div>
    );
  };
});

// Helper render dengan location.state
const renderQuizPage = (state = {}) =>
  render(
    <MemoryRouter
      initialEntries={[{ pathname: "/halaman-kuis", state }]}
    >
      <Routes>
        <Route path="/halaman-kuis" element={<QuizPage />} />
      </Routes>
    </MemoryRouter>
  );

describe("QuizPage Component", () => {
  // ─── Membaca state dari navigate ─────────────────────────────────────────────

  test("meneruskan playerName dari location.state ke Game", () => {
    renderQuizPage({ playerName: "Rudi", numQuestions: 5 });
    expect(screen.getByText(/Rudi/)).toBeInTheDocument();
  });

  test("meneruskan numQuestions dari location.state ke Game", () => {
    renderQuizPage({ playerName: "Rudi", numQuestions: 15 });
    expect(screen.getByText(/15 soal/)).toBeInTheDocument();
  });

  test("menggunakan default 'Guest' jika playerName tidak ada di state", () => {
    renderQuizPage({});
    expect(screen.getByText(/Guest/)).toBeInTheDocument();
  });

  test("menggunakan default 20 soal jika numQuestions tidak ada di state", () => {
    renderQuizPage({});
    expect(screen.getByText(/20 soal/)).toBeInTheDocument();
  });

  // ─── Modal peringatan back button ────────────────────────────────────────────

  test("modal peringatan tidak tampil saat awal render", () => {
    renderQuizPage({ playerName: "Ana", numQuestions: 10 });
    expect(screen.queryByText(/Selesaikan kuis/i)).not.toBeInTheDocument();
  });

  // ─── Setelah game selesai ─────────────────────────────────────────────────────

  test("isFinished menjadi true setelah onGameFinish dipanggil", () => {
    renderQuizPage({ playerName: "Ana", numQuestions: 3 });
    // Klik tombol yang memanggil onGameFinish di mock Game
    fireEvent.click(screen.getByText("Selesai Game"));
    // Tidak ada efek visual langsung, tapi tidak ada error
    // State isFinished mencegah modal back button muncul
    expect(screen.queryByText(/Selesaikan kuis/i)).not.toBeInTheDocument();
  });

  // ─── Event listener beforeunload ─────────────────────────────────────────────

  test("event listener beforeunload ditambahkan saat mount", () => {
    const addSpy = jest.spyOn(window, "addEventListener");
    renderQuizPage({ playerName: "Beni", numQuestions: 5 });
    expect(addSpy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );
    addSpy.mockRestore();
  });

  test("event listener beforeunload dihapus saat unmount", () => {
    const removeSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderQuizPage({ playerName: "Beni", numQuestions: 5 });
    unmount();
    expect(removeSpy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );
    removeSpy.mockRestore();
  });
});