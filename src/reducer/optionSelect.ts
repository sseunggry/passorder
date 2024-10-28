export interface OptionsInfoTypeProps {
    option:string;
    price: number;
}
export interface InputOptionsTypeProps {
    inputType?: string;
    optionTit?: string;
    optionList: OptionsInfoTypeProps[];
    productName?: string;
    thumbImg?: string;
}

//초기 상태
const initialState = {
    productPrice: 0,
    count: 1,
    options: [] as InputOptionsTypeProps[],
    totalPrice: 0
};

//액션 타입
export const OPTION_CHECK = 'optionSelect/OPTION_CHECK' as const;

//액션 인터페이스
interface ActionTypeProps {
    type: typeof OPTION_CHECK;
    inputType?: string;
    optionTit?: string;
    optionList: OptionsInfoTypeProps[];
    productName?: string;
    thumbImg?: string;
    productPrice: number;
    count: number;
    totalPrice: number;
}

//선택된 옵션리스트의 총합을 계산하는 함수
export const calcTotalPrice = (array: InputOptionsTypeProps[]):number => {
    return array.reduce((acc, item) => {
        return acc + item.optionList.reduce((sum, option) => sum + option.price, 0);
    }, 0);
}

//특정 타이틀의 옵션을 업데이트하는 체크박스 함수
const updateOption = (state: InputOptionsTypeProps[], action: ActionTypeProps, type= '') => {
    const existsIdx = state.findIndex(el => el.optionTit === action.optionTit);
    const optionListArray = Array.isArray(action.optionList) ? action.optionList : [action.optionList];
    
    let newState = state;
    
    // type = radio: optionList 덮어씌우고 새로운 항목을 추가
    if(type === 'radio'){
        newState = (existsIdx === -1)
            ? [...state, { ...action, optionList: optionListArray }]
            : state.map(el => (el.optionTit === action.optionTit ? { ...el, optionList: optionListArray } : el));
        
    } else if(type === 'checkbox'){
        // type = checkbox: option 존재하면 제거, 없으면 추가
        if(existsIdx === -1) return [...state, { ...action, optionList: optionListArray }];
        
        const targetItem = state[existsIdx] || { ...action, optionList: [] };
        const optionExists = targetItem.optionList.some(
            el => el.option === optionListArray[0]?.option && el.price === optionListArray[0]?.price
        );
        
        const updateOptionList = optionExists
            ? targetItem.optionList.filter(el => el.option !== optionListArray[0]?.option || el.price !== optionListArray[0]?.price)
            : [...targetItem.optionList, ...optionListArray];
        
        newState = updateOptionList.length > 0
            ? state.map((el, idx) => (idx === existsIdx ? {...el, optionList: updateOptionList } : el))
            : state.filter((_, idx) => idx !== existsIdx);
    }
    // const totalPrice = calcTotalPrice(newState);
    return newState;
}

//리듀서 함수 정의
const optionSelectReducer = (state = initialState, action: ActionTypeProps) => {
    console.log("디스패치", state);
    console.log("action", action);
    
    switch (action.type) {
        case OPTION_CHECK:
            const newOptions = updateOption(state.options, action, action.inputType);
            const newTotalPrice = (action.productPrice * action.count) + calcTotalPrice(newOptions);
            return {
                ...state,
                options: newOptions,
                totalPrice: newTotalPrice
            };
        default:
            return state;
    }
};

export const selectorTotalPrice = (state: { optionSelect: { options: InputOptionsTypeProps[], totalPrice: number }}) => state.optionSelect.totalPrice;
export const selectorOptionList = (state: { optionSelect: { options: InputOptionsTypeProps[], totalPrice: number }}) => state.optionSelect.options;

export default optionSelectReducer;

