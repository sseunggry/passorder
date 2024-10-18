interface infoListProps {
    rating?: number;
    review?: number;
    distance?: string;
}

interface itemPros {
    img?: string;
    tit: string;
    infoList?: Array<infoListProps>;
    badge?: string;
}

interface ListProps {
    addClass?: string;
    itemList: Array<itemPros>;
}

function CardList({addClass = '', itemList}: ListProps){
    return (
        <ul className={`card-list ${addClass}`}>
            {itemList.map(({img, tit, infoList, badge}, idx) => (
                <li key={idx}>
                    {img && (
                        <div className="logo">
                            <img src={`${process.env.PUBLIC_URL}/resource/images/logo/${img}.png`} alt=""/>
                        </div>
                    )}
                    
                    <div className="txt-wrap">
                        <p className="tit">{tit}</p>
                        {infoList && (
                            // <ul className="info-list" key={idx}>
                            //     {infoList.rating && <li className="rating">{infoList.rating}</li>}
                            //     {infoList.review && <li className="review">리뷰 <span>{infoList.review}</span></li>}
                            //     {infoList.distance && <li className="distance">{infoList.distance}</li>}
                            // </ul>
                            <>
                                {infoList.map(({rating, review, distance}, idx) => (
                                    <ul className="info-list" key={idx}>
                                        {rating && <li className="rating">{rating}</li>}
                                        {review && <li className="review">리뷰 <span>{review}</span></li>}
                                        {distance && <li className="distance">{distance}</li>}
                                    </ul>
                                ))}
                            </>
                            
                            // <div className="info-list">
                            //     {infoList.map(({rating, review, distance}, idx) => (
                            //         <ul key={idx}>
                            //             {rating && <li className="rating">{rating}</li>}
                            //             {review && <li className="review">리뷰 <span>{review}</span></li>}
                            //             {distance && <li className="distance">{distance}</li>}
                            //         </ul>
                            //     ))}
                            // </div>
                        )}
                        <div className="badge-wrap">
                            <span className="badge blue">할인</span>
                            <span className="badge pink">적립</span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default CardList;