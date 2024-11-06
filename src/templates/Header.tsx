import Select from "components/Select";
import Search from "components/Search";
import {Link, useNavigate} from "react-router-dom";
import Button from "components/Button";
import {MouseEvent, MouseEventHandler} from "react";

export interface HeaderProps{
    addClass?: string;
    select?: boolean;
    alarm?: boolean;
    cart?: boolean;
    like?: boolean;
    share?: boolean;
    back?: boolean;
    backOnClick?: () => void;
    title?: string;
    search?: boolean;
    searchOnClick?: MouseEventHandler<HTMLElement>;
}

function Header({addClass = '', select, alarm, cart, like, share, back, backOnClick, title, search, searchOnClick} : HeaderProps) {
    const navigate = useNavigate();
    const backBtnOnClick = () => {
        if(backOnClick){
            backOnClick();
        }else{
            navigate(-1);
        }
    };
    return (
        <header className={`header ${addClass}`}>
            {back && (
                <Button
                    onClick={backBtnOnClick}
                    addClass="btn-icon btn-back"
                    children={
                        <>
                            <span className="blind">뒤로 이동</span>
                            <i className="icon icon-back"></i>
                        </>
                    }
                />
            )}
            
            {select && (
                <Select
                    id="select-place"
                    title="장소 선택"
                    list={{"우리집":"home", "회사": "company"}}
                />
            )}
    
            {search && (
                <Search onClick={searchOnClick} />
            )}
    
            {title && (
                <h2 className="tit">{title}</h2>
            )}
    
            {(alarm || cart || like || share) && (
                <div className="util">
                    {alarm && (
                        <Button
                            // url="/"
                            addClass="btn-icon"
                            children={
                                <>
                                    <span className="blind">알림</span>
                                    <i className="icon icon-alarm"></i>
                                </>
                            }
                        />
                    )}
                    {like && (
                        <Button
                            addClass="btn-icon"
                            children={
                                <>
                                    <span className="blind">좋아요</span>
                                    <i className="icon icon-like"></i>
                                </>
                            }
                            // onClick={}
                        />
                    )}
                    {cart && (
                        <Button
                            tag="a"
                            url="/cart"
                            addClass="btn-icon"
                            children={
                                <>
                                    <span className="blind">장바구니</span>
                                    <i className="icon icon-cart"></i>
                                </>
                            }
                        />
                    )}
                    {share && (
                        <Button
                            addClass="btn-icon"
                            children={
                                <>
                                    <span className="blind">공유하기</span>
                                    <i className="icon icon-share"></i>
                                </>
                            }
                            // onClick={}
                        />
                    )}
                </div>
            )}
        </header>
    )
}

export default Header;