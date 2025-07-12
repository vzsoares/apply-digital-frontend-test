import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default async function Cart() {
    return (
        <main className='box min-h-screen'>
            {/* navbar section */}
            <Navbar />
            {/* Summary section */}
            <section className="box">
                <div className="section-container py-6 gap-6">
                </div>
            </section>
            {/* Main section */}
            <section className="box py-6 flex-1">
                <div className="section-container">
                    {/* Product summary section */}
                    <div></div>
                    {/* Order summary section */}
                    <div></div>
                </div>
            </section>
            {/* Footer section */}
            <Footer />
        </main>
    )
}
