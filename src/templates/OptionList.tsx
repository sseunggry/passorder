import {useState} from "react";
import {useDispatch} from "react-redux";
import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import Counter from "components/Counter";
import {numberComma} from "hooks/common";
import {ProductOptionList} from "hooks/queries/useStoreQuery";
import {OptionsInfoTypeProps, OPTION_CHECK} from "reducer/optionSelect";

interface OptionListProps {
    price: number;
    optionList?: ProductOptionList[];
}

function OptionList({price, optionList} : OptionListProps) {
    const [totalPrice, setTotalPrice] = useState<number>(price);
    const dispatch = useDispatch();
    const onUpdateSelectList = (tit: string, info: OptionsInfoTypeProps, inputType?: string) => dispatch({ type: OPTION_CHECK, tit, info, inputType });
    
    return (
        <div className="option-list">
            <div className="item">
                <div className="tit-wrap">
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
                                        onChange={() => onUpdateSelectList(item.tit, list, 'radio')}
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
                                        onChange={() => onUpdateSelectList(item.tit, list, 'checkbox')}
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