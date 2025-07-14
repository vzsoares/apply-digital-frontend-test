import axios from "axios";
import { useMemo } from "react";
import useSWRInfinite from 'swr/infinite';
import _ from 'lodash';
import { GamesApiResponse } from "@/app/api/games/route";

const fetcher = (url: string) => axios.get<GamesApiResponse>(url).then(res => res.data);

const getKey = (pageIndex: number, previousPageData: GamesApiResponse) => {
    if (previousPageData && !previousPageData?.games?.length) return null;
    if (_.isNumber(previousPageData?.totalPages) && (pageIndex >= previousPageData?.totalPages)) return null;

    const url = new URL('http://localhost:3000/api/games');
    url.searchParams.set('page', (pageIndex + 1).toString());

    return url.toString();
};

export const useCardService = () => {
    const { data, isLoading, setSize, isValidating, size } = useSWRInfinite(
        getKey,
        fetcher,
        { revalidateOnFocus: false }
    );

    const isLastPage = useMemo<boolean>(() => {
        if (!data || data.length === 0) return true;
        const lastPage = data[data.length - 1];
        return (lastPage?.games?.length === 0) || (!!lastPage?.totalPages && (size >= lastPage.totalPages));
    }, [data, size]);

    const loadMore = () => setSize(v => v + 1);

    return {
        data,
        isLoading,
        isValidating,
        isLastPage,
        loadMore
    };
};
