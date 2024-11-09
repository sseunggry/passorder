import Layout from "templates/Layout";
import {useParams} from "react-router-dom";
import {useStoreData} from "hooks/queries/useStoreQuery";
import Loading from "components/Loading";


function StoreInfo() {
    const {id} = useParams();
    const {data: storeData, isLoading: storeDataIsLoading, isError: storeDataIsError} = useStoreData(id ?? '');
    const {detailInfo} = storeData ?? {};
    
    if(storeDataIsLoading) {
        return <Loading />
    }
    
    console.log(storeData?.detailInfo, detailInfo);
    
    return (
        <>
            <Layout headerCon={{back: true, title: '가게 정보'}} bottomMenu={false}>
                <section>
                    <h2 className="sec-tit">{storeData?.brand}</h2>
                    {detailInfo && (
                        <>
                            <dl className="info-list">
                                <dt>상호명</dt>
                                <dd>{detailInfo.name}</dd>
                            </dl>
                            <dl className="info-list">
                                <dt>주소</dt>
                                <dd>
                                    {detailInfo.location} <br/>
                                    ({detailInfo.location2})
                                </dd>
                            </dl>
                            <dl className="info-list">
                                <dt>운영시간</dt>
                                <dd>{detailInfo.time}</dd>
                            </dl>
                            <dl className="info-list">
                                <dt>휴무일</dt>
                                <dd>{detailInfo.closed}</dd>
                            </dl>
                        </>
                    )}
                </section>
                {detailInfo?.introduce && (
                    <>
                        <hr className="divider"/>
                        <section>
                            <h2 className="sec-tit">가게소개</h2>
                            <p>{detailInfo.introduce}</p>
                        </section>
                    </>
                )}
            </Layout>
        </>
    )
}

export default StoreInfo;