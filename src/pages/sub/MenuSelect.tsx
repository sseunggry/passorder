import {useParams} from "react-router-dom";
import Layout from "templates/Layout";
import NoticeList from "../../templates/NoticeList";
import {useStoreData} from "../../hooks/queries/useStoreQuery";
import Loading from "../../components/Loading";
import Checkbox from "../../components/Checkbox";
import {numberComma} from "../../hooks/common";
import OptionList from "../../templates/OptionList";

function MenuSelect() {
    const {id, categoryId, productId} = useParams();
    const {data, isLoading, isError} = useStoreData(id ?? '');
    const productItem = data?.productList?.find(el => el.categoryId === categoryId)?.list.find(item => item.productId === productId);
    // console.log(productItem?.optionList);
    
    if(isLoading) return <Loading />
    
    return (
        <Layout headerCon={{back: true, cart: true}} pageBtn={{text: "주문하기"}} addClass="menu-select">
            {data && (
                <>
                    <div className="img-wrap">
                        <img src={`${process.env.PUBLIC_URL}/resource/images/sub/${id}/${productItem?.visualImg}`} alt=""/>
                    </div>
                    <div className="txt-wrap">
                        <h2 className="tit-m">{productItem?.name}</h2>
                        <p className="desc">{productItem?.desc}</p>
                    </div>
                    <OptionList
                        price={productItem?.price ?? 0}
                        optionList={productItem?.optionList}
                    />
                    <NoticeList
                        title={false}
                        addClass="line bg-gray"
                        list={["메뉴 사진은 연출된 이미지로 실제 음식과 다를 수 있습니다."]}
                    />
                </>
            )}
        </Layout>
    )
}

export default MenuSelect;