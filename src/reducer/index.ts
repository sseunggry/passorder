import {combineReducers} from "redux";
import counter, {updateCount} from "./counter";
import optionSelect, {InputOptionsTypeProps} from "./optionSelect";
import cartList, {updateCartCount, updateCartOptions} from "./cartList";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    counter,
    optionSelect,
    cartList
});

export default rootReducer;

export const store = configureStore({
    reducer: rootReducer
});

//useSelector 로 스토어에 접근할 때 필요
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const selectorCount = (state: RootState, id: string) => state.counter[id]?.count ?? 1;
export const selectorInfo = (state: RootState, id: string) => state.optionSelect[id] ?? {options: [], optionPrice: 0};
export const selectorCartList = (state: RootState) => state.cartList;

//수량 업데이트하는 thunk 액션
export const updateCartItemCount = (id: string, count: number) => (dispatch: AppDispatch) => {
    // console.log(count);
    dispatch(updateCartCount(id, count));
    dispatch(updateCount(id, count));
}

//옵션을 업데이트 하는 thunk 액션
export const updateCartItemOptions = (id: string, options: InputOptionsTypeProps[]) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(updateCartOptions(id, options));
    const updateCart = getState().cartList.cartItems;
    
    // console.log()
}
