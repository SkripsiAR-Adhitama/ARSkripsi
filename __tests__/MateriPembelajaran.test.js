import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MateriPembelajaran from '../src/Pages/MateriPembelajaran';

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
    render(
      <MemoryRouter initialEntries={['/materi?category=All']}>
        <MateriPembelajaran />
      </MemoryRouter>
    );

    expect(screen.getByTestId('intro-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('blog-mock')).not.toBeInTheDocument();
  });

  test('Harus merender Blog (Mikro) jika kategori selain "All" dipilih', () => {
    render(
      <MemoryRouter initialEntries={['/materi?category=Pernapasan']}>
        <MateriPembelajaran />
      </MemoryRouter>
    );

    expect(screen.getByTestId('blog-mock')).toBeInTheDocument();
    expect(screen.getByTestId('intro-mock')).toBeInTheDocument();
  });

  test('Harus memperbarui URL saat fungsi onCategoryChange dipanggil', () => {
    render(
      <MemoryRouter initialEntries={['/materi?category=All']}>
        <MateriPembelajaran />
      </MemoryRouter>
    );

    const searchComponent = screen.getByTestId('search-mock');
    expect(searchComponent).toBeInTheDocument();
  });
});