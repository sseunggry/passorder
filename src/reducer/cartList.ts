import {InputOptionsTypeProps} from "./optionSelect";

//types
interface productTypeProps {
    id: string;
    url: string;
    name: string;
    img: string;
    count: number;
    options: InputOptionsTypeProps[];
    price: number;
}

interface CartStateTypeProps {
    cartItems: productTypeProps[];
}

//action type
export const ADD_TO_CART = 'cartList/ADD_TO_CART';
export const REMOVE_FROM_CART = 'cartList/REMOVE_FROM_CART';

interface AddCartAction {
    type: typeof ADD_TO_CART;
    payload: productTypeProps;
}

interface RemoveCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: string;
}

export type CartActionTypes = AddCartAction | RemoveCartAction;


//action 생성함수
export const addToCart = (product: productTypeProps): AddCartAction => ({
    type: ADD_TO_CART,
    payload: product
});

export const removeFromCart = (productId: string): RemoveCartAction => ({
    type: REMOVE_FROM_CART,
    payload: productId
});


//초기값 type
const initialState: CartStateTypeProps = {
    cartItems: []
}

const cartReducer = (state = initialState, action: CartActionTypes): CartStateTypeProps => {
    // console.log("디스패치", state);
    // console.log("action", action);
    // console.log("data", action.payload);
    
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find(
                (el) => el.id === item.id && JSON.stringify(el.options) === JSON.stringify(item.options)
            );
            
            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((el) =>
                        el.id === existItem.id && JSON.stringify(el.options) === JSON.stringify(el.options) ? {...el, count: el.count + item.count} : el
                    )
                };
            }
    
            return {
                ...state,
                cartItems: [...state.cartItems, item]
            };
            
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((el) => el.id !== action.payload)
            };
        default:
            return state;
    }
};

export default cartReducer;