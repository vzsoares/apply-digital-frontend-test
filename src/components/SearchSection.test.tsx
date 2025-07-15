import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchSection from './SearchSection';

// Mock the hook with minimal setup
const mockSetGenreFilter = jest.fn();
jest.mock('../hooks/card-service', () => ({
    useCardService: () => ({
        setGenreFilter: mockSetGenreFilter,
        availableFilters: ['Action', 'Adventure', 'RPG'],
        selectedGenre: 'all',
    }),
}));

describe('SearchSection', () => {
    beforeEach(() => {
        mockSetGenreFilter.mockClear();
    });

    it('renders title and select dropdown', () => {
        render(<SearchSection />);

        expect(screen.getByText('Top Sellers')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('calls setGenreFilter when selection changes', () => {
        render(<SearchSection />);

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'Action' } });

        expect(mockSetGenreFilter).toHaveBeenCalledWith('Action');
    });
});
