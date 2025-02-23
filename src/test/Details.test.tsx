import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../components/Details';

// Mock the fetch API
global.fetch = vi.fn();

describe('Details', () => {
  const mockData = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays data correctly', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockData.name}`)).toBeInTheDocument();
      expect(screen.getByText(`Height: ${mockData.height}`)).toBeInTheDocument();
      expect(screen.getByText(`Mass: ${mockData.mass}`)).toBeInTheDocument();
      expect(screen.getByText(`Birth Year: ${mockData.birth_year}`)).toBeInTheDocument();
    });
  });

  it('renders the image with the correct URL', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the image to be rendered
    await waitFor(() => {
      const img = screen.getByRole('img') as HTMLImageElement;
      expect(img.src).toBe('https://starwars-visualguide.com/assets/img/characters/1.jpg');
    });
  });

//     // Mock the fetch response
//     (global.fetch as vi.Mock).mockResolvedValueOnce({
//       json: () => Promise.resolve(mockData),
//     });

//     const mockNavigate = vi.fn();
//     vi.mock('react-router-dom', async () => {
//       const actual = await vi.importActual('react-router-dom');
//       return {
//         ...actual,
//         useNavigate: () => mockNavigate,
//       };
//     });

//     render(
//       <MemoryRouter initialEntries={['/details/1']}>
//         <Routes>
//           <Route path="/details/:id" element={<Details />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     // Simulate clicking the Close button
//     const button = screen.getByRole('button', { name: /close/i });
//     fireEvent.click(button);

//     // Verify navigation to the home page
//     expect(mockNavigate).toHaveBeenCalledWith('/');
//   });
});