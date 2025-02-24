import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Details from '../components/Details';
import { useGetPersonDataQuery } from '../store/ApiSlice';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock('../store/ApiSlice', () => ({
  useGetPersonDataQuery: vi.fn(),
}));

describe('Details', () => {
  const mockData = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
  };

  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (initialEntry = '/details/1') => {
    return render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders "Invalid ID" when id is undefined', () => {
    // Mock useParams to return undefined id
    (useParams as Mock).mockReturnValue({ id: undefined });

    // Mock useGetPersonDataQuery to return undefined (since it should not be called)
    (useGetPersonDataQuery as Mock).mockReturnValue({});

    renderComponent('/details/undefined');

    expect(screen.getByText('Invalid ID')).toBeInTheDocument();
  });

  it('renders person details when data is available', async () => {
    (useParams as Mock).mockReturnValue({ id: '1' });

    // Mock useGetPersonDataQuery to return valid data
    (useGetPersonDataQuery as Mock).mockReturnValue({
      data: mockData,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockData.name}`)).toBeInTheDocument();
      expect(screen.getByText(`Height: ${mockData.height}`)).toBeInTheDocument();
      expect(screen.getByText(`Mass: ${mockData.mass}`)).toBeInTheDocument();
      expect(screen.getByText(`Birth Year: ${mockData.birth_year}`)).toBeInTheDocument();
    });
  });

  it('renders the image with the correct URL', async () => {
    (useParams as Mock).mockReturnValue({ id: '1' });
    (useGetPersonDataQuery as Mock).mockReturnValue({
      data: mockData,
    });

    renderComponent();

    await waitFor(() => {
      const img = screen.getByRole('img') as HTMLImageElement;
      expect(img.src).toBe('https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/1.jpg');
    });
  });

  it('navigates to the home page when the Close button is clicked', async () => {
    (useParams as Mock).mockReturnValue({ id: '1' });

    (useGetPersonDataQuery as Mock).mockReturnValue({
      data: mockData,
    });

    renderComponent();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('renders nothing when data is undefined', async () => {
    (useParams as Mock).mockReturnValue({ id: '1' });

    (useGetPersonDataQuery as Mock).mockReturnValue({
      data: undefined,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText(`Name: ${mockData.name}`)).not.toBeInTheDocument();
    });
  });
});