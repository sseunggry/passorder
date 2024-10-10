import Select from "components/Select";
import Search from "components/Search";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button";

type HeaderProps = {
    select?: boolean;
    alarm?: boolean;
    cart?: boolean;
    back?: boolean;
    title?: string;
    search?: boolean;
}

function Header({select, alarm, cart, back, title, search} : HeaderProps) {
    const navigate = useNavigate();
    return (
        <div className="header">
            {back && (
                <button type="button" className="btn-back" onClick={() => navigate(-1)}>
                    <span className="blind">뒤로 이동</span>
                </button>
            )}
            
            {select && (
                <Select
                    id="select-place"
                    title="장소 선택"
                    list={{"우리집":"home", "회사": "company"}}
                />
            )}
    
            {search && (
                <Search />
            )}
    
            {(alarm || cart) && (
                <div className="util">
                    {alarm && (
                        <>
                            <Button
                                url="/"
                                addClass="btn-icon alarm"
                                children={<span className="blind">알림</span>}
                            />
                            {/*<Link to="/" className="btn-icon alarm">*/}
                            {/*    <span className="blind">알림</span>*/}
                            {/*</Link>*/}
                        </>
                    )}
                    {cart && (
                        <Link to="/cart" className="btn-icon cart">
                            <span className="blind">장바구니</span>
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}

export default Header;