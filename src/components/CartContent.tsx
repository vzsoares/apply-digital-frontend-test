'use client';
import { useCartService } from "@/services/cart-service";
import EmptyCartSection from "./cart/EmptyCartSection";
import CartNavigationSection from "./cart/CartNavigationSection";
import CartHeaderSection from "./cart/CartHeaderSection";
import CartItemsList from "./cart/CartItemsList";
import OrderSummary from "./cart/OrderSummary";

export default function CartContent() {
    const { cartItems, removeFromCart, subtotal, total, itemCount } = useCartService();

    if (cartItems.length === 0) {
        return <EmptyCartSection />;
    }

    const handleCheckout = () => {
        alert("Hello!!");
    };

    return (
        <>
            <CartNavigationSection />
            <CartHeaderSection itemCount={itemCount} />
            <section className="box pb-12 flex-1">
                <div className="section-container flex-column justify-between gap-12 md:flex-row">
                    <CartItemsList
                        cartItems={cartItems}
                        onRemoveItem={removeFromCart}
                    />
                    <OrderSummary
                        cartItems={cartItems}
                        itemCount={itemCount}
                        total={total}
                        onCheckout={handleCheckout}
                    />
                </div>
            </section>
        </>
    );
}
