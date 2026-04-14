import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blog from '../src/Components/Blog';

// ─── MOCK NAVIGATE ─────────────────────────────────────────────
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// ─── MOCK DATA ─────────────────────────────────────────────────
jest.mock('../src/assets/Materi/materi-ipa', () => [
  { 
    name: 'Paru-Paru', 
    category: 'Pernapasan', 
    description: 'Organ utama pernapasan manusia', 
    pengertian: 'Organ utama pernapasan manusia',
    image: 'paru.png', 
    url_ar: 'pernapasan' 
  },
  { 
    name: 'Lambung', 
    category: 'Pencernaan', 
    description: 'Organ pencerna makanan', 
    pengertian: 'Organ pencerna makanan',
    image: 'lambung.png', 
    url_ar: 'pencernaan' 
  }
]);

describe('Pengujian Komponen Blog (Whitebox)', () => {

  // ─── FIX JSDOM LOCATION ──────────────────────────────────────
  beforeAll(() => {
    delete window.location;
    window.location = {
      href: '',
      pathname: '/blog',
    };
  });

  // ─── FILTER TEST ─────────────────────────────────────────────
  test('Harus menampilkan semua materi saat kategori "All"', () => {
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

  // ─── SEARCH TEST ─────────────────────────────────────────────
  test('Harus memfilter berdasarkan search term', () => {
    render(
      <MemoryRouter>
        <Blog selectedCategory="All" searchTerm="paru" />
      </MemoryRouter>
    );

    expect(screen.getByText('Paru-Paru')).toBeInTheDocument();
    expect(screen.queryByText('Lambung')).not.toBeInTheDocument();
  });

  test('Harus menampilkan pesan jika pencarian tidak cocok', () => {
    render(
      <MemoryRouter>
        <Blog selectedCategory="All" searchTerm="Jantung" />
      </MemoryRouter>
    );

    expect(screen.getByText(/Tidak ada materi ditemukan/i)).toBeInTheDocument();
  });

  // ─── NAVIGATE TEST ───────────────────────────────────────────
  test('Klik card harus navigate ke detail', () => {
    render(
      <MemoryRouter>
        <Blog selectedCategory="All" searchTerm="" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Paru-Paru'));

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/blog-detail/Paru-Paru');
  });

  // ─── AR BUTTON TEST (FIXED) ──────────────────────────────────
  test('Klik tombol AR tidak trigger navigate dan set href', () => {
    render(
      <MemoryRouter>
        <Blog selectedCategory="Pencernaan" searchTerm="" />
      </MemoryRouter>
    );

    const btn = screen.getByRole('button', { name: /Mulai AR/i });
    fireEvent.click(btn);

    expect(window.location.href).toBe('/AR/Pages/pencernaan.html');
    expect(mockedUsedNavigate).not.toHaveBeenCalled();
  });

});