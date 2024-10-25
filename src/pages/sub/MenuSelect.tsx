import {useParams} from "react-router-dom";
import Layout from "templates/Layout";
import NoticeList from "../../templates/NoticeList";
import {useStoreData} from "../../hooks/queries/useStoreQuery";
import Loading from "../../components/Loading";
import Checkbox from "../../components/Checkbox";

function MenuSelect() {
    const {id, categoryId, productId} = useParams();
    const {data, isLoading, isError} = useStoreData(id ?? '');
    // const productList = data?.productList?.find(el => el.categoryId === categoryId);
    // const productItem = productList?.list.find(item => item.productId === productId);
    const productItem = data?.productList?.find(el => el.categoryId === categoryId)?.list.find(item => item.productId === productId);
    console.log(productItem);
    
    if(isLoading) return <Loading />
    
    return (
        <Layout headerCon={{back: true, cart: true}} bottomMenu={false} pageBtn={{text: "주문하기"}} addClass="menu-select">
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
                        <li>
                            <div className="tit-wrap">
                                <p className="tit">가격</p>
                                <div className="price">13,400원</div>
                            </div>
                        </li>
                        <li>
                            <div className="tit-wrap">
                                <p className="tit">샷양</p>
                                <span className="badge">선택</span>
                            </div>
                            <ul className="check-list">
                                <li>
                                    <Checkbox label="샷 추가"/>
                                    <p className="price">+500원</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="tit-wrap">
                                <p className="tit">시럽추가</p>
                                <span className="badge">선택</span>
                            </div>
                            <ul className="check-list">
                                <li>
                                    <Checkbox label="헤이즐럿 시럽추가"/>
                                    <p className="price">+500원</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="tit-wrap">
                                <p className="tit">수량</p>
                                <div className="btn-count">
                                    <button type="button" className="minus"><span className="blind">-</span></button>
                                    <input type="text" disabled value="1" className="count"/>
                                    <button type="button" className="plus"><span className="blind">+</span></button>
                                </div>
                            </div>
                        </li>
                    </div>
                    <NoticeList
                        title={false}
                        addClass="line"
                        list={["메뉴 사진은 연출된 이미지로 실제 음식과 다를 수 있습니다."]}
                    />
                </>
            )}
        </Layout>
    )
}

export default MenuSelect;