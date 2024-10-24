import {Link} from "react-router-dom";
import Button from "../components/Button";
import {storeListDataPros} from "../hooks/queries/useStoreQuery";
import {useState} from "react";

interface DetailStoreInfoProps {
    data: storeListDataPros;
}

function DetailStoreInfo({data}: DetailStoreInfoProps){
    const {id, brand, infoList, imgVisual, tel, detailInfo} = data;
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
    
    return (
        <div className="store-info">
            <div className="visual-img">
                <img src={`${process.env.PUBLIC_URL}/resource/images/sub/${id}/${imgVisual}`} alt=""/>
            </div>
            <div className="txt-wrap">
                <h1 className="tit-xl">{brand}</h1>
                {infoList && (
                    <ul className="store-info-list">
                        {infoList.rating && <li className="rating">{infoList.rating}</li>}
                        {infoList.review && <li className="review">리뷰 <span>{infoList.review}</span></li>}
                        {infoList.distance && <li className="distance">{infoList.distance}</li>}
                    </ul>
                )}
            </div>
            <div className="btn-wrap">
                <Button
                    tag="a"
                    url={`tel:${tel}`}
                    addClass="line medium round-l"
                    text="전화"
                    preChildren={<i className="icon icon-call"></i>}
                />
                <Button
                    tag="a"
                    url={`/together/${id}`}
                    addClass="line medium round-l"
                    text="같이주문"
                    preChildren={<i className="icon icon-together"></i>}
                />
            </div>
            {detailInfo && (
                <ul className="detail-info">
                    <li className="delivery">{detailInfo.delivery} 소요</li>
                    <li className="location">
                        {/*<button type="button" className="btn-more" onClick={(e) => detailInfoBtnMoreOnClick(e)}>{detailInfo.location}</button>*/}
                        <button type="button" className="btn-more" onClick={() => btnMoreOnClick(0)}>{detailInfo.location}</button>
                        <p className={`more-txt ${show[0] ? 'show' : ''}`}>지번 : {detailInfo.location2}</p>
                    </li>
                    <li className="time">
                        <button type="button" className="btn-more" onClick={() => btnMoreOnClick(1)}>{detailInfo.time?.split('~').pop()}에 영업 종료</button>
                        <p className={`more-txt ${show[1] ? 'show' : ''}`}>{detailInfo.time}</p>
                    </li>
                </ul>
            )}
            <div className="btn-more-wrap">
                <Button
                    tag="a"
                    url={`/store/${id}/info`}
                    addClass="text medium"
                    text="가게정보 더보기"
                    children={<i className="icon icon-arrow right"></i>}
                />
            </div>
        </div>
    )
}

export default DetailStoreInfo;