'use client';

import Image from "next/image";
import Link from "next/link";
import { useCartService } from "@/hooks/cart-service";

export default function Navbar() {
    const { itemCount } = useCartService();

    return (
        <section className="bg-gray-200 box">
            <div className="section-container py-4">
                <div className="flex justify-between">
                    <h3 className="text-background text-2xl font-bold">GamerShop</h3>
                    <Link href="/cart" className="relative">
                        <Image src="/icons/cart-icon.svg" width={24} height={24} alt="cart icon" style={{ cursor: 'pointer' }} />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {itemCount > 99 ? '99+' : itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </section>
    )
}
