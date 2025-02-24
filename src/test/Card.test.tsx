import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Card from '../components/Card/Card';
import appReducer from '../store/appSlice';
import { RootState } from '../store/store';
import userEvent from '@testing-library/user-event';
import { peopleDataApi } from '../store/ApiSlice';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(() => vi.fn()),
    };
});

describe('Card Component', () => {
    const navigate = vi.fn();
    const mockPerson = {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
    };
    const mockImage = 'https://example.com/image.jpg';

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
    }) => {
        return configureStore({
          reducer: {
            [peopleDataApi.reducerPath]: peopleDataApi.reducer,
            app: appReducer,
        },
            preloadedState: initialState as RootState,
        });
    };

    const renderComponent = (
        store: ReturnType<typeof configureStore>,
        id: string = '1',
        onClick: () => void = vi.fn()
    ) => {
        return render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Provider store={store}>
                                <Card id={id} person={mockPerson} image={mockImage} onClick={onClick} />
                            </Provider>
                        }
                    />
                    <Route path="/details/:id" element={<div>Details Page</div>} />
                </Routes>
            </MemoryRouter>
        );
    };

    it('renders the card with correct data', () => {
        const store = createMockStore();
        renderComponent(store);

        expect(screen.getByText(mockPerson.name)).toBeInTheDocument();
        expect(screen.getByText(`Birth Year: ${mockPerson.birth_year}`)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockImage);
    });

    it('calls onClick when the card is clicked', async () => {
        const mockOnClick = vi.fn();
        const store = createMockStore();
        renderComponent(store, '1', mockOnClick);

        const cardElement = screen.getByRole('button');
        await userEvent.click(cardElement);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('toggles checkbox and updates Redux store', async () => {
        const store = createMockStore();
        renderComponent(store);

        const checkbox = screen.getByRole('checkbox');

        await userEvent.click(checkbox);
        expect(store.getState().app.selectedItems).toContain('1');

        await userEvent.click(checkbox);
        expect(store.getState().app.selectedItems).not.toContain('1');
    });

    it('initializes checkbox state based on Redux store', () => {
        const store = createMockStore({ app: { pageNumber: 1, isLoading: false, selectedItems: ['1'] } });
        renderComponent(store);

        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('does not call onClick when checkbox is clicked', async () => {
        const mockOnClick = vi.fn();
        const store = createMockStore();
        renderComponent(store, '1', mockOnClick);

        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);

        expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('matches snapshot', () => {
        const store = createMockStore();
        const { container } = renderComponent(store);
        expect(container).toMatchSnapshot();
    });
});