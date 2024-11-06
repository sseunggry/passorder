import {useQuery} from "@tanstack/react-query";
import {fetchData} from "api/api";

export interface ProductOptionList {
    id: string;
    tit: string;
    required?: boolean;
    radioList?: {
        option: string;
        price: number;
    }[];
    checkList?: {
        option: string;
        price: number;
    }[];
}

export interface storeProductList {
    categoryId: string;
    category: string;
    list: {
        productId: string;
        name: string;
        desc?: string;
        price: number;
        remainCount?: number;
        thumbImg?: string;
        visualImg?: string;
        optionList?: ProductOptionList[];
    }[];
}

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
        delivery?: string;
        location?: string;
        location2?: string;
        time?: string;
    };
    productList?: storeProductList[];
}

export interface EventListDataPros {
    id?: string;
    txt?: string;
    period?: string;
    img?: string;
    link?: string;
    detailImg?: string;
}

// export const useStoreListData = (id = '') => {
//     const name = id ? `store/${id}` : 'store';
//
//     return useQuery<storeListDataPros[] | storeListDataPros>({
//         queryKey: ['useStoreListData'],
//         queryFn: () => fetchData(name)
//     });
// }
export const useStoreListData = () => {
    return useQuery<storeListDataPros[]>({
        queryKey: ['useStoreListData'],
        queryFn: () => fetchData('store')
    });
}

export const useEventListData = () => {
    return useQuery<EventListDataPros[]>({
        queryKey: ['useEventListData'],
        queryFn: () => fetchData('event')
    });
}

export const useStoreData = (id: string) => {
    return useQuery<storeListDataPros>({
        queryKey: ['useStoreData', id],
        queryFn: () => fetchData(`store/${id}`)
    });
}
export const useEventData = (id: string) => {
    return useQuery<EventListDataPros>({
        queryKey: ['useEventData', id],
        queryFn: () => fetchData(`event/${id}`)
    });
}