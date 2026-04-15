import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Game from '../src/quiz/game';

jest.mock('../src/quiz/trivia-data', () => [
  {
    question: "Apa fungsi Jantung?",
    correct_answer: "Memompa darah",
    incorrect_answers: ["Bernapas", "Mencerna"]
  },
  {
    question: "Apa fungsi Paru-paru?",
    correct_answer: "Pertukaran Oksigen",
    incorrect_answers: ["Mencerna"]
  }
]);

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Pengujian Integrasi Logika Kuis (Whitebox)', () => {
  const mockOnGameEnd = jest.fn();

  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
    jest.clearAllMocks();
  });

  const getJawaban = (tipe) => {
    const questionText = screen.getByRole('heading', { level: 2 }).textContent;
    if (questionText.includes("Jantung")) {
      return tipe === 'benar' ? 'Memompa darah' : 'Bernapas';
    } else {
      return tipe === 'benar' ? 'Pertukaran Oksigen' : 'Mencerna';
    }
  };

  test('Harus menambah skor +4 jika jawaban BENAR', () => {
    render(<MemoryRouter><Game onGameEnd={mockOnGameEnd} /></MemoryRouter>);
    const labelSkor = screen.getByText(/Skor:/i);
    
    fireEvent.click(screen.getByText(getJawaban('benar')));
    
    expect(labelSkor).toHaveTextContent('4');
  });

  test('Harus mengurangi lifepoint jika jawaban SALAH', () => {
    render(<MemoryRouter><Game onGameEnd={mockOnGameEnd} /></MemoryRouter>);
    const heartsBefore = screen.getAllByText('❤️').length;
    
    fireEvent.click(screen.getByText(getJawaban('salah')));
    
    const heartsAfter = screen.getAllByText('❤️').length;
    expect(heartsAfter).toBe(heartsBefore - 1);
  });

  test('Skenario: Selesai karena SOAL HABIS (Total Skor 8)', async () => {
    render(<MemoryRouter><Game onGameEnd={mockOnGameEnd} /></MemoryRouter>);

    fireEvent.click(screen.getByText(getJawaban('benar')));
    fireEvent.click(screen.getByText(/Lanjut/i));
    fireEvent.click(screen.getByText(getJawaban('benar')));
    fireEvent.click(screen.getByText(/Lanjut/i));

    await waitFor(() => {
      expect(screen.getByText(/KUIS SELESAI!/i)).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('Skenario: Selesai karena GAME OVER (Nyawa Habis)', async () => {
    render(<MemoryRouter><Game onGameEnd={mockOnGameEnd} /></MemoryRouter>);

    for (let i = 0; i < 10; i++) {
      const btnSalah = screen.queryByText('Bernapas') || screen.queryByText('Mencerna');
      if (btnSalah) {
        fireEvent.click(btnSalah);
        const btnLanjut = screen.queryByText(/Lanjut/i);
        if (btnLanjut) fireEvent.click(btnLanjut);
      }
    }

    await waitFor(() => {
      expect(screen.getByText(/KUIS SELESAI!/i)).toBeInTheDocument();
      expect(screen.getByText(/Beginner/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});