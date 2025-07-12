import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default async function Home() {
    return (
        <main className='box min-h-screen'>
            {/* navbar section */}
            <Navbar />
            {/* Search section */}
            <section className="box">
                <div className="section-container py-6 gap-6">
                    <h2 className="font-bold text-4xl text-gray-medium">Top Sellers</h2>
                    <div className="box flex-row justify-end items-center">
                        <p className="font-bold text-xl text-gray-medium">Genre</p>
                        <div className="px-3 text-gray-medium">|</div>
                        <select className="rounded-md p-2 text-gray-medium bg-transparent min-w-[202px]" name="card-filter-select"><option value="all">All</option></select>
                    </div>
                </div>
            </section>
            {/* Card section */}
            <section className="box py-6 flex-1">
                <div className="section-container">
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(327px,380px))] gap-x-3 gap-y-3 md:gap-x-6 md:gap-y-6 justify-center justify-items-center min-h-[200px] w-full flex-1">
                        {

                            [1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
                                <div key={i} className="w-full max-w-[450px] min-w-[296px] flex flex-col bg-transparent relative">test</div>
                            ))
                        }
                    </div>
                    <button className="mt-6 mr-auto bg-gray-300 p-3 rounded-md">See More</button>
                </div>
            </section>
            {/* Footer section */}
            <Footer />
        </main>
    )
}
