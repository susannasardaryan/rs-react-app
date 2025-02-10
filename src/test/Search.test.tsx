import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Search from '../components/Search';

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

//   it('saves the entered value to localStorage when Search button is clicked', async () => {
//     render(
//       <MemoryRouter>
//         <Search onSearch={mockOnSearch} />
//       </MemoryRouter>
//     );

//     const input = screen.getByRole('textbox');
//     fireEvent.change(input, { target: { value: 'Luke' } });

//     const button = screen.getByRole('button', { name: /search/i });

//     // Use act() to ensure state updates are handled properly
//     await act(async () => {
//       fireEvent.click(button);
//     });


//     await waitFor(() => {
//       expect(localStorage.getItem('searchTerm')).toBe('Luke');
//     });


//     expect(mockOnSearch).toHaveBeenCalledWith('Luke');
//   });

  it('retrieves the value from localStorage upon mounting', async () => {
    localStorage.setItem('searchTerm', 'Leia Organa');

    render(
      <MemoryRouter>
        <Search onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('Leia Organa');
    });
  });
});
