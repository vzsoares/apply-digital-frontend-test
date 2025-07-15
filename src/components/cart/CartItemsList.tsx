import CartItemCard from './CartItemCard';

interface Game {
  id: string;
  name: string;
  genre: string;
  price: number;
  image: string;
  description: string;
  isNew: boolean;
}

interface CartItem {
  game: Game;
}

interface CartItemsListProps {
  cartItems: CartItem[];
  onRemoveItem: (gameId: string) => void;
}

export default function CartItemsList({ cartItems, onRemoveItem }: CartItemsListProps) {
  return (
    <div className="space-y-4 flex-3 flex flex-col">
      {cartItems.map((item, i, arr) => (
        <>
          <CartItemCard 
            key={item.game.id} 
            item={item} 
            onRemove={onRemoveItem} 
          />
          {i !== arr.length - 1 && (
            <hr className="border-gray-300" />
          )}
        </>
      ))}
    </div>
  );
}