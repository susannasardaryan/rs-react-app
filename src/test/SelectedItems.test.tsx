import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import SelectedItems from '../components/SelectedItems';
import appReducer from '../store/appSlice';
import { RootState } from '../store/store';
import { peopleDataApi } from '../store/ApiSlice';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ name: 'Luke Skywalker', birth_year: '19BBY' }),
  })
) as Mock;


global.URL.createObjectURL = vi.fn(() => 'mock-url');
global.URL.revokeObjectURL = vi.fn();

describe('SelectedItems', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const createMockStore = (initialState: Partial<RootState> = {
    app: { pageNumber: 1, isLoading: false, selectedItems: [] },
  }) => {
    return configureStore({
        reducer: {
            [peopleDataApi.reducerPath]: peopleDataApi.reducer,
            app: appReducer,
        },
      preloadedState: initialState as RootState,
    });
  };

  const renderComponent = (store: ReturnType<typeof configureStore>) => {
    return render(
      <MemoryRouter>
        <Provider store={store}>
          <SelectedItems />
        </Provider>
      </MemoryRouter>
    );
  };

  it('renders nothing when no items are selected', () => {
    const store = createMockStore();
    renderComponent(store);
    expect(screen.queryByText(/Unselect/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Download/i)).not.toBeInTheDocument();
  });

  it('displays buttons when items are selected', () => {
    const store = createMockStore({ app: { pageNumber: 1, isLoading: false,selectedItems: ['1','2'] } });

    renderComponent(store);
    expect(screen.getByText(/Unselect 2 items/i)).toBeInTheDocument();
    expect(screen.getByText(/Download 2 items/i)).toBeInTheDocument();
  });

  it('dispatches unselectAllItems when "Unselect" button is clicked', () => {
    const store = createMockStore({ app: { pageNumber: 1, isLoading: false,selectedItems: ['1'] } });

    renderComponent(store);
    const button = screen.getByText(/Unselect 1 items/i);
    fireEvent.click(button);

    expect(store.getState().app.selectedItems).toEqual([]);
  });

  it('fetches person data when selectedItems change', async () => {
    const store = createMockStore({ app: { pageNumber: 1, isLoading: false,selectedItems: ['1'] } });

    renderComponent(store);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/1');
    });

    expect(screen.getByText(/Download 1 items/i)).toBeInTheDocument();
  });

  it('triggers CSV download correctly', async () => {
    const store = createMockStore({ app: {pageNumber: 1, isLoading: false, selectedItems: ['1'] } });

    renderComponent(store);
    const downloadButton = screen.getByText(/Download 1 items/i);
    fireEvent.click(downloadButton);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalled();
  });
});
