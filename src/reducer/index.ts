import {combineReducers} from "redux";
import counter from "./counter";
import optionSelect from "./optionSelect";
import productSelect from "./productSelect";


const rootReducer = combineReducers({
    counter,
    optionSelect,
    productSelect
});

export default rootReducer;

//useSelector 로 스토어에 접근할 때 필요
export type RootState = ReturnType<typeof rootReducer>;