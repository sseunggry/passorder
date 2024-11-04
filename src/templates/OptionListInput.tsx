import {useDispatch} from "react-redux";
import Checkbox from "components/Checkbox";
import Radio from "components/Radio";
import {numberComma} from "hooks/common";
import {ProductOptionList} from "hooks/queries/useStoreQuery";
import {OptionsInfoTypeProps, checkOption, InputOptionsTypeProps} from "reducer/optionSelect";
import {AppDispatch} from "reducer";
import {useEffect, useState} from "react";

interface OptionListProps {
    id: string;
    optionList?: ProductOptionList[];
    optionSelect?: InputOptionsTypeProps[];
}

function OptionListInput({id, optionList, optionSelect} : OptionListProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [checkedOptions, setCheckedOptions] = useState<Record<string, string[] | string>>({});
    
    useEffect(() => {
        if(optionSelect) {
            const initialCheckedState = optionList?.reduce((acc, item) => {
                item.radioList?.forEach((radioOption) => {
                    const isRadioChecked = optionSelect.some(
                        (select) =>
                            select.optionTit === item.tit &&
                            select.optionList.some((el) => el.option === radioOption.option)
                    );
                    if(isRadioChecked){
                        acc[`radio/${item.tit}`] = isRadioChecked ? radioOption.option : '';
                    }
                });
                item.checkList?.forEach((checkOption) => {
                    const isCheckChecked = optionSelect.some(
                        (select) =>
                            select.optionTit === item.tit &&
                            select.optionList.some((el) => el.option === checkOption.option)
                    );
                    if(isCheckChecked) {
                        acc[`check/${item.tit}`] = [...(acc[`check/${item.tit}`] as string[] || []), checkOption.option];
                    }
                });
                return acc;
            }, {} as Record<string, string[] | string>) || {};
            setCheckedOptions(initialCheckedState);
        }
    }, [optionList, optionSelect]);
    
    const onUpdateSelectList = (id: string, inputType: string, optionTit: string, optionList: OptionsInfoTypeProps, required: boolean) => {
        dispatch(
            checkOption(
                id, {inputType, optionTit, optionList: [optionList], required: required}
        ));
    }
    
    const handleRadioChange = (id: string, optionTit: string, option: string, optionList: OptionsInfoTypeProps, required: boolean) => {
      setCheckedOptions((prev) => ({
          ...prev,
          [`radio/${optionTit}`] : option
      }));
      onUpdateSelectList(id, 'radio', optionTit, optionList, required);
    };
    
    const handleCheckboxChange = (id: string, optionTit: string, option: string, optionList: OptionsInfoTypeProps, required: boolean) => {
        setCheckedOptions((prev) => {
           const currentCheckedOptions = Array.isArray(prev[`check/${optionTit}`]) ? prev[`check/${optionTit}`] as string[] : [];
           const isChecked = currentCheckedOptions.includes(option);
           
           return {
               ...prev,
               [`check/${optionTit}`]: isChecked
                   ? currentCheckedOptions.filter((opt) => opt !== option)
                   : [...currentCheckedOptions, option]
           };
        });
        onUpdateSelectList(id, 'checkbox', optionTit, optionList, required);
    }
    
    // const handleOptionChange = (id: string, inputType: string, optionTit: string, option: string, optionList: OptionsInfoTypeProps, required: boolean) => {
    //     setCheckedOptions((prev) => {
    //         const newCheckedOptions = {...prev};
    //
    //         if(inputType === 'radio'){
    //             Object.keys(newCheckedOptions).forEach(key => {
    //                if(key.startsWith(`radio/${optionTit}`)){
    //                    newCheckedOptions[key] = false;
    //                }
    //             });
    //         }
    //
    //         newCheckedOptions[`${inputType}/${optionTit}/${option}`] = true;
    //
    //         return newCheckedOptions;
    //     });
    //     onUpdateSelectList(id, inputType, optionTit, optionList, required);
    // }
    
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
                                        <Radio
                                            onChange={() => handleRadioChange(id, item.tit, list.option, list, item.required ?? false)}
                                            id={`radio_${item.id}_${idx}`}
                                            name={`radio_${item.id}`}
                                            label={list.option}
                                            checked={checkedOptions[`radio/${item.tit}`] === list.option}
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
                                            onChange={() => handleCheckboxChange(id, item.tit, list.option, list, item.required ?? false )}
                                            id={`chk_${item.id}_${idx}`}
                                            label={list.option}
                                            checked={Array.isArray(checkedOptions[`check/${item.tit}`]) && checkedOptions[`check/${item.tit}`].includes(list.option)}
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

export default OptionListInput;