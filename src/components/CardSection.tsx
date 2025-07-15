'use client';

import Image from "next/image";
import { useCardService } from "@/hooks/card-service";
import { useCartService } from "@/hooks/cart-service";

export default function CardSection() {
    const { data, isLoading, isValidating, isLastPage, loadMore } = useCardService();
    const { addToCart, removeFromCart, cartItems } = useCartService();


    return (
        <section className="box py-6 flex-1">
            <div className="section-container">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(327px,380px))] gap-x-3 gap-y-3 md:gap-x-6 md:gap-y-6 justify-center justify-items-center min-h-[436px] w-full flex-1">
                    {isLoading && <div className="w-full h-full flex justify-center items-center">Loading...</div>}
                    {

                        data && data.map(v => v.games.map((item, i) => {
                            const isInCart = cartItems.some(cartItem => cartItem.game.id === item.id);
                            return (
                                <div key={i} className="w-full max-w-[450px] min-w-[296px] flex flex-col bg-transparent relative border-[0.5px] rounded-2xl min-h-[436px] p-6 relative border-[#8F8F8F]">
                                    <div className="relative w-full h-60">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={380}
                                            height={0}
                                            className="w-full h-60 object-cover rounded-t-lg"
                                        />
                                        {item.isNew && <div className="py-2 px-4 text-[#3B3B3B] bg-white absolute left-2 top-2 rounded-lg border">New</div>}
                                    </div>
                                    <p className="font-bold text-[#737373] mt-5 mb-3 uppercase">{item.genre}</p>
                                    <div className="flex justify-between mb-5">
                                        <p className="font-bold text-[#3B3B3B] mt-1.5 mb-3">{item.name}</p>
                                        <p className="font-bold text-[#3B3B3B] mt-1.5 mb-3">${item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => isInCart ? removeFromCart(item.id) : addToCart(item)}
                                        className={`font-bold border rounded-lg h-[56px] transition-colors mt-auto ${isInCart
                                            ? 'text-white bg-[#585660] border-[#585660] hover:bg-[#464450]'
                                            : 'text-gray-medium border-[#3B3B3B] hover:bg-gray-100'
                                            }`}
                                    >
                                        {isInCart ? 'REMOVE FROM CART' : 'ADD TO CART'}
                                    </button>
                                </div>
                            )
                        }))
                    }
                </div>
                {isValidating && !isLoading && <div className="text-center mt-4">Loading more...</div>}
                {!isLastPage && <button
                    className="mt-6 mr-auto text-[#FFFFFF] bg-[#585660] p-3 rounded-md font-bold"
                    onClick={loadMore}
                    disabled={isValidating || isLoading}
                >
                    SEE MORE
                </button>}
            </div>
        </section>
    )
}

