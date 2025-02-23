import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('NotFound', () => {
  it('displays the 404 message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });


//     const mockNavigate = vi.fn();
//     vi.mock('react-router-dom', async () => {
//       const actual = await vi.importActual('react-router-dom');
//       return {
//         ...actual,

//       };
//     });

//     render(
//       <MemoryRouter>
//         <NotFound />
//       </MemoryRouter>
//     );

//     const button = screen.getByRole('button', { name: /close/i });
//     fireEvent.click(button);

//     expect(mockNavigate).toHaveBeenCalledWith('/');
//   });
});