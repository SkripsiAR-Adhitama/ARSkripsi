import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TriviaItem from "../src/quiz/trivia-item";

const defaultProps = {
  correctAnswer: "Bilik Kiri",
  incorrectAnswers: ["Serambi Kanan", "Serambi Kiri", "Bilik Kanan"],
  question: "Bagian jantung di sisi kiri bawah adalah...",
  onNextClick: jest.fn(),
  onAnswerSelected: jest.fn(),
};

describe("TriviaItem Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ─── Rendering Dasar ─────────────────────────────────────────────────────────

  test("menampilkan teks pertanyaan", () => {
    render(<TriviaItem {...defaultProps} />);
    expect(
      screen.getByText("Bagian jantung di sisi kiri bawah adalah...")
    ).toBeInTheDocument();
  });

  test("menampilkan semua 4 pilihan jawaban", () => {
    render(<TriviaItem {...defaultProps} />);
    const buttons = screen.getAllByRole("button");
    // 4 jawaban + 1 tombol Lanjut
    const answerButtons = buttons.filter((b) => b.textContent !== "Lanjut ➡");
    expect(answerButtons).toHaveLength(4);
  });

  test("semua jawaban ditampilkan (correct + incorrect)", () => {
    render(<TriviaItem {...defaultProps} />);
    expect(screen.getByText("Bilik Kiri")).toBeInTheDocument();
    expect(screen.getByText("Serambi Kanan")).toBeInTheDocument();
    expect(screen.getByText("Serambi Kiri")).toBeInTheDocument();
    expect(screen.getByText("Bilik Kanan")).toBeInTheDocument();
  });

  // ─── Sebelum jawaban dipilih ──────────────────────────────────────────────────

  test("tombol 'Lanjut' ter-disable sebelum memilih jawaban", () => {
    render(<TriviaItem {...defaultProps} />);
    const nextBtn = screen.getByText(/Lanjut/i);
    expect(nextBtn).toBeDisabled();
  });

  // ─── Setelah jawaban dipilih ──────────────────────────────────────────────────

  test("memanggil onAnswerSelected dengan true saat jawaban benar diklik", () => {
    render(<TriviaItem {...defaultProps} />);
    fireEvent.click(screen.getByText("Bilik Kiri"));
    expect(defaultProps.onAnswerSelected).toHaveBeenCalledWith(true);
  });

  test("memanggil onAnswerSelected dengan false saat jawaban salah diklik", () => {
    render(<TriviaItem {...defaultProps} />);
    fireEvent.click(screen.getByText("Serambi Kanan"));
    expect(defaultProps.onAnswerSelected).toHaveBeenCalledWith(false);
  });

  test("tombol 'Lanjut' aktif setelah memilih jawaban", () => {
    render(<TriviaItem {...defaultProps} />);
    fireEvent.click(screen.getByText("Bilik Kiri"));
    const nextBtn = screen.getByText(/Lanjut/i);
    expect(nextBtn).not.toBeDisabled();
  });

  test("tombol jawaban ter-disable setelah memilih (tidak bisa ganti jawaban)", () => {
    render(<TriviaItem {...defaultProps} />);
    fireEvent.click(screen.getByText("Bilik Kiri"));
    // Semua tombol jawaban harus disabled
    const answerButtons = screen
      .getAllByRole("button")
      .filter((b) => b.textContent !== "Lanjut ➡");
    answerButtons.forEach((btn) => expect(btn).toBeDisabled());
  });

  // ─── Kelas CSS setelah jawaban dipilih ───────────────────────────────────────

  test("jawaban benar yang dipilih mendapat class --correct", () => {
    render(<TriviaItem {...defaultProps} />);
    const correctBtn = screen.getByText("Bilik Kiri");
    fireEvent.click(correctBtn);
    expect(correctBtn.className).toContain("trivia-item__button--correct");
  });

  test("jawaban salah yang dipilih mendapat class --incorrect", () => {
    render(<TriviaItem {...defaultProps} />);
    const wrongBtn = screen.getByText("Serambi Kanan");
    fireEvent.click(wrongBtn);
    expect(wrongBtn.className).toContain("trivia-item__button--incorrect");
  });

  // ─── Tombol Lanjut ────────────────────────────────────────────────────────────

  test("klik 'Lanjut' memanggil onNextClick", () => {
    render(<TriviaItem {...defaultProps} />);
    fireEvent.click(screen.getByText("Bilik Kiri")); // pilih dulu
    fireEvent.click(screen.getByText(/Lanjut/i));
    expect(defaultProps.onNextClick).toHaveBeenCalledTimes(1);
  });
});