import {numberComma} from "hooks/common";
import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import {ProductOptionList} from "../hooks/queries/useStoreQuery";
import {useState} from "react";

interface OptionListProps {
    price: number;
    optionList?: ProductOptionList[];
}
interface optionsInfoProps {
    option:string;
    price: number;
}
interface inputOptionsProps {
    tit: string;
    info: optionsInfoProps[];
    // [key: string] : {
    //     info: {
    //         option:string;
    //         price: number;
    //     }
    // }
}

function OptionList({price, optionList} : OptionListProps) {
    const [total, setTotal] = useState<number>(price);
    const [count, setCount] = useState<number>(1);
    const btnCountOnClick = {
        minus: () => {
            setCount(prev => ( (prev > 1) ? (prev - 1) : prev));
        },
        plus: () => {
            setCount(prev => prev + 1);
        }
    }
    const [selectOptions, setSelectOptions] = useState<{ [key: string]: object | string | string[] }>({});
    const [radioOptions, setRadioOptions] = useState<inputOptionsProps[]>([]);
    const [checkOptions, setCheckOptions] = useState<inputOptionsProps[]>([]);
    const optionRadioOnChange = (tit: string, info: optionsInfoProps) => {
        setRadioOptions(prevList => {
            const exists = prevList.some(el => el.tit === tit);
            
            if(!exists) { return [...prevList, {tit, info: [info]}]; }
            return [{tit, info: [info]}];
        });
    }
    const optionCheckOnChange = (tit: string, info: optionsInfoProps) => {
        setCheckOptions(prevList => {
            const existsIdx = prevList.findIndex(el => el.tit === tit);
            const exists = prevList.some(el => el.tit === tit);
            
            if(existsIdx === -1){
                return [...prevList, {tit, info: [info]}];
            } else{
                const updateList = [...prevList];
                updateList[existsIdx] = {
                    ...updateList[existsIdx],
                    info: [...updateList[existsIdx].info, info]
                };
                return updateList;
            }
            // if(!exists) { return [...prevList, {tit, info: [info]}]; }
            // return [{tit, info: [info, ...prevList.info]}];
        });
    }
    // console.log(radioOptions);
    console.log(checkOptions);
    const optionSelectOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        const labelText = e.target.getAttribute('data-label') || '';
        const price = e.target.getAttribute('data-price') || '';
        // const {name, value} = e.target;
        // console.log(name, value);
        
        // console.log(value, labelText);
    
        setSelectOptions(prevOptions => {
           if(type === 'radio') {
               return {...prevOptions, [name]: {[labelText]: price}};
           } else if(type === 'checkbox') {
               const currentValues = (prevOptions[value] as string[]) || [];
               return {
                   ...prevOptions,
                   [value]: checked ? [...currentValues, labelText] : currentValues.filter(item => item !== labelText)
               };
           }
           return prevOptions;
        });
    }
    console.log(selectOptions);
    return (
        <div className="option-list">
            <div className="item">
                <div className="tit-wrap">
                    <p className="tit">가격</p>
                    <div className="price">{numberComma(total)}원</div>
                </div>
            </div>
            {optionList?.map((item, idx) => (
                <div className="item" key={idx}>
                    <div className="tit-wrap">
                        <p className="tit">{item.tit}</p>
                        {item.required ? <span className="badge orange">필수</span> : <span className="badge">선택</span>}
                    </div>
                    {item.radioList && (
                        <ul className="radio-list">
                            {item.radioList.map((list, idx) => (
                                <li key={idx}>
                                    <Radio
                                        onChange={() => optionRadioOnChange(item.tit, list)}
                                        id={`radio_${item.id}_${idx}`}
                                        name={`radio_${item.id}`}
                                        // value={list.option}
                                        // dataLabel={list.option}
                                        // dataPrice={list.price}
                                        label={list.option}
                                        labelChildren={<span className="price">+{numberComma(list.price)}원</span>}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    {item.selectList && (
                        <ul className="select-list">
                            {item.selectList.map((list, idx) => (
                                <li key={idx}>
                                    <Checkbox
                                        onChange={() => optionCheckOnChange(item.tit, list)}
                                        id={`chk_${item.id}_${idx}`}
                                        label={list.option}
                                        value={list.option}
                                        dataLabel={list.price}
                                        labelChildren={<span className="price">+{numberComma(list.price)}원</span>}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
            <div className="item">
                <div className="tit-wrap">
                    <p className="tit">수량</p>
                    <div className="btn-count">
                        <button type="button" className="minus" onClick={btnCountOnClick.minus}>
                            <span className="blind">-</span>
                        </button>
                        <input type="text" className="count" value={count} disabled />
                        <button type="button" className="plus" onClick={btnCountOnClick.plus}>
                            <span className="blind">+</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OptionList;