import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <section className="bg-gray-200 box">
            <div className="section-container py-4">
                <div className="flex justify-between">
                    <h3 className="text-background text-2xl font-bold">GamerShop</h3>
                    <Link href="/cart" className="">
                        <Image src="/icons/cart-icon.svg" width={24} height={24} alt="cart icon" style={{ cursor: 'pointer' }} />
                    </Link>
                </div>
            </div>
        </section>

    )
}

