import {Link} from "react-router-dom";
import Button from "../components/Button";
import {storeListDataPros} from "../hooks/queries/useStoreQuery";


// function DetailStoreInfo({data} : storeListDataPros){
//     return (
//         <div className="store-info">
//             <div className="visual-img">
//                 <img src={`${process.env.PUBLIC_URL}/resource/images/sub/${id}/${imgVisual}`} alt=""/>
//             </div>
//             <div className="txt-wrap">
//                 <h1 className="tit-xl">{brand}</h1>
//                 {infoList && (
//                     <ul className="store-info-list">
//                         {infoList.rating && <li className="rating">{infoList.rating}</li>}
//                         {infoList.review && <li className="review">리뷰 <span>{infoList.review}</span></li>}
//                         {infoList.distance && <li className="distance">{infoList.distance}</li>}
//                     </ul>
//                 )}
//             </div>
//             <div className="btn-wrap">
//                 <a href={`tel:${tel}`} className="btn line medium round-l">전화</a>
//                 <Link to="" className="btn line medium round-l">같이주문</Link>
//             </div>
//             {detailInfo && (
//                 <ul className="detail-info">
//                     <li>{detailInfo.time} 소요</li>
//                     <li>
//                         {/*<button type="button" className="btn-more" onClick={(e) => detailInfoBtnMoreOnClick(e)}>{detailInfo.location}</button>*/}
//                         <button type="button" className="btn-more" onClick={() => btnMoreOnClick(0)}>{detailInfo.location}</button>
//                         <p className={`more-txt ${show[0] ? 'show' : ''}`}>지번 : {detailInfo.location2}</p>
//                     </li>
//                     <li>
//                         <button type="button" className="btn-more" onClick={() => btnMoreOnClick(1)}>{detailInfo.businessHours?.split('~').pop()}에 영업 종료</button>
//                         <p className={`more-txt ${show[1] ? 'show' : ''}`}>{detailInfo.businessHours}</p>
//                     </li>
//                 </ul>
//             )}
//             <div className="btn-more-wrap">
//                 <Button
//                     tag="a"
//                     url={`/store/${id}/info`}
//                     addClass="text medium"
//                     text="가게정보 더보기"
//                     children={<i className="icon icon-arrow right"></i>}
//                 />
//             </div>
//         </div>
//     )
// }

// export default DetailStoreInfo;