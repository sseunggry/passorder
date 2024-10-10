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

function List({addClass = '', itemList}: ListProps){
    return (
        <ul className={`list ${addClass}`}>
            {itemList.map(({img, tit, infoList, badge}, idx) => (
                <li key={idx}>
                    {img && (
                        <div className="logo">
                            {/*<img src={`${process.env.PUBLIC_URL}/resource/images/main/banner/${img}`} alt=""/>*/}
                        </div>
                    )}
                    
                    <div className="txt-wrap">
                        <p className="tit">{tit}</p>
                        {infoList && (
                            <ul className="info-list">
                                {infoList.map(({rating, review, distance}, idx) => (
                                    <>
                                        {rating && <li className="rating">{rating}</li>}
                                        {review && <li className="review">리뷰 <span>{review}</span></li>}
                                        {distance && <li className="distance">{distance}</li>}
                                    </>
                                ))}
                            </ul>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default List;