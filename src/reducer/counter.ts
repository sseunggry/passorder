//초기 상태
const initialState:number = 1;

//액션 타입
export const INCREASE = 'counter/INCREASE' as const;
export const DECREASE = 'counter/DECREASE' as const;

//액션 인터페이스
interface IncreaseAction {
    type: typeof INCREASE;
}

interface DecreaseAction {
    type: typeof DECREASE;
}

type CounterAction = IncreaseAction | DecreaseAction;

//리듀서 함수 정의
const counterReducer = (state = initialState, action: CounterAction) => {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state > 1 ? state - 1 : state;
        default:
            return state;
    }
};

export default counterReducer;

export const selectorCount = (state: {counter: number}) => state.counter;