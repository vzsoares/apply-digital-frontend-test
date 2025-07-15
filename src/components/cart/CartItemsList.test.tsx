import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartItemsList from './CartItemsList';

// Mock the CartItemCard component
jest.mock('./CartItemCard', () => {
    return function MockCartItemCard({ item, onRemove }: any) {
        return (
            <div data-testid={`cart-item-${item.game.id}`}>
                <span>{item.game.name}</span>
                <button onClick={() => onRemove(item.game.id)}>Remove</button>
            </div>
        );
    };
});

describe('CartItemsList', () => {
    const mockOnRemoveItem = jest.fn();

    const mockCartItems = [
        {
            game: {
                id: '1',
                name: 'Game 1',
                genre: 'Action',
                price: 29.99,
                image: '/image1.jpg',
                description: 'Description 1',
                isNew: true,
            },
        },
        {
            game: {
                id: '2',
                name: 'Game 2',
                genre: 'Adventure',
                price: 39.99,
                image: '/image2.jpg',
                description: 'Description 2',
                isNew: false,
            },
        },
    ];

    beforeEach(() => {
        mockOnRemoveItem.mockClear();
    });

    it('renders cart items correctly', () => {
        render(
            <CartItemsList cartItems={mockCartItems} onRemoveItem={mockOnRemoveItem} />
        );

        expect(screen.getByText('Game 1')).toBeInTheDocument();
        expect(screen.getByText('Game 2')).toBeInTheDocument();
    });

    it('renders separator between items but not after last item', () => {
        render(
            <CartItemsList cartItems={mockCartItems} onRemoveItem={mockOnRemoveItem} />
        );

        const separators = screen.getAllByRole('separator');
        expect(separators).toHaveLength(1); // Only one separator between 2 items
    });

    it('renders empty list when no items', () => {
        render(
            <CartItemsList cartItems={[]} onRemoveItem={mockOnRemoveItem} />
        );

        expect(screen.queryByText('Game 1')).not.toBeInTheDocument();
        expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    });
});
