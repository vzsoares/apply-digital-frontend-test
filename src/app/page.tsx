import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SearchSection from "@/components/SearchSection";
import CardSection from "@/components/CardSection";

export default function Home() {

    return (
        <main className='box min-h-screen'>
            {/* navbar section */}
            <Navbar />
            {/* Search section */}
            <SearchSection />
            {/* Card section */}
            <CardSection />
            {/* Footer section */}
            <Footer />
        </main>
    )
}
