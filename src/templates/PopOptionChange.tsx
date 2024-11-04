import Radio from "../components/Radio";
import {numberComma} from "../hooks/common";
import Checkbox from "../components/Checkbox";
import {ProductOptionList} from "../hooks/queries/useStoreQuery";
import {checkOption, InputOptionsTypeProps, OptionsInfoTypeProps} from "../reducer/optionSelect";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../reducer";

interface OptionListProps {
    id: string;
    optionList?: ProductOptionList[];
    optionSelect?: InputOptionsTypeProps[];
}

function PopOptionChange({id, optionList, optionSelect} : OptionListProps) {
    const dispatch = useDispatch<AppDispatch>();
    const onUpdateSelectList = (id: string, inputType: string, optionTit: string, optionList: OptionsInfoTypeProps, required: boolean) => {
        dispatch(
            checkOption(
                id, {inputType, optionTit, optionList: [optionList], required: required}
            ));
    }
    
    return (
        <>
            {optionList && optionList?.length > 0 ? (
                optionList?.map((item, itemIdx) => (
                    <div className="item" key={`${itemIdx}`}>
                        <div className="tit-wrap">
                            <p className="tit">{item.tit}</p>
                            {item.required ? <span className="badge orange">필수</span> : <span className="badge">선택</span>}
                        </div>
                        {item.radioList && (
                            <ul className="radio-list">
                                {item.radioList.map((list, idx) => (
                                    <li key={idx}>
                                        {/*{item.radioList?.map(({option}) => option)}*/}
                                        {/*{optionSelect?.map((select) => select.optionTit === item.tit)}*/}
                                        {optionSelect?.map((select) => select.optionList.map(el => el.option))}
                                        {optionSelect?.some((select) => select.optionTit === item.tit && (select.optionList.map(el => el.option) === item.radioList?.map(({option}) => option))) }
                                        <Radio
                                            onChange={() => onUpdateSelectList(id, 'radio', item.tit, list, item.required ?? false)}
                                            id={`radio_${item.id}_${idx}`}
                                            name={`radio_${item.id}`}
                                            label={list.option}
                                            checked={optionSelect ? optionSelect?.some((select) => select.optionTit === item.tit && (select.optionList.map(el => el.option) === item.radioList?.map(({option}) => option))) : false}
                                            labelChildren={<span className="price">+{numberComma(list.price)}원</span>}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                        {item.checkList && (
                            <ul className="select-list">
                                {item.checkList.map((list, idx) => (
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
                ))
            ) : ''}
        </>
    )
}

export default PopOptionChange;
