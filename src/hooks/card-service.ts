import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import useSWRInfinite from 'swr/infinite';
import _ from 'lodash';
import { GamesApiResponse } from "@/app/api/games/route";

const fetcher = (url: string) => axios.get<GamesApiResponse>(url).then(res => res.data);

const getKey = (genre?: string) => (pageIndex: number, previousPageData: GamesApiResponse) => {
    if (previousPageData && !previousPageData?.games?.length) return null;
    if (_.isNumber(previousPageData?.totalPages) && (pageIndex >= previousPageData?.totalPages)) return null;

    const url = new URL('http://localhost:3000/api/games');
    url.searchParams.set('page', (pageIndex + 1).toString());
    if (genre && genre !== 'all') {
        url.searchParams.set('genre', genre);
    }

    return url.toString();
};

export const useCardService = () => {
    const [selectedGenre, setSelectedGenre] = useState<string>('all');

    const { data, isLoading, setSize, isValidating, size, mutate } = useSWRInfinite(
        getKey(selectedGenre),
        fetcher,
        { revalidateOnFocus: false }
    );

    const availableFilters = useMemo(() => {
        if (!data || data.length === 0) return [];
        return data[0]?.availableFilters || [];
    }, [data]);

    const isLastPage = useMemo<boolean>(() => {
        if (!data || data.length === 0) return true;
        const lastPage = data[data.length - 1];
        return (lastPage?.games?.length === 0) || (!!lastPage?.totalPages && (size >= lastPage.totalPages));
    }, [data, size]);

    const loadMore = useCallback(() => setSize(v => v + 1), [setSize]);

    const setGenreFilter = useCallback((genre: string) => {
        setSelectedGenre(genre);
        mutate(undefined, false); // Clear cache
        setSize(1); // Reset to first page when filter changes
    }, [setSelectedGenre, setSize, mutate]);

    return {
        data,
        isLoading,
        isValidating,
        isLastPage,
        loadMore,
        availableFilters,
        selectedGenre,
        setGenreFilter
    };
};
