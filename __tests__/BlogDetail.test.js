import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogDetail from '../src/Pages/BlogDetail';

jest.mock('../src/assets/Materi/materi-ipa', () => [
  { 
    name: 'Jantung', 
    category: 'Peredaran', 
    pengertian: 'Organ pemompa darah', 
    caraKerja: ['Memompa darah'], 
    fungsi: ['Menyuplai oksigen'], 
    gangguan: ['Gagal jantung'],
    image: 'jantung.png',
    url_ar: 'jantung_scene'
  }
]);

describe('Pengujian Halaman BlogDetail (Whitebox)', () => {
  
  test('Harus merender data organ yang benar berdasarkan parameter URL', () => {
    render(
      <MemoryRouter initialEntries={['/blog-detail/Jantung']}>
        <Routes>
          <Route path="/blog-detail/:name" element={<BlogDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Jantung')).toBeInTheDocument();
    expect(screen.getByText('Peredaran')).toBeInTheDocument();
    expect(screen.getByText('Organ pemompa darah')).toBeInTheDocument();
  });

  test('Harus merender daftar cara kerja dan fungsi sebagai list', () => {
    render(
      <MemoryRouter initialEntries={['/blog-detail/Jantung']}>
        <Routes>
          <Route path="/blog-detail/:name" element={<BlogDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Memompa darah')).toBeInTheDocument();
    expect(screen.getByText('Menyuplai oksigen')).toBeInTheDocument();
  });

  test('Harus memicu alert dan navigasi balik jika nama materi tidak ada di data', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(
      <MemoryRouter initialEntries={['/blog-detail/OrganPalsu']}>
        <Routes>
          <Route path="/blog-detail/:name" element={<BlogDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(alertMock).toHaveBeenCalledWith('Materi tidak ditemukan');
    alertMock.mockRestore();
  });
});