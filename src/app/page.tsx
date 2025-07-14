import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import CardSection from "./CardSection";

export default async function Home() {
    return (
        <main className='box min-h-screen'>
            {/* navbar section */}
            <Navbar />
            {/* Search section */}
            <section className="box">
                <div className="section-container py-6 gap-6">
                    <h2 className="font-bold text-4xl text-gray-medium">Top Sellers</h2>
                    <div className="box flex-row justify-start items-center md:justify-end">
                        <p className="font-bold text-xl text-gray-medium">Genre</p>
                        <div className="px-3 text-gray-medium">|</div>
                        <select className="rounded-md p-2 text-gray-medium bg-transparent min-w-[202px]" name="card-filter-select"><option value="all">All</option></select>
                    </div>
                </div>
            </section>
            {/* Card section */}
            <CardSection />
            {/* Footer section */}
            <Footer />
        </main>
    )
}
