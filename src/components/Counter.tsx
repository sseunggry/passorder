import {useDispatch, useSelector} from "react-redux";
import {INCREASE, DECREASE} from "reducer/counter";
import {selectorCount} from "../reducer";

function Counter() {
    const count = useSelector(selectorCount);
    const dispatch = useDispatch();
    
    const onIncrease = () => dispatch({ type: INCREASE });
    const onDecrease = () => dispatch({ type: DECREASE });
    
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