import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Search from '../components/Search/Search';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});


const mockOnSearch = vi.fn();
const mockNavigate = vi.fn();

describe('Search Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        (useNavigate as Mock).mockReturnValue(mockNavigate);
    });

    const renderSearch = () => {
        return render(
            <MemoryRouter>
                <Search onSearch={mockOnSearch} />
            </MemoryRouter>
        );
    };

    it('renders with an initial value from localStorage', () => {
        localStorage.setItem('searchTerm', 'SavedSearch');
        renderSearch();
        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('SavedSearch');
    });

    it('updates the input value on change', () => {
        renderSearch();
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'New Query' } });

        expect(input).toHaveValue('New Query');
    });

    it('calls onSearch and navigates when the search button is clicked', () => {
        renderSearch();
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: /search/i });

        fireEvent.change(input, { target: { value: 'Test Search' } });
        fireEvent.click(button);

        expect(mockOnSearch).toHaveBeenCalledWith('Test Search');
        expect(mockNavigate).toHaveBeenCalledWith('?search=Test Search&page=1');
    });
});
