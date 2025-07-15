import axios from "axios";
import { useCallback, useMemo, useEffect } from "react";
import { atom, useAtom } from 'jotai';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWRInfinite from 'swr/infinite';
import _ from 'lodash';
import { GamesApiResponse } from "@/app/api/games/route";

export const selectedGenreAtom = atom<string>('all');
export const availableFiltersAtom = atom<string[]>([]);

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
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedGenre, setSelectedGenre] = useAtom(selectedGenreAtom);
    const [availableFilters, setAvailableFilters] = useAtom(availableFiltersAtom);

    const { data, isLoading, setSize, isValidating, size } = useSWRInfinite(
        getKey(selectedGenre),
        fetcher,
        { revalidateOnFocus: false, revalidateFirstPage: false }
    );

    // Update availableFilters atom when data changes
    useMemo(() => {
        if (data && data.length > 0) {
            const filters = data[0]?.availableFilters || [];
            setAvailableFilters(filters);
        }
    }, [data, setAvailableFilters]);

    const isLastPage = useMemo<boolean>(() => {
        if (!data || data.length === 0) return true;
        const lastPage = data[data.length - 1];
        return (lastPage?.games?.length === 0) || (!!lastPage?.totalPages && (size >= lastPage.totalPages));
    }, [data, size]);

    const loadMore = useCallback(() => setSize(v => v + 1), [setSize]);

    const setGenreFilter = useCallback((genre: string) => {
        setSelectedGenre(genre);

        // Update URL when genre changes
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (genre === 'all') {
            newSearchParams.delete('genre');
        } else {
            newSearchParams.set('genre', genre);
        }
        const newUrl = `${window.location.pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
        router.replace(newUrl);
    }, [setSelectedGenre, router, searchParams]);


    // Sync URL with genre filter on component mount
    useEffect(() => {
        const urlGenre = searchParams.get('genre') || 'all';
        if (urlGenre !== selectedGenre) {
            setSelectedGenre(urlGenre);
        }
    }, [searchParams, selectedGenre, setSelectedGenre]);


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
