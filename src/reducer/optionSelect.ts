import {calcOptionsPrice} from "hooks/common";

//type
export interface OptionsInfoTypeProps {
    option: string;
    price: number;
}
export interface InputOptionsTypeProps {
    inputType?: string;
    optionTit?: string;
    optionList: OptionsInfoTypeProps[];
    required?: boolean;
}

interface OptionStateTypeProps {
    [productId: string]: {
        options: InputOptionsTypeProps[];
        optionPrice: number;
    };
}

//action type
export const CHECK_OPTION = 'optionSelect/CHECK_OPTION';
export const UPDATE_OPTION = 'optionSelect/UPDATE_OPTION';

interface CheckOptionAction {
    type: typeof CHECK_OPTION;
    payload: {
        id: string;
        option: InputOptionsTypeProps;
    }
}

//action 생성함수
export const checkOption = (id: string, option: InputOptionsTypeProps): CheckOptionAction => ({
    type: CHECK_OPTION,
    payload: { id, option }
});

//초기값
const initialState: OptionStateTypeProps = {};


//특정 타이틀의 옵션을 업데이트하는 체크박스 함수
const updateOption = (state: InputOptionsTypeProps[], option: InputOptionsTypeProps) => {
    const {optionTit, optionList, inputType, required} = option;
    const existsIdx = state.findIndex(el => el.optionTit === optionTit);
    
    let newState = [...state];
    
    // type = radio: optionList 덮어씌우고 새로운 항목을 추가
    if(inputType === 'radio'){
        newState = (existsIdx === -1)
            ? [...state, { inputType, required, optionTit, optionList }]
            : state.map(el => (el.optionTit === optionTit ? { ...el, optionList } : el));
        
    } else if(inputType === 'checkbox'){
        // type = checkbox: option 존재하면 제거, 없으면 추가
        if(existsIdx === -1) return [...state, { inputType, required, optionTit, optionList }];
        
        const targetItem = state[existsIdx];
        const optionExists = targetItem.optionList.some(
            el => el.option === optionList[0]?.option && el.price === optionList[0]?.price
        );
        
        const updateOptionList = optionExists
            ? targetItem.optionList.filter(el => el.option !== optionList[0]?.option || el.price !== optionList[0]?.price)
            : [...targetItem.optionList, ...optionList];
        
        newState = updateOptionList.length > 0
            ? state.map((el, idx) =>
                (idx === existsIdx ? {...el, optionList: updateOptionList } : el)
            )
            : state.filter((_, idx) => idx !== existsIdx);
    }
    return newState;
}

//리듀서 함수 정의
const optionSelectReducer = (state = initialState, action: CheckOptionAction): OptionStateTypeProps => {
    // console.log("디스패치", state);
    // console.log("action", action);
    
    switch (action.type) {
        case CHECK_OPTION: {
            const { id, option } = action.payload;
            const options = updateOption(state[id]?.options ?? [], option);
            
            return {
                ...state,
                [id]: {
                    ...state[id],
                    options: options,
                    optionPrice: calcOptionsPrice(options)
                }
            };
        }
        default:
            return state;
    }
};

export default optionSelectReducer;
