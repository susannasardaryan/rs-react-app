/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardList from '../components/CardList/CardList';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams('page=1')],
  };
});

vi.mock('../Components/Card', () => ({
  default: ({ person }: { person: any }) => (
    <div data-testid="card">{person.name}</div>
  ),
}));

vi.mock('.../Components/Loader', () => ({
  default: () => <div>Loading...</div>,
}));


global.fetch = vi.fn();

describe('CardList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the correct number of cards when data is loaded', async () => {
    const mockResults = [
      { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
      { name: 'Leia Organa', url: 'https://swapi.dev/api/people/2/' },
    ];

    (global.fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve({ results: mockResults }),
    });

    const mockOnDataLoaded = vi.fn();

    render(
      <MemoryRouter>
        <CardList searchTermValue="" onDataLoaded={mockOnDataLoaded} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const cards = await screen.findAllByTestId('card');
    expect(cards).toHaveLength(2);
    expect(mockOnDataLoaded).toHaveBeenCalledWith(true);
  });

  it('navigates to 404 page when no results are found', async () => {
    (global.fetch as Mock).mockResolvedValue({
      json: () => Promise.resolve({ results: [] }),
    });

    render(
      <MemoryRouter>
        <CardList searchTermValue="invalid" onDataLoaded={vi.fn()} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/404');
    });
  });
});