import {useQuery} from "@tanstack/react-query";
import {fetchData} from "api/api";

export interface storeListDataPros {
    id?: string;
    logo?: string;
    brand?: string;
    infoList?: {
        rating?: number;
        review?: number;
        distance?: string;
    }
    badge?: {
        text: string;
        color: string;
    }[],
    recent?: boolean;
    nearby?: boolean;
    imgVisual?: string;
    tel?: string;
    detailInfo?: {
        time?: string;
        location?: string;
        location2?: string;
        "businessHours"?: string;
    };
}

export interface EventListDataPros {
    id?: string;
    txt?: string;
    img?: string;
    link?: string;
}

export const useStoreData = () => {
    return useQuery<storeListDataPros[]>({
        queryKey: ['useStoreData'],
        queryFn: () => fetchData('store')
    });
}

export const useEventData = () => {
    return useQuery<EventListDataPros[]>({
        queryKey: ['useEventData'],
        queryFn: () => fetchData('event')
    });
}