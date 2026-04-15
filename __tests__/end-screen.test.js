import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EndScreen from "../src/quiz/end-screen";

const renderEndScreen = (props = {}) => {
  const defaultProps = {
    playerName: "Budi",
    score: 20,
    lifeBonus: 10,
    finalScore: 30,
    bestScore: 50,
    onRetryClick: jest.fn(),
    remainingLives: 5,
    initialLives: 10,
    isNewHighScore: false,
  };
  return render(
    <MemoryRouter>
      <EndScreen {...defaultProps} {...props} />
    </MemoryRouter>
  );
};

describe("EndScreen Component", () => {

  test("menampilkan judul 'KUIS SELESAI!'", () => {
    renderEndScreen();
    expect(screen.getByText("KUIS SELESAI!")).toBeInTheDocument();
  });

  test("menampilkan nama pemain", () => {
    renderEndScreen({ playerName: "Andi" });
    expect(screen.getByText(/Andi/)).toBeInTheDocument();
  });

  test("menampilkan skor kuis", () => {
    renderEndScreen({ score: 32 });
    expect(screen.getByText("32")).toBeInTheDocument();
  });

  test("menampilkan bonus nyawa dengan format +N", () => {
    renderEndScreen({ lifeBonus: 14 });
    expect(screen.getByText("+14")).toBeInTheDocument();
  });

  test("menampilkan skor akhir (finalScore)", () => {
    renderEndScreen({ finalScore: 46 });
    expect(screen.getByText("46")).toBeInTheDocument();
  });

  test("finalScore >= 90 → badge Quiz Master", () => {
    renderEndScreen({ finalScore: 95 });
    expect(screen.getByText("Quiz Master")).toBeInTheDocument();
  });

  test("finalScore >= 80 → badge Expert", () => {
    renderEndScreen({ finalScore: 82 });
    expect(screen.getByText("Expert")).toBeInTheDocument();
  });

  test("finalScore >= 70 → badge Learner", () => {
    renderEndScreen({ finalScore: 73 });
    expect(screen.getByText("Learner")).toBeInTheDocument();
  });

  test("finalScore < 70 → badge Beginner", () => {
    renderEndScreen({ finalScore: 50 });
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });


  test("menampilkan ikon 💀 jika remainingLives = 0", () => {
    renderEndScreen({ remainingLives: 0 });
    expect(screen.getByText("💀")).toBeInTheDocument();
  });

  test("menampilkan pesan 'nyawamu habis' jika lives = 0", () => {
    renderEndScreen({ remainingLives: 0 });
    expect(screen.getByText(/nyawamu habis/i)).toBeInTheDocument();
  });

  test("menampilkan 🏆 jika masih ada nyawa tersisa", () => {
    renderEndScreen({ remainingLives: 3 });
    const trophyEl = document.querySelector(".end-screen__trophy");
    expect(trophyEl).not.toBeNull();
  });

  test("menampilkan 'REKOR BARU' jika isNewHighScore = true", () => {
    renderEndScreen({ isNewHighScore: true });
    expect(screen.getByText(/REKOR BARU/i)).toBeInTheDocument();
  });

  test("tidak menampilkan 'REKOR BARU' jika isNewHighScore = false", () => {
    renderEndScreen({ isNewHighScore: false });
    expect(screen.queryByText(/REKOR BARU/i)).not.toBeInTheDocument();
  });

  test("tombol 'Main Lagi' memanggil onRetryClick", () => {
    const onRetryClick = jest.fn();
    renderEndScreen({ onRetryClick });
    fireEvent.click(screen.getByText(/Main Lagi/i));
    expect(onRetryClick).toHaveBeenCalledTimes(1);
  });

  test("tombol 'Beranda' tersedia", () => {
    renderEndScreen();
    expect(screen.getByText(/Beranda/i)).toBeInTheDocument();
  });
});