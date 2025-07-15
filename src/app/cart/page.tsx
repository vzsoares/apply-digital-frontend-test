'use client';
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useCartService } from "@/hooks/cart-service";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, subtotal, tax, total, itemCount } = useCartService();

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
                <div className="section-container py-6 gap-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
                        <p className="text-gray-600">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
                    </div>
                </div>
            </section>
            {/* Main section */}
            <section className="box py-6 flex-1">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Product summary section */}
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.game.id} className="bg-white rounded-lg border p-4 shadow-sm">
                                        <div className="flex gap-4">
                                            <div className="relative w-24 h-24 flex-shrink-0">
                                                <Image
                                                    src={item.game.image}
                                                    alt={item.game.name}
                                                    fill
                                                    className="object-cover rounded-md"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{item.game.name}</h3>
                                                        <p className="text-sm text-gray-600">{item.game.genre}</p>
                                                        {item.game.isNew && (
                                                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.game.id)}
                                                        className="text-red-500 hover:text-red-700 p-1"
                                                        aria-label="Remove item"
                                                    >
                                                        {/* <Trash2 size={18} /> */}
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-3">{item.game.description}</p>
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => updateQuantity(item.game.id, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            {/* <Minus size={14} /> */}
                                                        </button>
                                                        <span className="font-medium min-w-[2rem] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.game.id, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                        >
                                                            {/* <Plus size={14} /> */}
                                                        </button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-lg">
                                                            ${(item.game.price * item.quantity).toFixed(2)}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            ${item.game.price.toFixed(2)} each
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order summary section */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                                <h3 className="font-semibold text-xl mb-4">Order Summary</h3>
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <hr className="border-gray-300" />
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    Proceed to Checkout
                                </button>
                                <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer section */}
            <Footer />
        </main>
    )
}
