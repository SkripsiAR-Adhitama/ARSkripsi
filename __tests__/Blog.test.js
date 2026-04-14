import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blog from '../src/Components/Blog';

// 1. Mocking Navigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// 2. Mocking Data (Fokus pada logika Filter)
jest.mock('../src/assets/Materi/materi-ipa', () => [
  { 
    name: 'Paru-Paru', 
    category: 'Pernapasan', 
    description: 'Organ utama pernapasan manusia', 
    image: 'paru.png', 
    url_ar: 'pernapasan' 
  },
  { 
    name: 'Lambung', 
    category: 'Pencernaan', 
    description: 'Organ pencerna makanan', 
    image: 'lambung.png', 
    url_ar: 'pencernaan' 
  }
]);

describe('Pengujian Komponen Blog (Whitebox)', () => {

  test('Harus menampilkan semua materi saat kategori adalah "All"', () => {
    render(
      <MemoryRouter>
        <Blog selectedCategory="All" searchTerm="" />
      </MemoryRouter>
    );
    expect(screen.getByText('Paru-Paru')).toBeInTheDocument();
    expect(screen.getByText('Lambung')).toBeInTheDocument();
  });

  test('Harus menyaring materi berdasarkan kategori "Pencernaan"', () => {
    render(
      <MemoryRouter>
        <Blog selectedCategory="Pencernaan" searchTerm="" />
      </MemoryRouter>
    );
    expect(screen.getByText('Lambung')).toBeInTheDocument();
    expect(screen.queryByText('Paru-Paru')).not.toBeInTheDocument();
  });

  test('Harus menampilkan pesan jika pencarian tidak cocok', () => {
    render(
      <MemoryRouter>
        <Blog selectedCategory="All" searchTerm="Jantung" />
      </MemoryRouter>
    );
    expect(screen.getByText(/Tidak ada materi ditemukan/i)).toBeInTheDocument();
  });
});