import {useParams} from "react-router-dom";
import {useStoreData} from "hooks/queries/useStoreQuery";
import Layout from "templates/Layout";
import Loading from "components/Loading";
import React from "react";
import Select from "components/Select";
import {numberComma} from "hooks/common";
import NoticeList from "templates/NoticeList";
import Button from "components/Button";

function TogetherOrder(){
    const {id} = useParams();
    const {data, isLoading, isError} = useStoreData(id ?? '');
    
    if(isLoading) {
        return <Loading />
    }
    return (
        <Layout
            headerCon={{back: true, title: "같이주문 장바구니"}}
            bottomMenu={false}
            pageBtn={{text: "주문하기"}}
            addClass="cart together-order"
        >
            {data ? (
                <>
                    <h2 className="page-tit">{data.brand}</h2>
                    <section>
                        <h3 className="sec-tit">
                            나의 메뉴
                            <span className="badge">결제 담당</span>
                        </h3>
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
                    </section>
                    <section>
                        <h3 className="sec-tit">
                            맴버 메뉴
                        </h3>
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
                                <dd>{numberComma(0)}원</dd>
                            </dl>
                            <dl className="total-price">
                                <dt>결제 예정금액</dt>
                                <dd>{numberComma(0)}원</dd>
                            </dl>
                        </div>
                    </section>
                    <NoticeList
                        list={["패스오더는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 따라서 패스오더는 상품, 거래정보 및 거래에 대하여 책임을 지지 않습니다."]}
                    />
                </>
            ) : (
                <p>데이터를 불러오지 못했습니다.</p>
            )}
        </Layout>
    )
}

export default TogetherOrder;