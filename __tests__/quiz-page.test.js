import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import QuizPage from "../src/quiz/quiz-page";

// 🔹 Mock Game Component
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

// 🔹 Helper render
const renderQuizPage = (state = {}) =>
  render(
    <MemoryRouter initialEntries={[{ pathname: "/halaman-kuis", state }]}>
      <Routes>
        <Route path="/halaman-kuis" element={<QuizPage />} />
      </Routes>
    </MemoryRouter>
  );

describe("QuizPage Component", () => {
  // ─── STATE TEST ─────────────────────────────────────────

  test("meneruskan playerName dari location.state ke Game", () => {
    renderQuizPage({ playerName: "Rudi", numQuestions: 5 });
    expect(screen.getByText(/Rudi/)).toBeInTheDocument();
  });

  test("meneruskan numQuestions dari location.state ke Game", () => {
    renderQuizPage({ playerName: "Rudi", numQuestions: 15 });
    expect(screen.getByText(/15 soal/)).toBeInTheDocument();
  });

  test("menggunakan default 'Guest'", () => {
    renderQuizPage({});
    expect(screen.getByText(/Guest/)).toBeInTheDocument();
  });

  test("menggunakan default 20 soal", () => {
    renderQuizPage({});
    expect(screen.getByText(/20 soal/)).toBeInTheDocument();
  });

  // ─── MODAL AWAL ─────────────────────────────────────────

  test("modal tidak tampil saat awal render", () => {
    renderQuizPage();
    expect(
      screen.queryByText(/Selesaikan kuis/i)
    ).not.toBeInTheDocument();
  });

  // ─── GAME FINISH ────────────────────────────────────────

  test("isFinished aktif setelah klik selesai", () => {
    renderQuizPage();
    fireEvent.click(screen.getByText("Selesai Game"));

    expect(
      screen.queryByText(/Selesaikan kuis/i)
    ).not.toBeInTheDocument();
  });

  // ─── BEFOREUNLOAD ───────────────────────────────────────

  test("beforeunload listener ditambahkan", () => {
    const spy = jest.spyOn(window, "addEventListener");

    renderQuizPage();

    expect(spy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );

    spy.mockRestore();
  });

  test("beforeunload listener dihapus saat unmount", () => {
    const spy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderQuizPage();
    unmount();

    expect(spy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function)
    );

    spy.mockRestore();
  });

  test("beforeunload mencegah keluar", () => {
    renderQuizPage();

    const event = new Event("beforeunload");
    event.preventDefault = jest.fn();

    act(() => {
      window.dispatchEvent(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
  });

  // ─── POPSTATE (BACK BUTTON) ─────────────────────────────

  test("modal muncul saat tekan back", async () => {
    renderQuizPage();

    await waitFor(() => {}); // tunggu useEffect

    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(
      await screen.findByText(/Selesaikan kuis terlebih dahulu/i)
    ).toBeInTheDocument();
  });

  test("modal bisa ditutup", async () => {
    renderQuizPage();

    await waitFor(() => {});

    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    const btn = await screen.findByText(/Mengerti/i);
    fireEvent.click(btn);

    expect(
      screen.queryByText(/Selesaikan kuis/i)
    ).not.toBeInTheDocument();
  });

  test("tidak tampil modal jika sudah selesai", async () => {
    renderQuizPage();

    fireEvent.click(screen.getByText("Selesai Game"));

    await waitFor(() => {});

    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(
      screen.queryByText(/Selesaikan kuis/i)
    ).not.toBeInTheDocument();
  });

  test("pushState dipanggil saat mount", () => {
    const spy = jest.spyOn(window.history, "pushState");

    renderQuizPage();

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });

  test("isi modal tampil dengan benar", async () => {
    renderQuizPage();

    await waitFor(() => {});

    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(await screen.findByText("⚠️ Perhatian")).toBeInTheDocument();
    expect(
      screen.getByText(/Selesaikan kuis terlebih dahulu/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Mengerti")).toBeInTheDocument();
  });

  test("event popstate dihapus saat unmount", () => {
    const spy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderQuizPage();
    unmount();

    expect(spy).toHaveBeenCalledWith(
      "popstate",
      expect.any(Function)
    );

    spy.mockRestore();
  });
});