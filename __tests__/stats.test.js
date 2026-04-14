/**
 * Unit Test: stats.jsx
 * Menguji komponen Stats yang menampilkan skor, nyawa, dan progress bar.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Stats from "../src/quiz/stats";

describe("Stats Component", () => {
  const defaultProps = {
    score: 8,
    questionNumber: 3,
    totalQuestions: 10,
    remainingLives: 5,
  };

  // ─── Rendering Dasar ─────────────────────────────────────────────────────────

  test("menampilkan skor yang benar", () => {
    render(<Stats {...defaultProps} />);
    expect(screen.getByText(/Skor: 8/i)).toBeInTheDocument();
  });

  test("menampilkan jumlah hati sesuai remainingLives", () => {
    render(<Stats {...defaultProps} remainingLives={3} />);
    const hearts = screen.getAllByText("❤️");
    expect(hearts).toHaveLength(3);
  });

  // ─── remainingLives = 0 ──────────────────────────────────────────────────────

  test("menampilkan '0 ❤️' jika nyawa habis", () => {
    render(<Stats {...defaultProps} remainingLives={0} />);
    expect(screen.getByText("0 ❤️")).toBeInTheDocument();
  });

  // ─── Progress Text ────────────────────────────────────────────────────────────

  test("menampilkan sisa soal jika bukan soal terakhir", () => {
    render(<Stats {...defaultProps} questionNumber={3} totalQuestions={10} />);
    // sisa = 10 - 3 = 7
    expect(screen.getByText(/Sisa 7 soal lagi!/i)).toBeInTheDocument();
  });

  test("menampilkan pesan soal terakhir jika questionNumber === totalQuestions", () => {
    render(<Stats {...defaultProps} questionNumber={10} totalQuestions={10} />);
    expect(screen.getByText(/Soal Terakhir! Ayo fokus!/i)).toBeInTheDocument();
  });

  // ─── Progress Bar ─────────────────────────────────────────────────────────────

  test("progress bar memiliki lebar yang proporsional", () => {
    const { container } = render(
      <Stats {...defaultProps} questionNumber={5} totalQuestions={10} />
    );
    const fill = container.querySelector(".progress-bar-fill");
    expect(fill).toHaveStyle("width: 50%");
  });

  test("progress bar 100% di soal terakhir", () => {
    const { container } = render(
      <Stats {...defaultProps} questionNumber={10} totalQuestions={10} />
    );
    const fill = container.querySelector(".progress-bar-fill");
    expect(fill).toHaveStyle("width: 100%");
  });
});