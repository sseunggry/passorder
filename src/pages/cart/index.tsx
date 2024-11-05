import Layout from "templates/Layout";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState, selectorCartList, selectorInfo, selectorSetOptionList} from "reducer";
import React, {useEffect, useState} from "react";
import {numberComma} from "hooks/common";
import Counter from "components/Counter";
import Button from "components/Button";
import NoticeList from "templates/NoticeList";
import Select from "components/Select";
import {removeFromCart, updateCartItemOptions} from "reducer/cartList";
import BottomSheet from "../../templates/BottomSheet";
import OptionListInput from "../../templates/OptionListInput";
import {InputOptionsTypeProps} from "../../reducer/optionSelect";

function Cart() {
    const [productId, setProductId] = useState('');
    const { cartItems, storeUrl, storeName } = useSelector(selectorCartList);
    const { optionList } = useSelector((state: RootState) => selectorSetOptionList(state, productId));
    const { options, optionPrice } = useSelector((state:RootState) => selectorInfo(state, productId));
    const dispatch = useDispatch<AppDispatch>();
    
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [popId, setPopId] = useState('');
    const [selectOptions, setSelectOptions] = useState<InputOptionsTypeProps[]>([]);
    
    useEffect(() => {
        const totalPrice = cartItems.reduce((acc, cur) => acc + cur.totalPrice, 0);
        setCartTotalPrice(totalPrice);
    }, [cartItems]);
    
    const onDeleteClick = (id:string) => {
        dispatch(removeFromCart(id));
    }
    const onOptionChangeClick = (id: string, options: InputOptionsTypeProps[]) => {
        setPopId(`pop_${id}`);
        setProductId(id);
        setSelectOptions(options);
        setIsOpen(true);
    }
    
    const onPopOptionChangeClick = () => {
        dispatch(updateCartItemOptions(productId, options));
        setIsOpen(false);
    }
    
    return (
        <>
            <Layout
                headerCon={{back: true, title: '장바구니'}}
                addClass="cart"
                pageBtn={cartItems.length === 0 ? {text: '주문하기', addClass: 'disabled'} : {text: '주문하기'}}
            >
                {cartItems.length === 0 ? (
                    <div className="box-line nodata">
                        <p>담은 메뉴가 없습니다. 메뉴를 담아주세요.</p>
                        <Button
                            tag="a"
                            url="/"
                            addClass="medium fill primary round-l"
                            text="메뉴추가"
                            preChildren={<i className="icon icon-plus"></i>}
                        />
                    </div>
                ) : (
                    <>
                        <h2 className="page-tit">{storeName}</h2>
                        <section>
                            <h3 className="sec-tit">나의 메뉴</h3>
                            <ul className="box-line cart-list">
                                {cartItems.map((item, idx) => (
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
                                                    onClick={() => onOptionChangeClick(item.id, item.options)}
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
                                                onClick={() => onDeleteClick(item.id)}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="btn-wrap btn-menu-add">
                                <Button
                                    tag="a"
                                    url={storeUrl}
                                    addClass="line large round-m"
                                    text="메뉴추가"
                                    preChildren={<i className="icon icon-plus"></i>}
                                />
                            </div>
                        </section>
                        <section>
                            <h3 className="sec-tit">예상 수령시간</h3>
                            <Select
                                id="select_time"
                                list={{"10분": 1, "20분": 2, "30분": 3, "1시간": 4, "2시간": 5}}
                                placeholder="수령 시간을 선택해주세요"
                                noticeList={["1시간 이상 걸리신다면 요청사항에 기입해주세요."]}
                            />
                        </section>
                        <section>
                            <h3 className="sec-tit">결제 예정금액</h3>
                            <div className="box-line total-info">
                                <dl>
                                    <dt>내 주문금액</dt>
                                    <dd>{numberComma(cartTotalPrice)}원</dd>
                                </dl>
                                <dl className="total-price">
                                    <dt>결제 예정금액</dt>
                                    <dd>{numberComma(cartTotalPrice)}원</dd>
                                </dl>
                            </div>
                        </section>
                        <NoticeList
                            list={["패스오더는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 따라서 패스오더는 상품, 거래정보 및 거래에 대하여 책임을 지지 않습니다."]}
                        />
                    </>
                )}
            </Layout>
            <BottomSheet
                id={popId}
                isOpen={isOpen}
                title="옵션 변경"
                popupBtn={{text: "옵션 변경하기", onClick: onPopOptionChangeClick}}
            >
                <div className="option-list">
                    <OptionListInput
                        id={productId}
                        optionList={optionList}
                        optionSelect={selectOptions}
                    />
                </div>
            </BottomSheet>
        </>
    )
}

export default Cart;