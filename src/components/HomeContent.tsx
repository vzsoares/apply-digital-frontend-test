import SearchSection from '@/components/SearchSection';
import CardSection from '@/components/CardSection';
import { Suspense } from 'react';

export default function HomeContent() {
    return (
        <Suspense fallback={<div className="w-full h-full flex justify-center items-center flex-1">Loading...</div>}>
            {/* Search section */}
            <SearchSection />
            {/* Card section */}
            <CardSection />
        </Suspense>
    );
}
