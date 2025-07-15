'use client';
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useCartService } from "@/hooks/cart-service";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
    const { cartItems, removeFromCart, subtotal, total, itemCount } = useCartService();

    if (cartItems.length === 0) {
        return (
            <main className='box min-h-screen'>
                <Navbar />
                <section className="box flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                        <p className="text-gray-600">Add some games to get started!</p>
                    </div>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main className='box min-h-screen'>
            {/* navbar section */}
            <Navbar />
            <section className="box">
                <Link href="/" className="section-container py-6 flex-row gap-2 cursor-pointer">
                    <Image src="/icons/arrow-left-icon.svg" width={24} height={24} alt="cart icon" />
                    <h3 className="text-[#3B3B3B] font-medium">Back to Catalog</h3>
                </Link>
            </section>
            {/* Summary section */}
            <section className="box">
                <div className="section-container py-12">
                    <div className="">
                        <h1 className="text-3xl font-bold mb-3 text-[#3B3B3B] text-4xl">Your Cart</h1>
                        <p className="text-[#3B3B3B] text-2xl">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
                    </div>
                </div>
            </section>
            {/* Main section */}
            <section className="box pb-12 flex-1">
                {/* Product summary section */}
                <div className="section-container flex-column justify-between gap-12 md:flex-row">
                    <div className="space-y-4 flex-3 flex flex-col">
                        {cartItems.map((item, i, arr) => (
                            <>
                                <div key={item.game.id} className="bg-white p-4">
                                    <div className="flex gap-6 flex-col md:flex-row">
                                        <div className="flex gap-3">
                                            <Image
                                                src={item.game.image}
                                                alt={item.game.name}
                                                width={260}
                                                height={0}
                                                className="object-cover w-full h-[136px] md:w-[256px] md:h-[156px] flex"
                                            />
                                            <button
                                                onClick={() => removeFromCart(item.game.id)}
                                                className="p-1 flex self-start  md:hidden"
                                                aria-label="Remove item"
                                            >
                                                <Image src="/icons/x-close-icon.svg" width={24} height={24} alt="cart icon" />
                                            </button>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex justify-between items-start mb-2 mt-2">
                                                <div className="flex flex-col gap-3">
                                                    <p className="text-[#737373] uppercase font-bold">{item.game.genre}</p>
                                                    <h3 className="font-bold text-2xl">{item.game.name}</h3>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.game.id)}
                                                    className="p-1 hidden md:flex"
                                                    aria-label="Remove item"
                                                >
                                                    <Image src="/icons/x-close-icon.svg" width={24} height={24} alt="cart icon" />
                                                </button>
                                            </div>
                                            <p className="text-[#737373] mb-3">{item.game.description}</p>
                                            <div className="flex justify-between items-center mt-auto self-end">
                                                <div className="text-right">
                                                    <p className="font-semibold text-lg">
                                                        ${(item.game.price).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {i !== arr.length - 1 &&
                                    <hr className="border-gray-300" />}
                            </>
                        ))}
                    </div>

                    {/* Order summary section */}
                    <div className="sticky top-6 w-full md:w-[75%] h-fit">
                        <div className="rounded-lg flex flex-col boder border-[0.5px] border-[#8F8F8F]  px-4 py-6 ">
                            <h3 className="font-bold text-2xl mb-3 text-[#3B3B3B] mt-2">Order Summary</h3>
                            <p className="text-[#3B3B3B] text-[1.125rem]">{itemCount} items</p>

                            <div className="space-y-3 pt-12">
                                {cartItems.map((item) => (
                                    <div key={item.game.id} className="flex justify-between text-[#3B3B3B] text-[1.125rem]">
                                        <span className="">
                                            {item.game.name}
                                        </span>
                                        <span className="">
                                            ${(item.game.price).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>



                            <hr className="border-gray-300 my-8" />

                            <div className="flex justify-between text-2xl font-bold text-[#3B3B3B] pb-6">
                                <span>Order Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="mt-8 w-full h-[56px] bg-[#585660] text-[#FFFFFF] rounded" onClick={() => alert("Hello!!")}>Checkout</button>
                    </div>

                </div>
            </section>
            {/* Footer section */}
            <Footer />
        </main>
    )
}
