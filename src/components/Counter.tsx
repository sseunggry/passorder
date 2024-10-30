import {useDispatch, useSelector} from "react-redux";
import {INCREASE, DECREASE} from "reducer/counter";
import {AppDispatch, RootState, selectorCount} from "../reducer";
import {updateCount} from "../reducer/optionSelect";

interface CounterProps {
    productId: string;
}

function Counter({ productId }: CounterProps) {
    const count =  useSelector((state: RootState) => selectorCount(state, productId));
    const dispatch = useDispatch<AppDispatch>();
    
    const onIncrease = () => dispatch(updateCount(productId, count + 1));
    const onDecrease = () => dispatch(updateCount(productId, Math.max(count - 1, 1)));
    
    return (
        <div className="btn-count">
            <button type="button" className="minus" onClick={onDecrease}>
                <span className="blind">-</span>
            </button>
            <input type="text" className="count" value={count} disabled />
            <button type="button" className="plus" onClick={onIncrease}>
                <span className="blind">+</span>
            </button>
        </div>
    )
}

export default Counter;