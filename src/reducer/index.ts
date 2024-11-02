import {combineReducers} from "redux";
import counter from "reducer/counter";
import optionSelect from "reducer/optionSelect";
import cartList from "reducer/cartList";
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
