import Counter from "components/Counter";
import OptionListInput from "templates/OptionListInput";
import {numberComma} from "hooks/common";
import {ProductOptionList} from "hooks/queries/useStoreQuery";

interface OptionListProps {
    id: string;
    price: number;
    optionList?: ProductOptionList[];
}

function OptionList({id, price, optionList} : OptionListProps) {
    return (
        <div className="option-list">
            <div className="item">
                <div className="tit-wrap">
                    <p className="tit">가격</p>
                    <div className="price">{numberComma(price)}원</div>
                </div>
            </div>
            <OptionListInput
                id={id}
                optionList={optionList}
            />
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