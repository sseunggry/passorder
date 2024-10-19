import {Link} from "react-router-dom";
import {EventListDataPros, storeListDataPros} from "hooks/queries/useStoreQuery";

interface ListProps {
    addClass?: string;
    itemList?: storeListDataPros[];
    eventList?: EventListDataPros[];
}

function CardList({addClass = '', itemList, eventList}: ListProps){
    if(addClass === "card-event"){
        return (
            <ul className={`card-list ${addClass}`}>
                {eventList?.map(({txt, img}, idx) => (
                    <li key={idx}>
                        <Link to="">
                            {txt && (
                                <div className="txt-wrap">
                                    <p className="tit">{txt}</p>
                                </div>
                            )}
                            {img && (
                                <div className="img-wrap">
                                    <img src={`${process.env.PUBLIC_URL}/resource/images/event/${img}`} alt=""/>
                                </div>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        )
    } else{
        return (
            <ul className={`card-list ${addClass}`}>
                {itemList?.map(({logo, brand, infoList, badge}, idx) => (
                    <li key={idx}>
                        <Link to="">
                            {logo && (
                                <div className="logo">
                                    <img src={`${process.env.PUBLIC_URL}/resource/images/logo/${logo}.png`} alt=""/>
                                </div>
                            )}
                            
                            <div className="txt-wrap">
                                <p className="tit">{brand}</p>
                                {infoList && (
                                    <ul className="info-list">
                                        {infoList.rating && <li className="rating">{infoList.rating}</li>}
                                        {infoList.review && <li className="review">리뷰 <span>{infoList.review}</span></li>}
                                        {infoList.distance && <li className="distance">{infoList.distance}</li>}
                                    </ul>
                                )}
                                {badge && (
                                    <div className="badge-wrap">
                                        {badge.map(({text, color}, idx) => (
                                            <span className={`badge ${color}`} key={idx}>{text}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }
}

export default CardList;