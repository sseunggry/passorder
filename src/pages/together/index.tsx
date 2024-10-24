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
        <Layout headerCon={{back: true, title: "같이주문 장바구니"}} bottomMenu={false} pageBtn={{text: "주문하기"}}>
            {data ? (
                <>
                    <h2 className="tit-m">{data.brand}</h2>
                </>
            ) : (
                <p>데이터를 불러오지 못했습니다.</p>
            )}
        </Layout>
    )
}

export default TogetherOrder;