import {useDispatch, useSelector} from "react-redux";
import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import Counter from "components/Counter";
import {numberComma} from "hooks/common";
import {ProductOptionList} from "hooks/queries/useStoreQuery";
import {OptionsInfoTypeProps, checkOption} from "reducer/optionSelect";
import {AppDispatch, RootState, selectorCount, selectorInfo} from "../reducer";

interface OptionListProps {
    id: string;
    price: number;
    optionList?: ProductOptionList[];
}

function OptionList({id, price, optionList} : OptionListProps) {
    const dispatch = useDispatch<AppDispatch>();
    const onUpdateSelectList = (id: string, inputType: string, optionTit: string, optionList: OptionsInfoTypeProps, required: boolean) => {
        dispatch(
            checkOption(
                id, {inputType, optionTit, optionList: [optionList], required: required}
        ));
    }
    
    return (
        <div className="option-list">
            <div className="item">
                <div className="tit-wrap">
                    <p className="tit">가격</p>
                    <div className="price">{numberComma(price)}원</div>
                </div>
            </div>
            {optionList?.map((item, itemIdx) => (
                <div className="item" key={`${itemIdx}`}>
                    <div className="tit-wrap">
                        <p className="tit">{item.tit}</p>
                        {item.required ? <span className="badge orange">필수</span> : <span className="badge">선택</span>}
                    </div>
                    {item.radioList && (
                        <ul className="radio-list">
                            {item.radioList.map((list, idx) => (
                                <li key={idx}>
                                    <Radio
                                        onChange={() => onUpdateSelectList(id, 'radio', item.tit, list, item.required ?? false)}
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
                                        onChange={() => onUpdateSelectList(id, 'checkbox', item.tit, list, item.required ?? false )}
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
                    <Counter id={id} />
                </div>
            </div>
        </div>
    )
}

export default OptionList;