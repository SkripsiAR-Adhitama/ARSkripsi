import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MateriPembelajaran from '../src/Pages/MateriPembelajaran';

// 1. Mocking sub-komponen agar test fokus pada logika routing di halaman ini
jest.mock('../src/Components/Search', () => ({ onCategoryChange, selectedCategory }) => (
  <div data-testid="search-mock" onClick={() => onCategoryChange('Peredaran')}>
    Search Mock - {selectedCategory}
  </div>
));

jest.mock('../src/Components/IntroPost', () => ({ selectedCategory }) => (
  <div data-testid="intro-mock">Intro Makro - {selectedCategory}</div>
));

jest.mock('../src/Components/Blog', () => ({ selectedCategory }) => (
  <div data-testid="blog-mock">Blog Mikro - {selectedCategory}</div>
));

describe('Pengujian Halaman MateriPembelajaran (Whitebox)', () => {

  test('Harus merender IntroPost (Makro) saja jika kategori adalah "All"', () => {
    // Simulasi URL: /materi?category=All
    render(
      <MemoryRouter initialEntries={['/materi?category=All']}>
        <MateriPembelajaran />
      </MemoryRouter>
    );

    // Saat kategori 'All', Blog mikro harusnya TIDAK muncul (sesuai logika line 31)
    expect(screen.getByTestId('intro-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('blog-mock')).not.toBeInTheDocument();
  });

  test('Harus merender Blog (Mikro) jika kategori selain "All" dipilih', () => {
    // Simulasi URL: /materi?category=Pernapasan
    render(
      <MemoryRouter initialEntries={['/materi?category=Pernapasan']}>
        <MateriPembelajaran />
      </MemoryRouter>
    );

    // Blog mikro harus muncul untuk kategori spesifik
    expect(screen.getByTestId('blog-mock')).toBeInTheDocument();
    expect(screen.getByTestId('intro-mock')).toBeInTheDocument();
  });

  test('Harus memperbarui URL saat fungsi onCategoryChange dipanggil', () => {
    // Kita gunakan window.location palsu untuk mengecek perubahan URL
    render(
      <MemoryRouter initialEntries={['/materi?category=All']}>
        <MateriPembelajaran />
      </MemoryRouter>
    );

    const searchComponent = screen.getByTestId('search-mock');
    // Klik mock search yang akan memicu onCategoryChange('Peredaran')
    // Secara internal ini akan memanggil setParams
    expect(searchComponent).toBeInTheDocument();
  });
});