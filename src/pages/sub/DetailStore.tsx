import {useStoreData} from "hooks/queries/useStoreQuery";
import Layout from "templates/Layout";
import Loading from "components/Loading";
import NoticeList from "templates/NoticeList";
import DetailStoreInfo from "templates/DetailStoreInfo";
import DetailProductList from "templates/DetailProductList";

interface DetailStoreProps {
    id: string;
}

function DetailStore({id}: DetailStoreProps) {
    const {data: storeData, isLoading: storeDataIsLoading, isError: storeDataIsError} = useStoreData(id);
    
    if(storeDataIsLoading) {
        return <Loading />
    }

    return (
        <Layout headerCon={{back: true, cart: true}} addClass="detail-store" bottomMenu={false}>
            {storeData && (
                <>
                    <DetailStoreInfo data={storeData} />
                    <hr className="divider"/>
                    {/*<DetailProductList data={storeData}/>*/}
                    {(storeData.id && storeData.productList) && <DetailProductList id={storeData.id} productList={storeData.productList}/>}
                    <NoticeList
                        list={
                            [
                                "사진은 실제 음식과 다를 수 있습니다",
                                "메뉴 및 가격은 업소에서 제공한 정보를 기준으로 작성되었으며 변동될 수 있습니다.",
                                "패스오더는 통신판매중개자로 거래 당사자가 아니므로, 판매자가 등록한 상품정보 및 거래 등에 대해 책임을 지지 않습니다."
                            ]
                        }
                    />
                </>
            )}
        </Layout>
    )
}

export default DetailStore;