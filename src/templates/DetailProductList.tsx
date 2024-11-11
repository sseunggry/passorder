import Tab from "components/Tab";
import {Link} from "react-router-dom";
import {numberComma} from "hooks/common";
import {storeProductList} from "hooks/queries/useStoreQuery";

interface DetailProductListProps {
    id: string;
    productList: storeProductList[];
}

function DetailProductList({id, productList}: DetailProductListProps){
    const categories = productList.map(item => item.category);
    return (
        <div className="product-list">
            <Tab list={categories} addClass="full" />
            {productList.map((product, idx) => (
                <div className="product" key={idx}>
                    <h2 className="product-tit">{product.category}</h2>
                    <ul className="list">
                        {product.list.map((productItem, productItemIdx) => (
                            <li key={productItemIdx}>
                                <Link to={`/store/${id}/menu/${product.categoryId}/${productItem.productId}`}>
                                    <div className="txt-wrap">
                                        <h3 className="tit">{productItem.name}</h3>
                                        <p className="desc">{productItem.desc}</p>
                                        <p className="price">{numberComma(productItem.price)}원</p>
                                        {productItem.remainCount && ((productItem.remainCount > 2) ? (
                                            <span className="badge">{productItem.remainCount}개 남았어요</span>
                                        ) : (
                                            <span className="badge orange">곧 품절이에요</span>
                                        ))}
                                    </div>
                                    <div className="img-wrap">
                                        <img src={`${process.env.PUBLIC_URL}/resource/images/sub/${id}/${productItem.thumbImg}`} alt=""/>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default DetailProductList;