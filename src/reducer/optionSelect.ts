export interface OptionsInfoTypeProps {
    option:string;
    price: number;
}
export interface InputOptionsTypeProps {
    inputType?: string;
    tit: string;
    info: OptionsInfoTypeProps[];
}

//초기 상태
const initialState:InputOptionsTypeProps[] = [];

//액션 타입
export const OPTION_CHECK = 'optionSelect/OPTION_CHECK' as const;

//액션 인터페이스
export interface ActionTypeProps {
    type: typeof OPTION_CHECK;
    tit: string;
    info: OptionsInfoTypeProps[];
    inputType?: string;
}

//특정 타이틀의 옵션을 업데이트하는 체크박스 함수
const updateOption = (state: InputOptionsTypeProps[], action: ActionTypeProps, type= '') => {
    const existsIdx = state.findIndex(el => el.tit === action.tit);
    const infoArray = Array.isArray(action.info) ? action.info : [action.info];
    
    // type = radio: info 덮어씌우고 새로운 항목을 추가
    if(type === 'radio'){
        return (existsIdx === -1)
            ? [...state, { tit: action.tit, info: infoArray }]
            : state.map(el => (el.tit === action.tit ? { ...el, info: infoArray } : el));
    }
    
    // type = checkbox: option 존재하면 제거, 없으면 추가
    if(existsIdx === -1) return [...state, { tit: action.tit, info: infoArray }];
    
    const targetItem = state[existsIdx] || { tit: action.tit, info: [] };
    const optionExists = targetItem.info.some(
        el => el.option === infoArray[0]?.option && el.price === infoArray[0]?.price
    );
    
    const updateInfo = optionExists
        ? targetItem.info.filter(el => el.option !== infoArray[0]?.option || el.price !== infoArray[0]?.price)
        : [...targetItem.info, action.info];
    
    return updateInfo.length > 0
        ? state.map((el, idx) => (idx === existsIdx ? {...el, info: updateInfo } : el))
        : state.filter((_, idx) => idx !== existsIdx);
}

//리듀서 함수 정의
const optionSelectReducer = (state = initialState, action: ActionTypeProps) => {
    switch (action.type) {
        case OPTION_CHECK:
            return updateOption(state, action, action.inputType);
        default:
            return state;
    }
};

export default optionSelectReducer;

export const selectorOptionList = (state: {optionSelect: InputOptionsTypeProps[]}) => state.optionSelect;