import {numberComma} from "../hooks/common";
import Counter from "../components/Counter";
import Button from "../components/Button";
import React from "react";
import {ProductType} from "../reducer/cartList";

interface CartItemsProps {
    cartItems: ProductType[];
}

function CartList({cartItems} : CartItemsProps) {
    return (
        <ul className="box-line cart-list">
            {cartItems?.map((item, idx) => (
                <li key={idx}>
                    <div className="img-wrap">
                        <img src={`${process.env.PUBLIC_URL}/resource/images/sub/${item.url.split('/')[2]}/${item.img}`} alt=""/>
                    </div>
                    <div className="txt-wrap">
                        <p className="name">{item.name}</p>
                        {item.options.length !== 0 && (
                            <ul className="option-list">
                                {item.options.map((option, optionIdx) => (
                                    <li key={`${option.optionTit}_${optionIdx}`}>
                                        <span className="tit">{option.optionTit}</span>
                                        <span className="desc">
                                                                {option.optionList.map((el) => {
                                                                    let txt = el.option;
                                                                    if(el.price !== 0) {
                                                                        txt = `${el.option}(${numberComma(el.price)}원)`;
                                                                    }
                                                                    return txt;
                                                                }).join(', ')}
                                                            </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="btn-wrap">
                            <Counter id={item.id} />
                            <Button
                                addClass="line small round-s"
                                text="옵션변경"
                                // onClick={() => onOptionChangeClick(item.id, item.options)}
                            />
                        </div>
                        <div className="price">{numberComma(item.totalPrice)}원</div>
                    </div>
                    <div className="btn-delete">
                        <Button
                            children={(
                                <>
                                    <span className="blind">삭제</span>
                                    <i className="icon icon-delete"></i>
                                </>
                            )}
                            // onClick={() => onDeleteClick(item.id)}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default CartList;