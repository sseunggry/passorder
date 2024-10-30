import {Link, useNavigate, useParams} from "react-router-dom";
import Layout from "templates/Layout";
import NoticeList from "templates/NoticeList";
import {useStoreData} from "hooks/queries/useStoreQuery";
import Loading from "components/Loading";
import OptionList from "templates/OptionList";
import {useDispatch, useSelector} from "react-redux";
import {checkOption, InputOptionsTypeProps, updateCount} from "reducer/optionSelect";
import {numberComma} from "hooks/common";
import {addToCart} from "../../reducer/cartList";
import React, {useEffect, useState} from "react";
import {selectorCartList, AppDispatch, RootState} from "../../reducer";

function MenuSelect() {
    const {id, categoryId, productId} = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const optionsState = useSelector((state:RootState) => state.optionSelect[`${id}_${categoryId}_${productId}`] || {options: [], count: 1});
    const { options, count } = optionsState;
    
    const {cartItems} = useSelector(selectorCartList);
    
    console.log(`${id}_${categoryId}_${productId}`, optionsState, options, count, "cartItems: ", cartItems);
    
    const navigate = useNavigate();
    const {data, isLoading, isError} = useStoreData(id ?? '');
    const productItem = data?.productList?.find(el => el.categoryId === categoryId)?.list.find(item => item.productId === productId);

    const calcOptionsPrice = (array: InputOptionsTypeProps[]):number => {
        return array.reduce((acc, item) => {
            return acc + item.optionList.reduce((sum, option) => sum + option.price, 0);
        }, 0);
    };
    
    const [totalPrice, setTotalPrice] = useState<number>(0);
    useEffect(() => {
        if(productItem?.price) {
            setTotalPrice(((productItem?.price) + calcOptionsPrice(options)) * count);
        }
    }, [categoryId, productId, productItem]);
    
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        setUrl(`/store/${id}`);
    }, [id]);
    
    const [cartProductId, setCartProductId] = useState<string>('');
    useEffect(() => {
        setCartProductId(`${id}_${categoryId}_${productId}`);
    }, [id, categoryId, productId]);
    
    const addToCartOnClick = () => {
        const cartData = {
            id: cartProductId,
            url,
            name: productItem?.name ?? '',
            img: productItem?.thumbImg ?? '',
            count,
            options,
            price: totalPrice
        }
        dispatch(addToCart(cartData));
        navigate(url);
    };

    if(isLoading) return <Loading />;
    
    return (
        <Layout
            headerCon={{back: true, cart: true}}
            pageBtn={{
                text: `${numberComma(totalPrice)} 주문하기`,
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
                        productId={`${id}_${categoryId}_${productId}`}
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