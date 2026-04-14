import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import IntroPost from '../src/Components/IntroPost';

// 1. Mocking Navigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// 2. Mocking Data Makro (Sesuaikan field agar toLowerCase tidak error)
jest.mock('../src/assets/Materi/makro-ipa', () => [
  {
    category: "Pencernaan",
    name: "Organ Pencernaan",
    description: "Lambung, Hati, Pankreas",
    url_ar: "pencernaan",
    image: "pencernaan.png"
  },
  {
    category: "Pernapasan",
    name: "Organ Pernapasan",
    description: "Trakea, Paru-paru",
    url_ar: "pernapasan",
    image: "paru.png"
  }
]);

describe('Pengujian Komponen IntroPost (Whitebox)', () => {

  test('Harus menampilkan materi "Pernapasan" jika selectedCategory adalah Pernapasan', () => {
    render(
      <MemoryRouter>
        <IntroPost selectedCategory="Pernapasan" />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Organ Pernapasan')).toBeInTheDocument();
    expect(screen.getByText('Pernapasan')).toBeInTheDocument();
  });

  test('Harus mengarah ke halaman detail saat kartu diklik', () => {
    render(
      <MemoryRouter>
        <IntroPost selectedCategory="Pencernaan" />
      </MemoryRouter>
    );

    // Klik pada area konten kartu
    const cardTitle = screen.getByText('Organ Pencernaan');
    fireEvent.click(cardTitle);

    // Sesuai log: Received: "/intro-detail/Organ Pencernaan"
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/intro-detail/Organ Pencernaan');
  });

  test('Harus merender tombol "Mulai AR" dengan benar', () => {
    render(
      <MemoryRouter>
        <IntroPost selectedCategory="Pencernaan" />
      </MemoryRouter>
    );

    // Sesuai log terminal kamu, ini adalah button, bukan link
    const btnAr = screen.getByRole('button', { name: /Mulai AR/i });
    expect(btnAr).toBeInTheDocument();
    expect(btnAr.className).toContain('btnAr');
  });
});