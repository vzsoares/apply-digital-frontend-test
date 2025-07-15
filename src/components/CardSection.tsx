'use client';

    // Pass filter data to parent component
    React.useEffect(() => {
        if (onFilterDataReady && availableFilters.length > 0) {
            onFilterDataReady({ availableFilters, selectedGenre, setGenreFilter });
        }
    }, [availableFilters, selectedGenre, setGenreFilter, onFilterDataReady]);
import Image from "next/image";
import { useCardService } from "@/hooks/card-service";

interface CardSectionProps {
    onFilterDataReady?: (filterData: {
        availableFilters: string[];
        selectedGenre: string;
        setGenreFilter: (genre: string) => void;
    }) => void;
}

export default function CardSection({ onFilterDataReady }: CardSectionProps) {
    const { data, isLoading, isValidating, isLastPage, loadMore, availableFilters, selectedGenre, setGenreFilter } = useCardService();


    return (
        <section className="box py-6 flex-1">
            <div className="section-container">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(327px,380px))] gap-x-3 gap-y-3 md:gap-x-6 md:gap-y-6 justify-center justify-items-center min-h-[436px] w-full flex-1">
                    {isLoading && <div className="w-full h-full flex justify-center items-center">Loading...</div>}
                    {

                        data && data.map(v => v.games.map((item, i) => (
                            <div key={i} className="w-full max-w-[450px] min-w-[296px] flex flex-col bg-transparent relative border-[0.5px] rounded-2xl min-h-[436px] p-6 relative border-[#8F8F8F]">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={380}
                                    height={240}
                                    className="w-full h-60 object-cover rounded-t-lg"
                                />
                                <p className="font-bold text-[#737373] mt-5 mb-3">GENRE</p>
                                <div className="flex justify-between mb-5">
                                    <p className="font-bold text-[#3B3B3B] mt-1.5 mb-3">Product name</p>
                                    <p className="font-bold text-[#3B3B3B] mt-1.5 mb-3">$119</p>
                                </div>
                                <button className="font-bold text-gray-medium border rounded-lg h-[56px] border-[#3B3B3B]">ADD TO CART</button>
                            </div>
                        )))
                    }
                </div>
                {isValidating && !isLoading && <div className="text-center mt-4">Loading more...</div>}
                {!isLastPage && <button
                    className="mt-6 mr-auto text-[#FFFFFF] bg-[#585660] p-3 rounded-md font-bold"
                    onClick={loadMore}
                    disabled={isValidating || isLoading}
                >
                    SEE MORE
                </button>}
            </div>
        </section>
    )
}

