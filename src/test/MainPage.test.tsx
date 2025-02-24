import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../components/MainPage/MainPage';

vi.mock('../components/CardList/CardList.tsx', () => ({
  default: ({ searchTermValue, onDataLoaded }: {
    searchTermValue: string,
    onDataLoaded: (value: boolean) => void
  }) => (
    <div>
      CardList - {searchTermValue}
      <button onClick={() => onDataLoaded(true)}>Load Data</button>
    </div>
  ),
}));

describe('MainPage', () => {
  const mockOnDataLoaded = vi.fn();


  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderMainPage = (initialPath = '/') => {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/" element={<MainPage searchTermValue="test" onDataLoaded={mockOnDataLoaded} />}>
              <Route path="details/:id" element={<div>Details Section</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
    );
  };

  it('should render CardList and not details section on home page', () => {
    renderMainPage();
    expect(screen.getByText(/CardList - test/)).toBeInTheDocument();
    expect(screen.queryByText('Details Section')).not.toBeInTheDocument();
  });

  it('should render both sections when on details page', () => {
    renderMainPage('/details/1');
    expect(screen.getByText(/CardList - test/)).toBeInTheDocument();
    expect(screen.getByText('Details Section')).toBeInTheDocument();
  });

  it('should trigger onDataLoaded callback', async () => {
    renderMainPage();
    const loadButton = screen.getByText('Load Data');
    loadButton.click();
    expect(mockOnDataLoaded).toHaveBeenCalledWith(true);
  });
});