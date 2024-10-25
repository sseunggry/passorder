import {useParams} from "react-router-dom";
import {useStoreData} from "hooks/queries/useStoreQuery";
import Layout from "templates/Layout";
import Loading from "components/Loading";

function TogetherOrder(){
    const {id} = useParams();
    const {data, isLoading, isError} = useStoreData(id ?? '');
    
    if(isLoading) {
        return <Loading />
    }
    return (
        <Layout headerCon={{back: true, title: "같이주문 장바구니"}} bottomMenu={false} pageBtn={{text: "주문하기"}} addClass="together-order">
            {data ? (
                <>
                    <h2 className="tit-m">{data.brand}</h2>
                    <div className="info-wrap">
                        <div className="tit-wrap">
                            <p className="tit">나의 메뉴</p>
                            <span className="badge">결제 담당</span>
                        </div>
                        <div className="card-list line">

                        </div>
                    </div>
                    <div className="info-wrap">
                        <div className="tit-wrap">
                            <p className="tit">맴버 메뉴</p>
                            <span className="badge">결제 담당</span>
                        </div>
                        <div className="card-list line">

                        </div>
                    </div>
                </>
            ) : (
                <p>데이터를 불러오지 못했습니다.</p>
            )}
        </Layout>
    )
}

export default TogetherOrder;