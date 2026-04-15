import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Search from '../src/Components/Search';

// 1. Mocking useNavigate agar tidak error
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Pengujian Komponen Search (Whitebox)', () => {
  const mockOnCategoryChange = jest.fn();

  test('Harus merender semua kategori (All, Pernapasan, Pencernaan, Peredaran)', () => {
    render(
      <MemoryRouter>
        <Search selectedCategory="All" onCategoryChange={mockOnCategoryChange} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Pernapasan')).toBeInTheDocument();
    expect(screen.getByText('Pencernaan')).toBeInTheDocument();
    expect(screen.getByText('Peredaran')).toBeInTheDocument();
  });

  test('Harus memberikan class "activeTag" pada kategori yang sesuai', () => {
    const { container } = render(
      <MemoryRouter>
        <Search selectedCategory="Pencernaan" onCategoryChange={mockOnCategoryChange} />
      </MemoryRouter>
    );

    const tags = container.querySelectorAll('ul');
    
    expect(tags[2].className).toMatch(/activeTag/);
    expect(tags[0].className).toMatch(/inactiveTag/);
  });

  test('Harus memanggil fungsi onCategoryChange saat kategori diklik', () => {
    render(
      <MemoryRouter>
        <Search selectedCategory="All" onCategoryChange={mockOnCategoryChange} />
      </MemoryRouter>
    );
    
    const categoryButton = screen.getByText('Peredaran');
    fireEvent.click(categoryButton);

    expect(mockOnCategoryChange).toHaveBeenCalledWith('Peredaran');
  });
});