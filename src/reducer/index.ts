import {combineReducers} from "redux";
import counter from "./counter";


const rootReducer = combineReducers({
    counter
});

export default rootReducer;

//useSelector 로 스토어에 접근할 때 필요
export type RootState = ReturnType<typeof rootReducer>;