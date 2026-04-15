import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import IntroDetail from '../src/Pages/IntroDetail';

jest.mock('../src/assets/Materi/makro-ipa', () => [
  {
    name: "Organ Pencernaan",
    category: "Pencernaan",
    pengertian: "Sistem pengolah makanan",
    organTerkait: [
      { nama: "Esofagus", fungsi: "Menyalurkan makanan" },
      { nama: "Lambung", fungsi: "Mencerna makanan" }
    ],
    caraKerja: ["Makanan masuk"],
    fungsi: ["Menyerap nutrisi"],
    gangguan: ["Maag"],
    image: "pencernaan.png",
    url_ar: "pencernaan"
  }
]);

describe('Pengujian Halaman IntroDetail (Whitebox)', () => {

  test('Harus merender data sistem organ yang benar berdasarkan URL', () => {
    render(
      <MemoryRouter initialEntries={['/intro-detail/Organ Pencernaan']}>
        <Routes>
          <Route path="/intro-detail/:name" element={<IntroDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Organ Pencernaan')).toBeInTheDocument();
    expect(screen.getByText('Pencernaan')).toBeInTheDocument();
    expect(screen.getByText('Sistem pengolah makanan')).toBeInTheDocument();
  });

  test('Harus merender daftar Organ Terkait dengan benar (Grid Mapping)', () => {
    render(
      <MemoryRouter initialEntries={['/intro-detail/Organ Pencernaan']}>
        <Routes>
          <Route path="/intro-detail/:name" element={<IntroDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Esofagus')).toBeInTheDocument();
    expect(screen.getByText('Menyalurkan makanan')).toBeInTheDocument();
    expect(screen.getByText('Lambung')).toBeInTheDocument();
  });

  test('Harus memicu alert jika sistem organ tidak ditemukan', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(
      <MemoryRouter initialEntries={['/intro-detail/SistemGhaib']}>
        <Routes>
          <Route path="/intro-detail/:name" element={<IntroDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(alertMock).toHaveBeenCalledWith('Materi tidak ditemukan');
    alertMock.mockRestore();
  });
});