import {Link, useParams} from "react-router-dom";
import Layout from "templates/Layout";
import NoticeList from "templates/NoticeList";
import {useStoreData} from "hooks/queries/useStoreQuery";
import Loading from "components/Loading";
import OptionList from "templates/OptionList";
import {useDispatch, useSelector} from "react-redux";
import {selectorCount} from "reducer/counter";
import {InputOptionsTypeProps, selectorOptionList, selectorTotalPrice} from "reducer/optionSelect";
import {numberComma} from "hooks/common";
import {PRODUCT_SELECT, selectorProductInfo} from "../../reducer/productSelect";
import React, {useEffect} from "react";

function MenuSelect() {
    const {id, categoryId, productId} = useParams();
    const {data, isLoading, isError} = useStoreData(id ?? '');
    const productItem = data?.productList?.find(el => el.categoryId === categoryId)?.list.find(item => item.productId === productId);
    const count = useSelector(selectorCount);
    const optionList = useSelector(selectorOptionList);
    const totalPrice = useSelector(selectorTotalPrice);
    
    const dispatch = useDispatch();
    const onselectInfo = (url: string, name: string, thumbImg: string, price: number, totalPrice: number, count: number, optionList: InputOptionsTypeProps[]) => {
        dispatch({ type: PRODUCT_SELECT, url, name, thumbImg, price, totalPrice, count, optionList });
    }
    const selectProductInfo = useSelector(selectorProductInfo);
    // console.log(selectProductInfo);

    if(isLoading) return <Loading />;
    
    return (
        <Layout
            headerCon={{back: true, cart: true}}
            pageBtn={{
                text: `${numberComma(totalPrice)} 주문하기`,
                onClick: () => onselectInfo(
                    `store/${id}`,
                    productItem?.name ?? '',
                    productItem?.thumbImg ?? '',
                    productItem?.price ?? 0,
                    totalPrice,
                    count,
                    optionList
                )
            }}
            addClass="menu-select"
        >
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