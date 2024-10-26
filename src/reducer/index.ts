import {combineReducers} from "redux";
import counter from "./counter";
import optionSelect from "./optionSelect";


const rootReducer = combineReducers({
    counter,
    optionSelect
});

export default rootReducer;

//useSelector 로 스토어에 접근할 때 필요
export type RootState = ReturnType<typeof rootReducer>;