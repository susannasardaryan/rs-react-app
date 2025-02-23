import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';


vi.mock('../components/CardList', () => ({
  default: () => <div>CardList</div>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/details/1',
    }),
  };
});

describe('MainPage', () => {
  it('renders CardList and Outlet when on details page', () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/" element={<MainPage searchTermValue="" onDataLoaded={vi.fn()} />}>
            <Route path="details/:id" element={<div>Details</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('CardList')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });


//     vi.mock('react-router-dom', async () => {
//       const actual = await vi.importActual('react-router-dom');
//       return {
//         ...actual,
//         useLocation: () => ({
//           pathname: '/',
//         }),
//       };
//     });

//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <Routes>
//           <Route path="/" element={<MainPage searchTermValue="" onDataLoaded={vi.fn()} />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     expect(screen.getByText('CardList')).toBeInTheDocument();
//     expect(screen.queryByText('Details')).not.toBeInTheDocument();
//   });
});