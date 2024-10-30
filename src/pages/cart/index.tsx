import Layout from "../../templates/Layout";
import {useSelector} from "react-redux";
import {selectorCartList} from "../../reducer";
import React, {useEffect, useState} from "react";
import {numberComma} from "../../hooks/common";
import Counter from "../../components/Counter";
import Button from "../../components/Button";
import NoticeList from "../../templates/NoticeList";
import Select from "../../components/Select";
import {useParams} from "react-router-dom";

function Cart() {
    const {cartItems} = useSelector(selectorCartList);
    console.log(cartItems,cartItems);
    
    // const [pageBtn, setPageBtn] = useState({});
    // useEffect(() => {
    //     if(cartItems.length === 0){
    //         setPageBtn({});
    //     } else{
    //         setPageBtn({text: '주문하기'});
    //     }
    // }, [cartItems]);
    
    return (
        <Layout headerCon={{back: true, title: '장바구니'}} pageBtn={{text: '주문하기'}} addClass="cart">
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
                    <h2 className="page-tit">파리바게트 수원메르디앙</h2>
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
                                            <Counter productId={item.id}/>
                                            <Button
                                                addClass="line small round-s"
                                                text="옵션변경"
                                            />
                                        </div>
                                        <div className="price">{numberComma(item.price)}원</div>
                                    </div>
                                    <div className="btn-delete">
                                        <Button
                                            children={(
                                                <>
                                                    <span className="blind">삭제</span>
                                                    <i className="icon icon-delete"></i>
                                                </>
                                            )}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="btn-wrap btn-menu-add">
                            <Button
                                url={""}
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
                                <dd>6,600원</dd>
                            </dl>
                            <dl className="total-price">
                                <dt>결제 예정금액</dt>
                                <dd>17,000원</dd>
                            </dl>
                        </div>
                    </section>
                    <NoticeList
                        list={["패스오더는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 따라서 패스오더는 상품, 거래정보 및 거래에 대하여 책임을 지지 않습니다."]}
                    />
                </>
            )}
        </Layout>
    )
}

export default Cart;