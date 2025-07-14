'use client';

import axios from "axios";
import Image from "next/image";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { GamesApiResponse } from "./api/games/route";

const fetcher = (url: string) => axios.get<GamesApiResponse>(url).then(res => res.data);

export default function CardSection() {

    const [page, setPage] = useState(1);
    const key = useMemo(() => {
        const url = new URL('http://localhost:3000/api/games')

        url.searchParams.set('page', page.toString())

        return url.toString()
    }, [page])
    const { data, isLoading } = useSWR(key, fetcher)

    console.log(data)

    return (
        <section className="box py-6 flex-1">
            <div className="section-container">
                <div className="grid grid-cols-[repeat(auto-fit,minmax(327px,380px))] gap-x-3 gap-y-3 md:gap-x-6 md:gap-y-6 justify-center justify-items-center min-h-[436px] w-full flex-1">
                    {

                        data && data.games.map((item, i) => (
                            <div key={i} className="w-full max-w-[450px] min-w-[296px] flex flex-col bg-transparent relative border-[0.5px] rounded-2xl min-h-[436px] p-6 relative">
                                <Image src="/images/apply-digital-logo.png" alt="apply-digital-logo" width={170} height={44} />
                                <p className="font-bold color-[#737373] mt-1.5 mb-3">GENRE</p>
                                <div className="flex justify-between mb-5">
                                    <p className="font-bold color-[#737373] mt-1.5 mb-3">Product name</p>
                                    <p className="font-bold color-[#737373] mt-1.5 mb-3">$119</p>
                                </div>
                                <button className="font-bold text-gray-medium border rounded-lg">ADD TO CART</button>
                            </div>
                        ))
                    }
                </div>
                <button className="mt-6 mr-auto bg-gray-300 p-3 rounded-md">See More</button>
            </div>
        </section>
    )
}

