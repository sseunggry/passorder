interface OptionsInfoTypeProps {
    option:string;
    price: number;
}
interface InputOptionsTypeProps {
    type?: string;
    tit: string;
    info: OptionsInfoTypeProps[];
}

//초기 상태
const initialState:InputOptionsTypeProps[] = [
    {
        tit: '',
        type: '',
        info: []
    }
];

//액션 타입
export const RADIO_CHECK = 'optionSelect/RADIO_CHECK' as const;
export const CHECKBOX_CHECK = 'optionSelect/CHECKBOX_CHECK' as const;

//액션 인터페이스
interface RadioAction {
    type: typeof RADIO_CHECK;
    tit: string;
    info: OptionsInfoTypeProps[];
}
interface CheckboxAction {
    type: typeof CHECKBOX_CHECK;
    tit: string;
    info: OptionsInfoTypeProps[];
}
type ActionTypeProps = RadioAction | CheckboxAction;

//리듀서 함수 정의
const optionSelectReducer = (state = initialState, action: ActionTypeProps): InputOptionsTypeProps[] => {
    console.log('현재상태', state);
    console.log('디스패치된 액션: ', action);
    
    switch (action.type) {
        case RADIO_CHECK:
            return state.some(el => el.tit === action.tit)
                ? state.map(el => (el.tit === action.tit ? { ...el, info: action.info } : el))
                : [...state, { tit: action.tit, info: action.info }];
        case CHECKBOX_CHECK:
            const existsIdx = state.findIndex(el => el.tit === action.tit);
            if(existsIdx === -1) {
                return [...state, { tit: action.tit, info: action.info }];
            } else{
                const existsInfoIdx = state[existsIdx].info.findIndex(
                    el => el.option === action.info[0]?.option && el.price === action.info[0]?.price
                );
                
                if(existsInfoIdx === -1){
                    const updateList = [...state];
                    updateList[existsIdx] = {
                        ...updateList[existsIdx],
                        info: [...updateList[existsIdx].info, ...action.info]
                    };
                    return updateList;
                } else{
                    const updateList = [...state];
                    updateList[existsIdx] = {
                        ...updateList[existsIdx],
                        info: updateList[existsIdx].info.filter((_, idx) => idx !== existsInfoIdx)
                    };
                    
                    if(updateList[existsIdx].info.length === 0){
                        return updateList.filter((_, idx) => idx !== existsIdx);
                    }
                    return updateList;
                }
            }
        default:
            return state;
    }
};

export default optionSelectReducer;