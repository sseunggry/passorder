import {useDispatch, useSelector} from "react-redux";
import {INCREASE, DECREASE, CountPropsType} from "../reducer/counter";

function Counter() {
    const {number, diff} = useSelector((state: {counter :CountPropsType}) => ({
        number: state.counter.number,
        diff: state.counter.diff
    }));
    const dispatch = useDispatch();
    
    const onIncrease = () => dispatch({ type: INCREASE });
    const onDecrease = () => dispatch({ type: DECREASE });
    
    console.log(number, diff);
    
    return (
        <div className="btn-count">
            <button type="button" className="minus" onClick={onDecrease}>
                <span className="blind">-</span>
            </button>
            <input type="text" className="count" value={number} disabled />
            <button type="button" className="plus" onClick={onIncrease}>
                <span className="blind">+</span>
            </button>
        </div>
    )
}

export default Counter;