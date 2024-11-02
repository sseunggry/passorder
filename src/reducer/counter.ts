//types
interface CounterTypeProps {
    id: string;
    count: number;
}
interface CounterStateType {
    [id: string]: {
        count: number;
    }
}

//action type
export const INCREASE = 'counter/INCREASE';
export const DECREASE = 'counter/DECREASE';
export const UPDATE_COUNTER = 'counter/UPDATE_COUNTER';

interface IncreaseAction {
    type: typeof INCREASE;
    payload: {
        id: string;
        count: number;
    }
}

interface DecreaseAction {
    type: typeof DECREASE;
    payload: {
        id: string;
        count: number;
    }
}

interface UpdateAction {
    type: typeof UPDATE_COUNTER;
    payload: {
        id: string;
        count: number;
    }
}

type CounterAction = IncreaseAction | DecreaseAction | UpdateAction;

//action 생성함수
export const onInCreaseCount = (id: string, count: number): IncreaseAction => ({
    type: INCREASE,
    payload: { id, count }
});

export const onDecreaseCount = (id: string, count: number): DecreaseAction => ({
   type: DECREASE,
   payload: { id, count }
});
export const updateCount = (id: string, count: number): UpdateAction => ({
   type: UPDATE_COUNTER,
   payload: { id, count }
});

//초기값
const initialState: CounterStateType = {};

//리듀서 함수 정의
const counterReducer = (state = initialState, action: CounterAction): CounterStateType => {
    // console.log("디스패치", state);
    // console.log("action", action);
    
    switch (action.type) {
        case INCREASE: {
            const { id, count } = action.payload;
            return {
                ...state,
                [id]: {
                    count: count
                }
            };
        }
        case DECREASE: {
            const { id, count } = action.payload;
            return {
                ...state,
                [id]: {
                    count: count
                }
            };
        }
        case UPDATE_COUNTER: {
            const { id, count } = action.payload;
            return {
                ...state,
                [id]: {
                    count
                }
            }
        }
        default:
            return state;
    }
    
    // switch (action.type) {
    //     case INCREASE: {
    //         const { id, count } = action.payload;
    //         return {
    //             [id]: {
    //                 count: count
    //             }
    //         };
    //     }
    //     case DECREASE: {
    //         const { id, count } = action.payload;
    //         return {
    //             [id]: {
    //                 count: count > 1 ? count - 1 : count
    //             }
    //         };
    //     }
    //     default:
    //         return state;
    // }
};

export default counterReducer;