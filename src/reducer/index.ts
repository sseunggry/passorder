import {combineReducers} from "redux";
import counter from "reducer/counter";
import optionSelect from "reducer/optionSelect";
import cartList from "reducer/cartList";
import {configureStore, createSelector} from "@reduxjs/toolkit";
import optionSetList from "reducer/optionList";
import {ProductOptionList} from "../hooks/queries/useStoreQuery";

const rootReducer = combineReducers({
    counter,
    optionSetList,
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

export const selectorCount = createSelector(
    [(state: RootState, id: string) => state.counter[id]?.count],
    (count) => count > 0 ? count : 1
);
export const selectorInfo = createSelector(
    [(state: RootState, id: string) => state.optionSelect[id]],
    (info) => info ? info : {options: [], optionPrice: 0}
);
export const selectorCartList = (state: RootState) => state.cartList;
export const selectorSetOptionList = createSelector(
    [(state: RootState, id: string) => state.optionSetList],
    (list) => list ? list : {id: '', optionList: []}
);