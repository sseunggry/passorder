import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import Counter from "components/Counter";
import {numberComma} from "hooks/common";
import {ProductOptionList} from "hooks/queries/useStoreQuery";
import {OptionsInfoTypeProps, OPTION_CHECK, selectorTotalPrice} from "reducer/optionSelect";
import {selectorCount} from "../reducer/counter";

interface OptionListProps {
    price: number;
    optionList?: ProductOptionList[];
}

function OptionList({price, optionList} : OptionListProps) {
    const count = useSelector(selectorCount);
    
    const dispatch = useDispatch();
    const onUpdateSelectList = (optionTit: string, optionList: OptionsInfoTypeProps, inputType: string, productPrice: number, count: number) =>
        dispatch({ type: OPTION_CHECK, optionTit, optionList, inputType, productPrice, count });
    
    return (
        <div className="option-list">
            <div className="item">
                <div className="tit-wrap">
                    <p className="tit">가격</p>
                    <div className="price">{numberComma(price)}원</div>
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
                                        onChange={() => onUpdateSelectList(item.tit, list, 'radio', price, count)}
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
                                        onChange={() => onUpdateSelectList(item.tit, list, 'checkbox', price, count)}
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