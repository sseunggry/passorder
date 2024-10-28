import {InputOptionsTypeProps, OptionsInfoTypeProps} from "./optionSelect";

const initialState = {
    url: '',
    name: '',
    thumbImg: '',
    price: 0,
    count: 0,
    optionList: [] as OptionsInfoTypeProps[],
    totalPrice: 0,
};

export const PRODUCT_SELECT = 'productSelect/PRODUCT_SELECT' as const;

interface ActionTypeProps {
    type: typeof PRODUCT_SELECT;
    url: string;
    name: string,
    thumbImg: string;
    price: number;
    count: number;
    optionList: OptionsInfoTypeProps[];
    totalPrice: number;
}

const productSelectReducer = (state = initialState, action: ActionTypeProps) => {
    // console.log("디스패치", state);
    // console.log("action", action);
    
    switch (action.type) {
        case PRODUCT_SELECT:
            return {
                ...state,
                url: action.url,
                name: action.name,
                thumbImg: action.thumbImg,
                price: action.price,
                totalPrice: action.totalPrice,
                count: action.count,
                optionList: action.optionList
            }
        default:
            return state;
    }
};

export default productSelectReducer;


export const selectorProductInfo = (state: {
    productSelect: {
        url: string,
        name: string,
        thumbImg: string,
        price: number,
        totalPrice: number,
        count: number,
        optionList: InputOptionsTypeProps[]
    }
}) => state.productSelect;