import Image from "next/image";

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

interface CartItemCardProps {
  item: CartItem;
  onRemove: (gameId: string) => void;
}

export default function CartItemCard({ item, onRemove }: CartItemCardProps) {
  return (
    <div className="bg-white p-4">
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex gap-3">
          <div className="relative w-full h-[136px] md:w-[256px] md:h-[156px]">
            <Image
              src={item.game.image}
              alt={item.game.name}
              width={260}
              height={0}
              className="object-cover w-full h-[136px] md:w-[256px] md:h-[156px] flex"
            />
            {item.game.isNew && (
              <div className="py-2 px-4 text-gray-medium bg-white absolute left-2 top-2 rounded-lg border">
                New
              </div>
            )}
          </div>

          <button
            onClick={() => onRemove(item.game.id)}
            className="p-1 flex self-start md:hidden"
            aria-label="Remove item"
          >
            <Image src="/icons/x-close-icon.svg" width={24} height={24} alt="remove" />
          </button>
        </div>
        
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2 mt-2">
            <div className="flex flex-col gap-3">
              <p className="text-gray-light uppercase font-bold">{item.game.genre}</p>
              <h3 className="font-bold text-2xl">{item.game.name}</h3>
            </div>
            <button
              onClick={() => onRemove(item.game.id)}
              className="p-1 hidden md:flex"
              aria-label="Remove item"
            >
              <Image src="/icons/x-close-icon.svg" width={24} height={24} alt="remove" />
            </button>
          </div>
          <p className="text-gray-light mb-3">{item.game.description}</p>
          <div className="flex justify-between items-center mt-auto self-end">
            <div className="text-right">
              <p className="font-semibold text-lg">
                ${item.game.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}