import {InputOptionsTypeProps} from "./optionSelect";
import {AppDispatch, RootState, updateCartItemCount} from "./index";
import {updateCount} from "./counter";

//types
interface ProductType {
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

export const addToCart = (cartItems: Omit<ProductType, 'totalPrice'>, storeUrl: string, storeName: string): AddCartAction => ({
    type: ADD_TO_CART,
    payload: {
        cartItems: {
            ...cartItems,
            totalPrice: (cartItems.price + cartItems.optionPrice) * cartItems.count
        },
        storeUrl,
        storeName
    }
});

export const addToCart2 = (cartData: Omit<ProductType, 'totalPrice'>, storeUrl: string, storeName: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().cartList;
    
    const existItem = state.cartItems.find(
        (item) => item.id === cartData.id && JSON.stringify(item.options) === JSON.stringify(cartData.options)
    );
    
    if (existItem) {
        const newCount = existItem.count + cartData.count;
        dispatch(updateCartItemCount(cartData.id, newCount)); // cart count 업데이트
        dispatch(updateCount(cartData.id, newCount)); // counter 리덕스에 count 업데이트
    } else {
        // 새로운 항목일 경우 장바구니에 추가
        const newItem = { ...cartData, totalPrice: (cartData.price + cartData.optionPrice) * cartData.count };
        dispatch({
            type: ADD_TO_CART,
            payload: { cartItems: newItem, storeUrl, storeName },
        });
    }
}

// export const addToCart = (cartItems: ProductType, storeUrl: string, storeName: string): AddCartAction => ({
//     type: ADD_TO_CART,
//     payload: {cartItems, storeUrl, storeName}
// });

export const removeFromCart = (id: string): RemoveCartAction => ({
    type: REMOVE_FROM_CART,
    payload: id
});

export const updateCartCount = (id: string, count: number): UpdateCartCountAction => ({
    type: UPDATE_TO_COUNT,
    payload: { id, count }
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
            const { cartItems: newItem, storeUrl, storeName } = action.payload;
            const existItem = state.cartItems.find(
                (el) => el.name === newItem.name && JSON.stringify(el.options) === JSON.stringify(newItem.options)
            );
    
            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((el) =>
                        (el.name === newItem.name) && (JSON.stringify(el.options) === JSON.stringify(el.options)) ? {...el, count: el.count + newItem.count} : el
                    )
                };
            }
    
            return {
                ...state,
                cartItems: [...state.cartItems, newItem],
                storeUrl,
                storeName
            };
        }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((el) => el.id !== action.payload)
            };
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
                    el.id === id ? {...el, options, totalPrice: (el.price + el.optionPrice) * el.count} : el
                )
            }
        }
        default:
            return state;
    }
};

export default cartReducer;