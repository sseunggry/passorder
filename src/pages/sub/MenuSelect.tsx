import {useNavigate, useParams} from "react-router-dom";
import Layout from "templates/Layout";
import NoticeList from "templates/NoticeList";
import {useStoreData} from "hooks/queries/useStoreQuery";
import Loading from "components/Loading";
import OptionList from "templates/OptionList";
import {useDispatch, useSelector} from "react-redux";
import {generateRandomId, numberComma} from "hooks/common";
import {addToCart} from "reducer/cartList";
import React, {useEffect, useState} from "react";
import {AppDispatch, RootState, selectorCount, selectorInfo} from "reducer";
import {OptionListProvider} from "../../context/OptionListContext";
import {setOptionList} from "../../reducer/optionList";

function MenuSelect() {
    const {id, categoryId, productId} = useParams();
    const navigate = useNavigate();
    const {data, isLoading, isError} = useStoreData(id ?? '');
    const productItem = data?.productList?.find(el => el.categoryId === categoryId)?.list.find(item => item.productId === productId);
    
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        setUrl(`/store/${id}`);
    }, [id]);
    
    const [cartId, setCartId] = useState<string>('');
    useEffect(() => {
        setCartId(generateRandomId(`${id}_${categoryId}_${productId}`));
    }, [id, categoryId, productId]);
    
    const dispatch = useDispatch<AppDispatch>();
    const count = useSelector((state: RootState) => selectorCount(state, cartId ?? ''));
    const { options, optionPrice } = useSelector((state:RootState) => selectorInfo(state, cartId ?? ''));
    
    const [totalPrice, setTotalPrice] = useState<number>(0);
    useEffect(() => {
        setTotalPrice(((productItem?.price ?? 0) + optionPrice) * count );
    }, [count, optionPrice]);
    
    const addToCartOnClick = () => {
        const cartData = {
            id: cartId,
            url,
            name: productItem?.name ?? '',
            img: productItem?.thumbImg ?? '',
            count,
            options,
            optionPrice,
            price: productItem?.price ?? 0,
        }
        dispatch(addToCart(cartData, url, data?.brand ?? ''));
        dispatch(setOptionList(id ?? '', productItem?.optionList ?? []))
        navigate(url);
    };

    if(isLoading) return <Loading />;
    
    return (
        <Layout
            headerCon={{back: true, cart: true}}
            pageBtn={{
                text: `${numberComma(totalPrice)} 주문하기`,
                // text: '주문하기',
                onClick: addToCartOnClick
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
                        id={cartId}
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