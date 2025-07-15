'use client';

import { useCardService } from '@/services/card-service';

export default function SearchSection() {
    const { setGenreFilter, availableFilters, selectedGenre } = useCardService()

    return (
        <section className="box">
            <div className="section-container py-6 gap-6">
                <h2 className="font-bold text-4xl text-gray-medium">Top Sellers</h2>
                <div className="box flex-row justify-start items-center md:justify-end">
                    <p className="font-bold text-xl text-gray-medium">Genre</p>
                    <div className="px-3 text-gray-medium">|</div>
                    <select
                        className="rounded-md p-2 text-gray-medium bg-transparent min-w-[202px]"
                        name="card-filter-select"
                        value={selectedGenre}
                        onChange={(e) => setGenreFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        {availableFilters.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    );
}
