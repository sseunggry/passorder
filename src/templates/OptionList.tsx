import {numberComma} from "hooks/common";
import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import {ProductOptionList} from "../hooks/queries/useStoreQuery";
import {useState} from "react";
import Counter from "../components/Counter";

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
}
interface selectOptionsProps {
    selectList: inputOptionsProps[];
    count: number;
    totalPrice: number;
    price: number;
}

function OptionList({price, optionList} : OptionListProps) {
    const [totalPrice, setTotalPrice] = useState<number>(price);
    const [radioOptions, setRadioOptions] = useState<inputOptionsProps[]>([]);
    const [checkOptions, setCheckOptions] = useState<inputOptionsProps[]>([]);
    const [selectOptions, setSelectOptions] = useState<selectOptionsProps | {}>({});
    const optionRadioOnChange = (tit: string, info: optionsInfoProps) => {
        setRadioOptions(prevList => {
            const exists = prevList.some(el => el.tit === tit);
            
            let newList;
            if(!exists) {
                newList = [...prevList, {tit, info: [info]}];
            } else{
                newList = [{tit, info: [info]}];
            }
            
            newList.forEach(({ info }) => {
                info.forEach(({ price }) => {
                    setTotalPrice(prev => prev + price);
                });
            });
            
            return newList;
        });
    }
    const optionCheckOnChange = (tit: string, info: optionsInfoProps) => {
        setCheckOptions(prevList => {
            const existsIdx = prevList.findIndex(el => el.tit === tit);
            
            if(existsIdx === -1){
                return [...prevList, {tit, info: [info]}];
            } else{
                const existingInfoIdx = prevList[existsIdx].info.findIndex(el => el.option === info.option && el.price === info.price);
                
                if(existingInfoIdx === -1){
                    const updateList = [...prevList];
                    updateList[existsIdx] = { ...updateList[existsIdx], info: [...updateList[existsIdx].info, info] };
                    return updateList;
                } else{
                    const updateList = [...prevList];
                    updateList[existsIdx] = { ...updateList[existsIdx], info: updateList[existsIdx].info.filter((_, idx) => idx !== existingInfoIdx) };
                    
                    if(updateList[existsIdx].info.length === 0) {
                        return updateList.filter((_, idx) => idx !== existingInfoIdx);
                    }
                    return updateList;
                }
            }
        });
    }
    const btnOrderOnClick = () => {
        setSelectOptions({ selectList: [...radioOptions, ...checkOptions] , totalPrice, price});
    }
    
    return (
        <div className="option-list">
            <div className="item">
                <div className="tit-wrap" onClick={btnOrderOnClick}>
                    <p className="tit">가격</p>
                    <div className="price">{numberComma(totalPrice)}원</div>
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
                    <Counter />
                </div>
            </div>
        </div>
    )
}

export default OptionList;