import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomeQuiz from "../src/quiz/home-quiz";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderHomeQuiz = () =>
  render(
    <MemoryRouter>
      <HomeQuiz />
    </MemoryRouter>,
  );

describe("HomeQuiz Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

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

  test("badge Expert (>=80)", () => {
    localStorage.setItem("quizHighScore", "85");
    renderHomeQuiz();
    expect(screen.getByText("Expert")).toBeInTheDocument();
  });

  test("badge Learner (>=70)", () => {
    localStorage.setItem("quizHighScore", "75");
    renderHomeQuiz();
    expect(screen.getByText("Learner")).toBeInTheDocument();
  });

  test("badge Beginner (<70)", () => {
    localStorage.setItem("quizHighScore", "60");
    renderHomeQuiz();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });

  test("tidak menampilkan badge jika highScore = 0", () => {
    renderHomeQuiz();
    expect(screen.queryByText("Quiz Master")).not.toBeInTheDocument();
    expect(screen.queryByText("Beginner")).not.toBeInTheDocument();
  });

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
      }),
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

  test("klik tombol info menampilkan panel Level Penilaian", () => {
    renderHomeQuiz();
    fireEvent.click(screen.getByRole("button", { name: "" }));
    expect(screen.getByText("Level Penilaian")).toBeInTheDocument();
  });

  test("tidak crash jika localStorage kosong", () => {
    localStorage.removeItem("quizHighScore");
    renderHomeQuiz();
    expect(screen.getByText(/High Score : 0/i)).toBeInTheDocument();
  });

  test("klik di luar info panel menutup info", async () => {
    renderHomeQuiz();

    fireEvent.click(screen.getByRole("button", { name: "" }));

    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText("Level Penilaian")).not.toBeInTheDocument();
    });
  });

  test("klik di dalam info panel tidak menutup", () => {
    renderHomeQuiz();

    fireEvent.click(screen.getByRole("button", { name: "" }));

    const panel = screen.getByText("Level Penilaian");

    fireEvent.mouseDown(panel);

    expect(screen.getByText("Level Penilaian")).toBeInTheDocument();
  });

  test("nama hanya spasi tetap dianggap kosong", () => {
    renderHomeQuiz();

    fireEvent.change(screen.getByPlaceholderText(/Masukkan nama/i), {
      target: { value: "   " },
    });

    fireEvent.click(screen.getByText("Mulai Kuis"));

    expect(screen.getByText(/Nama Belum Diisi/i)).toBeInTheDocument();
  });
});
