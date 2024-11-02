import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState, selectorCount} from "../reducer";
import {updateCartItemCount} from "../reducer/cartList";

interface CounterProps {
    id: string;
}

function Counter({ id }: CounterProps) {
    const dispatch = useDispatch<AppDispatch>();
    const count =  useSelector((state: RootState) => selectorCount(state, id));
    
    const onIncrease = () => {
        const newCount = count + 1;
        dispatch(updateCartItemCount(id, newCount));
    };
    const onDecrease = () => {
        const newCount = Math.max(count - 1, 1);
        dispatch(updateCartItemCount(id, newCount));
    };
    
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