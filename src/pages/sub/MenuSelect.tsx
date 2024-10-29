import {Link, useParams} from "react-router-dom";
import Layout from "templates/Layout";
import NoticeList from "templates/NoticeList";
import {useStoreData} from "hooks/queries/useStoreQuery";
import Loading from "components/Loading";
import OptionList from "templates/OptionList";
import {useDispatch, useSelector} from "react-redux";
import {InputOptionsTypeProps} from "reducer/optionSelect";
import {numberComma} from "hooks/common";
import {addToCart} from "../../reducer/cartList";
import React, {useEffect, useState} from "react";
import {selectorCount, selectorOptionList, selectorCartList, AppDispatch} from "../../reducer";

function MenuSelect() {
    const {id, categoryId, productId} = useParams();
    const {data, isLoading, isError} = useStoreData(id ?? '');
    const productItem = data?.productList?.find(el => el.categoryId === categoryId)?.list.find(item => item.productId === productId);
    const count = useSelector(selectorCount);
    const optionList = useSelector(selectorOptionList);
    
    const calcOptionsPrice = (array: InputOptionsTypeProps[]):number => {
        return array.reduce((acc, item) => {
            return acc + item.optionList.reduce((sum, option) => sum + option.price, 0);
        }, 0);
    };
    
    const [totalPrice, setTotalPrice] = useState<number>(productItem?.price ?? 0);
    useEffect(() => {
        setTotalPrice(((productItem?.price ?? 0) + calcOptionsPrice(optionList)) * count);
    }, [productItem?.price, count, optionList]);
    
    const dispatch = useDispatch<AppDispatch>();
    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: id ?? '',
                url: `store/${id}`,
                name: productItem?.name ?? '',
                img: productItem?.thumbImg ?? '',
                count,
                options: optionList,
                price: totalPrice
            })
        );
        
        
    };

    if(isLoading) return <Loading />;
    
    return (
        <Layout
            headerCon={{back: true, cart: true}}
            pageBtn={{
                text: `${numberComma(totalPrice)} 주문하기`,
                onClick: handleAddToCart
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