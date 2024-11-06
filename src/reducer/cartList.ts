import {InputOptionsTypeProps} from "reducer/optionSelect";
import {AppDispatch, RootState} from "reducer/index";
import {UPDATE_COUNTER} from "reducer/counter";
import {calcOptionsPrice} from "hooks/common";

//types
export interface ProductType {
    id: string;
    url: string;
    name: string;
    img: string;
    count: number;
    options: InputOptionsTypeProps[];
    optionPrice: number;
    price: number;
    totalPrice: number;
}

interface CartStateType {
    cartItems: ProductType[];
    storeUrl: string;
    storeName: string;
}

//action type
export const ADD_TO_CART = 'cartList/ADD_TO_CART';
export const REMOVE_FROM_CART = 'cartList/REMOVE_FROM_CART';
export const UPDATE_TO_COUNT = 'cartList/UPDATE_TO_COUNT';
export const UPDATE_TO_OPTIONS = 'cartList/UPDATE_TO_OPTIONS';

interface AddCartAction {
    type: typeof ADD_TO_CART;
    payload: {
        cartItems: ProductType;
        storeUrl: string;
        storeName: string;
    };
}

interface RemoveCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: string;
}

interface UpdateCartCountAction {
    type: typeof UPDATE_TO_COUNT;
    payload: {
        id: string;
        count: number;
    }
}

interface UpdateCartOptionAction {
    type: typeof UPDATE_TO_OPTIONS;
    payload: {
        id: string;
        options: InputOptionsTypeProps[];
    }
}

export type CartActionTypes = AddCartAction | RemoveCartAction | UpdateCartCountAction | UpdateCartOptionAction;

export const removeFromCart = (id: string): RemoveCartAction => ({
    type: REMOVE_FROM_CART,
    payload: id
});

export const updateCartOptions = (id: string, options: InputOptionsTypeProps[]): UpdateCartOptionAction => ({
    type: UPDATE_TO_OPTIONS,
    payload: { id, options }
});

//초기값
const initialState: CartStateType = {
    cartItems: [],
    storeUrl: '',
    storeName: ''
}

const cartReducer = (state = initialState, action: CartActionTypes): CartStateType => {
    // console.log("디스패치", state);
    // console.log("action", action);
    
    switch (action.type) {
        case ADD_TO_CART: {
            const { cartItems: newCartItem, storeUrl, storeName } = action.payload;
            return {
                ...state,
                cartItems: [...state.cartItems, newCartItem],
                storeUrl,
                storeName
            }
        }
        case REMOVE_FROM_CART: {
            return {
                ...state,
                cartItems: state.cartItems.filter((el) => el.id !== action.payload)
            };
        }
        case UPDATE_TO_COUNT: {
            const { id, count } = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map((el) =>
                    el.id === id ? {...el, count, totalPrice: (el.price + el.optionPrice) * count} : el
            )
            };
        }
        case UPDATE_TO_OPTIONS: {
            const { id, options } = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map((el) =>
                    el.id === id ? {...el, options, optionPrice: calcOptionsPrice(options), totalPrice: (el.price + calcOptionsPrice(options)) * el.count} : el
                )
            }
        }
        default:
            return state;
    }
};

export default cartReducer;

//cartData 추가
export const addToCart = (cartData: Omit<ProductType, 'totalPrice'>, storeUrl: string, storeName: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().cartList;
    
    const existItem = state.cartItems.find(
        (item) => item.name === cartData.name && JSON.stringify(item.options) === JSON.stringify(cartData.options)
    );
    
    if (existItem) {
        const newCount = existItem.count + cartData.count;
        dispatch(updateCartItemCount(existItem.id, newCount)); // cart count 업데이트
    } else {
        // 새로운 항목일 경우 장바구니에 추가
        const newItem = { ...cartData, totalPrice: (cartData.price + cartData.optionPrice) * cartData.count };
        dispatch({
            type: ADD_TO_CART,
            payload: {
                cartItems: newItem,
                storeUrl,
                storeName
            }
        });
    }
};

//수량 업데이트하는 thunk 액션
export const updateCartItemCount = (id: string, count: number) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({
        type: UPDATE_TO_COUNT,
        payload: { id, count }
    });
    dispatch({
        type: UPDATE_COUNTER,
        payload: { id, count }
    });
}

//옵션을 업데이트 하는 thunk 액션
export const updateCartItemOptions = (id: string, options: InputOptionsTypeProps[]) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({
        type: UPDATE_TO_OPTIONS,
        payload: { id, options }
    });
}