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

interface OrderSummaryProps {
  cartItems: CartItem[];
  itemCount: number;
  total: number;
  onCheckout: () => void;
}

export default function OrderSummary({ cartItems, itemCount, total, onCheckout }: OrderSummaryProps) {
  return (
    <div className="sticky top-6 h-fit">
      <div className="rounded-lg flex flex-col boder border-[0.5px] border-gray-border px-4 py-6">
        <h3 className="font-bold text-2xl mb-3 text-gray-medium mt-2">Order Summary</h3>
        <p className="text-gray-medium text-[1.125rem]">{itemCount} items</p>

        <div className="space-y-3 pt-12">
          {cartItems.map((item) => (
            <div key={item.game.id} className="flex justify-between text-gray-medium text-[1.125rem]">
              <span className="">
                {item.game.name}
              </span>
              <span className="">
                ${item.game.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <hr className="border-gray-300 my-8" />

        <div className="flex justify-between text-2xl font-bold text-gray-medium pb-6">
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button 
        className="mt-8 w-full h-[56px] bg-background text-white rounded" 
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
}