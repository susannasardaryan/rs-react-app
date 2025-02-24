import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CardList from '../components/CardList/CardList';
import { peopleDataApi, useGetSearchedDataQuery } from '../store/ApiSlice';
import appReducer from '../store/appSlice';
import { RootState } from '../store/store';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import userEvent from '@testing-library/user-event';

vi.mock('../components/Loader/Loader', () => ({
    default: () => <div>Loading...</div>,
}));

vi.mock('../components/SelectedItems', () => ({
    default: () => <div>Selected Items</div>,
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(() => vi.fn()),
    };
});

vi.mock('../store/ApiSlice', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../store/ApiSlice')>();
    return {
        ...actual,
        useGetSearchedDataQuery: vi.fn(),
    };
});

describe('CardList', () => {
    const navigate = vi.fn();
    const mockPerson = {
        url: "https://swapi.dev/api/people/1/",
        name: 'Luke Skywalker',
        birth_year: "19BBY"
    };

    beforeEach(() => {
        navigate.mockClear();
        vi.mocked(useNavigate).mockReturnValue(navigate);
        localStorage.clear();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const createMockStore = (initialState: Partial<RootState> = {
        app: { pageNumber: 1, isLoading: false, selectedItems: [] },
        [peopleDataApi.reducerPath]: peopleDataApi.reducer(undefined, { type: '' })
    }) => {
        return configureStore({
            reducer: {
                [peopleDataApi.reducerPath]: peopleDataApi.reducer,
                app: appReducer,
            },
            preloadedState: initialState as RootState,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(peopleDataApi.middleware),
        });
    };

    const renderComponent = (
        store: ReturnType<typeof configureStore>,
        searchTermValue: string = 'test',
        onDataLoaded: (value: boolean) => void = vi.fn()
    ) => {
        return render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ApiProvider api={peopleDataApi}>
                                <Provider store={store}>
                                    <CardList searchTermValue={searchTermValue} onDataLoaded={onDataLoaded} />
                                </Provider>
                            </ApiProvider>
                        }
                    />
                    <Route path="/404" element={<div>Not Found</div>} />
                    <Route path="/details/:id" element={<div>Details Page</div>} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('should render Loader when data is fetching', () => {
        const store = createMockStore();
        (useGetSearchedDataQuery as Mock).mockReturnValue({
            data: undefined,
            isFetching: true,
            isLoading: true
        });

        renderComponent(store);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should navigate to 404 when no data is available', async () => {
        const store = createMockStore();
        (useGetSearchedDataQuery as Mock).mockReturnValue({
            data: undefined,
            isFetching: false,
            isLoading: false
        });

        renderComponent(store);

        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith('/404');
        });
    });

    it('should render cards when data is available', async () => {
        const mockData = {
            count: 2,
            results: [mockPerson, {...mockPerson, name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/'}]
        };

        const store = createMockStore();
        (useGetSearchedDataQuery as Mock).mockReturnValue({
            data: mockData,
            isFetching: false,
            isLoading: false
        });

        renderComponent(store);

        await waitFor(() => {
            expect(screen.getByText(mockPerson.name)).toBeInTheDocument();
            expect(screen.getByText('Darth Vader')).toBeInTheDocument();
        });
    });

    it('should call onDataLoaded when data is available', async () => {
        const mockData = {
            count: 1,
            results: [mockPerson]
        };

        const onDataLoaded = vi.fn();
        const store = createMockStore();

        (useGetSearchedDataQuery as Mock).mockReturnValue({
            data: mockData,
            error: undefined,
            isFetching: false,
            isLoading: false,
            isSuccess: true,
            status: 'fulfilled',
            refetch: vi.fn()
        });

        renderComponent(store, 'test', onDataLoaded);

        await waitFor(() => {
            expect(onDataLoaded).toHaveBeenCalledWith(true);
        });

        expect(onDataLoaded).toHaveBeenCalledTimes(1);
    });

    it('should navigate to details page on card click', async () => {
        const mockData = {
            count: 1,
            results: [mockPerson]
        };

        const store = createMockStore();
        (useGetSearchedDataQuery as Mock).mockReturnValue({
            data: mockData,
            isFetching: false,
            isLoading: false
        });

        renderComponent(store);

        await waitFor(() => {
            userEvent.click(screen.getByText(mockPerson.name));
            expect(navigate).toHaveBeenCalledWith('/details/1/?page=1');
        });
    });

    it('should render SelectedItems when items are selected', async () => {
        const mockData = {
            count: 1,
            results: [mockPerson]
        };

        const store = createMockStore({
            app: { pageNumber: 1, isLoading: false, selectedItems: ['1'] }
        });

        (useGetSearchedDataQuery as Mock).mockReturnValue({
            data: mockData,
            isFetching: false,
            isLoading: false
        });

        renderComponent(store);

        await waitFor(() => {
            expect(screen.getByText('Selected Items')).toBeInTheDocument();
        });
    });

    it('should handle API error', async () => {
        const store = createMockStore();
        (useGetSearchedDataQuery as Mock).mockReturnValue({
            data: undefined,
            error: new Error('API Error'),
            isFetching: false,
            isLoading: false,
            isSuccess: false,
            status: 'rejected'
        });

        renderComponent(store);

        await waitFor(() => {
            expect(screen.queryByText(mockPerson.name)).not.toBeInTheDocument();
        });
    });

    it('should handle empty results array', async () => {
        const mockData = {
            count: 0,
            results: []
        };

        const store = createMockStore();
        (useGetSearchedDataQuery as Mock).mockReturnValue({
            data: mockData,
            isFetching: false,
            isLoading: false
        });

        renderComponent(store);

        await waitFor(() => {
            expect(screen.queryByText(mockPerson.name)).not.toBeInTheDocument();
        });
    });

    it('should handle empty search term', async () => {
        const store = createMockStore();
        (useGetSearchedDataQuery as Mock).mockReturnValue({
            data: undefined,
            isFetching: false,
            isLoading: false
        });

        renderComponent(store, '');

        await waitFor(() => {
            expect(screen.queryByText(mockPerson.name)).not.toBeInTheDocument();
        });
    });
});