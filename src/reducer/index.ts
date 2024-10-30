import {combineReducers} from "redux";
import counter from "./counter";
import optionSelect from "./optionSelect";
import cartList from "./cartList";
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

export const selectorCount = (state: RootState, productId: string) => state.optionSelect[productId]?.count ?? 1;
export const selectorOptionList = (state: RootState, productId: string) => state.optionSelect[productId]?.options ?? [];
export const selectorCartList = (state: RootState) => state.cartList;