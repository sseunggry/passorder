//type
import {ProductOptionList} from "../hooks/queries/useStoreQuery";

interface OptionListStateTypeProps {
    id: string;
    optionList: ProductOptionList[];
}

//action type
export const SET_OPTION_LIST = 'optionSelect/SET_OPTION_LIST';

interface SetOptionListAction {
    type: typeof SET_OPTION_LIST;
    payload: {
        id: string;
        optionList: ProductOptionList[];
    }
}

//action 생성함수
export const setOptionList = (id: string, optionList: ProductOptionList[]) :SetOptionListAction => ({
   type: SET_OPTION_LIST,
   payload: { id, optionList }
});

//초기값
const initialState: OptionListStateTypeProps = {
    id: '',
    optionList: []
};

//리듀서 함수 정의
const optionSetListReducer = (state = initialState, action: SetOptionListAction): OptionListStateTypeProps => {
    // console.log("디스패치", state);
    // console.log("action", action);
    
    switch (action.type) {
        case SET_OPTION_LIST:
            const { id, optionList } = action.payload;
            return {
                ...state,
                id,
                optionList
            }
        default:
            return state;
    }
};

export default optionSetListReducer;
