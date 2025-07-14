'use client';

import axios from "axios";
import Image from "next/image";
import { useMemo } from "react";
import useSWRInfinite from 'swr/infinite'
import { GamesApiResponse } from "./api/games/route";
import _ from 'lodash';

const fetcher = (url: string) => axios.get<GamesApiResponse>(url).then(res => res.data);
const getKey = (pageIndex: number, previousPageData: GamesApiResponse) => {
    if (previousPageData && !previousPageData?.games?.length) return null
    if (_.isNumber(previousPageData?.totalPages) && (pageIndex >= previousPageData?.totalPages)) return null

    const url = new URL('http://localhost:3000/api/games')

    url.searchParams.set('page', pageIndex.toString())

    return url.toString()
}

export default function CardSection() {
    const { data, isLoading, setSize, isValidating, size } = useSWRInfinite(getKey, fetcher, { revalidateOnFocus: false })

    const isLastPage = useMemo<boolean>(() => {
        if (!data || data.length === 0) return true;
        const lastPage = data[data.length - 1];
        return (lastPage?.games?.length === 0) || (!!lastPage?.totalPages && (size >= lastPage.totalPages));
    }, [data, size]);


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
                    onClick={() => setSize(v => v + 1)}
                    disabled={isValidating || isLoading}
                >
                    SEE MORE
                </button>}
            </div>
        </section>
    )
}

