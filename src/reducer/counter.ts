import {createStore} from "redux";

export interface CountPropsType {
    number: number;
    diff: number
}

export const SET_DIFF = 'counter/INCREASE' as const;
export const INCREASE = 'counter/INCREASE' as const;
export const DECREASE = 'counter/DECREASE' as const;

interface SetDiffActionPropsType {
    type: typeof SET_DIFF;
    diff: number;
}
interface IncreaseActionPropsType {
    type: typeof INCREASE;
}
interface DecreaseActionPropsType {
    type: typeof DECREASE;
}
export const setDiff = (diff:number) => ({ type: SET_DIFF, diff });
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// export type CountPropsType = { count: number };
type reducerPropsType = ReturnType< | typeof setDiff | typeof increase | typeof decrease>;
type CountActionPropsType = SetDiffActionPropsType | IncreaseActionPropsType | DecreaseActionPropsType;


//초기 상태
const initialState:CountPropsType = {
    number: 0,
    diff: 1
};

//리듀서 함수 정의
const counter = (state = initialState, action: CountActionPropsType) => {
    console.log('현재상태', state);
    console.log('디스패치된 액션: ', action);
    
    switch (action.type) {
        // case SET_DIFF:
        //     return {...state, diff: action.diff};
        case INCREASE:
            return {...state, number: state.number + state.diff};
        case DECREASE:
            return state.number > 1 ? {...state, number: state.number - state.diff} : state;
        default:
            return state;
    }
};

export default counter;