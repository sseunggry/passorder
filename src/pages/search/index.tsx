import Layout from "templates/Layout";
import Button from "components/Button";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function SearchPage() {
    const [recentSearchList, setRecentSearchList] = useState<string[]>([]);
    const recommendList = ["요아정", "배스킨라빈스", "파리바게트", "설빙", "던킨도너츠", "빙수", "아이스크림", "요거트", "와플", "통닭"];
    const allDeleteBtnOnClick = () => {
        setRecentSearchList([]);
    }
    useEffect(() => {
        //임시
        setRecentSearchList(['커피빈', '파리바게트', '베스킨라빈스', '바나프레소', '요하정', '설빙']);
    }, []);
    
    return (
        <Layout headerCon={{back: true, search: true}}>
            {recentSearchList.length !== 0 && (
                <div className="recent-search">
                    <div className="sec-tit">
                        <p className="tit-m">최근 검색어</p>
                        <Button
                            url="/"
                            text="전체 삭제"
                            addClass="small text"
                            onClick={allDeleteBtnOnClick}
                        />
                    </div>
                        <ul className="tag-list">
                            {recentSearchList?.map((item, idx) => (
                                <li key={idx}>
                                    {item}
                                    <Button
                                        addClass="btn-icon small"
                                        // onClick={}
                                        children={
                                            <>
                                                <span className="blind">삭제</span>
                                                <i className="icon icon-delete"></i>
                                            </>
                                        }
                                    />
                                </li>
                            ))}
                        </ul>
                </div>
            )}
            <div className="recommend-list">
                <div className="sec-tit">
                    <p className="tit-m"><span className="name c-point">이재희</span>님을 위한 추천</p>
                </div>
                <ul className="list">
                    {recommendList?.map((item, idx) => (
                        <li key={idx}>
                            <Link to=""><strong>{idx+1}</strong> {item}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export default SearchPage;