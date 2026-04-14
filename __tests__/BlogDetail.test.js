import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogDetail from '../src/Pages/BlogDetail';

// Mocking data agar hasil tes konsisten sesuai struktur materi-ipa.js [cite: 47]
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
    // Kita simulasikan user membuka link /blog-detail/Jantung 
    render(
      <MemoryRouter initialEntries={['/blog-detail/Jantung']}>
        <Routes>
          <Route path="/blog-detail/:name" element={<BlogDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Memastikan judul dan kategori sesuai data yang di-find [cite: 48, 53]
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

    // Memastikan mapping array caraKerja dan fungsi berjalan [cite: 56, 57]
    expect(screen.getByText('Memompa darah')).toBeInTheDocument();
    expect(screen.getByText('Menyuplai oksigen')).toBeInTheDocument();
  });

  test('Harus memicu alert dan navigasi balik jika nama materi tidak ada di data', () => {
    // Mock window.alert karena JSDOM tidak punya fungsi alert 
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(
      <MemoryRouter initialEntries={['/blog-detail/OrganPalsu']}>
        <Routes>
          <Route path="/blog-detail/:name" element={<BlogDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifikasi logika penanganan error 
    expect(alertMock).toHaveBeenCalledWith('Materi tidak ditemukan');
    alertMock.mockRestore();
  });
});