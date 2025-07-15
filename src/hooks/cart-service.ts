import { atom, useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import type { Game } from '@/utils/endpoint';

export interface CartItem {
    game: Game;
    quantity: number;
}

export const cartItemsAtom = atom<CartItem[]>([]);

export const useCartService = () => {
    const [cartItems, setCartItems] = useAtom(cartItemsAtom);

    const addToCart = useCallback((game: Game, quantity: number = 1) => {
        setCartItems(items => {
            const existingItem = items.find(item => item.game.id === game.id);
            if (existingItem) {
                return items.map(item =>
                    item.game.id === game.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...items, { game, quantity }];
        });
    }, [setCartItems]);

    const removeFromCart = useCallback((gameId: string) => {
        setCartItems(items => items.filter(item => item.game.id !== gameId));
    }, [setCartItems]);

    const updateQuantity = useCallback((gameId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(gameId);
            return;
        }
        setCartItems(items =>
            items.map(item =>
                item.game.id === gameId ? { ...item, quantity } : item
            )
        );
    }, [setCartItems, removeFromCart]);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, [setCartItems]);

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.game.price * item.quantity), 0);
    }, [cartItems]);

    const tax = useMemo(() => {
        return subtotal * 0.1; // 10% tax
    }, [subtotal]);

    const total = useMemo(() => {
        return subtotal + tax;
    }, [subtotal, tax]);

    const itemCount = useMemo(() => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    }, [cartItems]);

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        total,
        itemCount
    };
};
