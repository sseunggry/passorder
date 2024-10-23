import Layout from "templates/Layout";
import {Link, useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchData} from "api/api";
import Loading from "../../components/Loading";
import {EventListDataPros, storeListDataPros} from "../../hooks/queries/useStoreQuery";
import {MouseEvent, useState} from "react";

function DetailPage() {
    const {pathname} = useLocation();
    const location = pathname.split('/').filter(el => el !== '');
    const category = location[0];
    const params = location[1];

    const {data, isLoading, isError} = useQuery<storeListDataPros | EventListDataPros>({
        queryKey: ['useData', category, params],
        queryFn: () => fetchData(`${category}/${params}`)
    });
    
    const [show, setShow] = useState<boolean[]>([false, false]);
    const btnMoreOnClick = (idx: number) => {
        setShow(prevShowList => {
            const newShowList = [...prevShowList];
            newShowList[idx] = !prevShowList[idx];
            return newShowList;
        });
    }
    
    // const detailInfoBtnMoreOnClick = (e:MouseEvent<HTMLButtonElement>) => {
    //     const $target = e.currentTarget;
    //     const moreTxt = $target.nextElementSibling as HTMLElement | null;
    //
    //     moreTxt?.classList.toggle('show');
    // }
    
    if(isLoading) {
        return <Loading />
    }
    
    if(category === 'event') {
        const {id, txt, img} = data as EventListDataPros;
        return (
            <Layout headerCon={{back: true, cart: true}} addClass="detail-event">
                {txt}
            </Layout>
        )
    }
    
    const {id, brand, infoList, imgVisual, tel, detailInfo} = data as storeListDataPros;
    return (
        <Layout headerCon={{back: true, cart: true}} addClass="detail-store">
            {data && (
                <>
                    <div className="store-info">
                        <div className="visual-img">
                            <img src={`${process.env.PUBLIC_URL}/resource/images/sub/${id}/${imgVisual}`} alt=""/>
                        </div>
                        <div className="txt-wrap">
                            <h2 className="tit-xl">{brand}</h2>
                            {infoList && (
                                <ul className="store-info-list">
                                    {infoList.rating && <li className="rating">{infoList.rating}</li>}
                                    {infoList.review && <li className="review">리뷰 <span>{infoList.review}</span></li>}
                                    {infoList.distance && <li className="distance">{infoList.distance}</li>}
                                </ul>
                            )}
                        </div>
                        <div className="btn-wrap">
                            <a href={`tel:${tel}`} className="btn line medium round-l">전화</a>
                            <Link to="" className="btn line medium round-l">같이주문</Link>
                        </div>
                        {detailInfo && (
                            <ul className="detail-info">
                                <li>{detailInfo.time} 소요</li>
                                <li>
                                    {/*<button type="button" className="btn-more" onClick={(e) => detailInfoBtnMoreOnClick(e)}>{detailInfo.location}</button>*/}
                                    <button type="button" className="btn-more" onClick={() => btnMoreOnClick(0)}>{detailInfo.location}</button>
                                    <p className={`more-txt ${show[0] ? 'show' : ''}`}>지번 : {detailInfo.location2}</p>
                                </li>
                                <li>
                                    <button type="button" className="btn-more" onClick={() => btnMoreOnClick(1)}>{detailInfo.businessHours?.split('~').pop()}에 영업 종료</button>
                                    <p className={`more-txt ${show[1] ? 'show' : ''}`}>{detailInfo.businessHours}</p>
                                </li>
                            </ul>
                        )}
                    </div>
                    <hr className="divider"/>
                    <div className="product">
                        <div className="tab full">
                            <ul role="tab-list">
                                <li>
                                    <button type="button" className="btn-tab">신메뉴</button>
                                </li>
                            </ul>
                        </div>
                        <ul className="list">
                        
                        </ul>
                    </div>
                </>
            )}
        </Layout>
    )
}

export default DetailPage;