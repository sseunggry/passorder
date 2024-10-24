import {useParams} from "react-router-dom";
import Layout from "templates/Layout";
import NoticeList from "../../templates/NoticeList";
import {useStoreData} from "../../hooks/queries/useStoreQuery";
import Loading from "../../components/Loading";

function MenuSelect() {
    const {id, categoryId, productId} = useParams();
    const {data, isLoading, isError} = useStoreData(id ?? '');
    // const productList = data?.productList?.find(el => el.categoryId === categoryId);
    // const productItem = productList?.list.find(item => item.productId === productId);
    const productItem = data?.productList?.find(el => el.categoryId === categoryId)?.list.find(item => item.productId === productId);
    console.log(productItem);
    
    if(isLoading) return <Loading />
    
    return (
        <Layout headerCon={{back: true, cart: true}} bottomMenu={false} pageBtn={{text: "주문하기"}}>
            {data && (
                <>
                    <div className="img-wrap">
                        <img src={`${process.env.PUBLIC_URL}/resource/images/sub/${id}/${productItem?.visualImg}`} alt=""/>
                    </div>
                    <div className="txt-wrap">
                        <h2 className="tit-m">{productItem?.name}</h2>
                        <p className="desc">{productItem?.desc}</p>
                    </div>
                    <div className="option-list">
                        <dl>
                            <dt>가격</dt>
                            <dd>+500원</dd>
                        </dl>
                        <dl>
                            <dt>샷양 <span className="badge">선택</span></dt>
                            <dd>
                                <ul className="check-list">
                                    <li>
                                        <label htmlFor="">
                                            <input type="checkbox" />
                                            <span>샷 추가</span>
                                        </label>
                                        <p className="price">+500원</p>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                        <dl>
                            <dt>시럽추가 <span className="badge">선택</span></dt>
                            <dd>
                                <ul className="check-list">
                                    <li>
                                        <label htmlFor="">
                                            <input type="checkbox" />
                                            <span>헤이즐럿 시럽추가</span>
                                        </label>
                                        <p className="price">+500원</p>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                        <dl>
                            <dt>수량</dt>
                            <dd>
                                <button type="button"><span className="blind">-</span></button>
                                <button type="button"><span className="count">1</span></button>
                                <button type="button"><span className="blind">+</span></button>
                            </dd>
                        </dl>
                    </div>
                    <NoticeList list={["메뉴 사진은 연출된 이미지로 실제 음식과 다를 수 있습니다."]} title={false} />
                </>
            )}
        </Layout>
    )
}

export default MenuSelect;