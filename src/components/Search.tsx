import Input from "components/Input";
import Button from "components/Button";
import {MouseEventHandler} from "react";

type SearchProps = {
    addClass?: string;
    placeholder?: string;
    onClick?: MouseEventHandler<HTMLElement>;
}

function Search({addClass = '', placeholder, onClick} : SearchProps) {
    return (
        <div className={`input-wrap search ${addClass}`} onClick={onClick}>
            <Input
                id="search"
                title="검색어 입력"
                placeholder={placeholder ? placeholder : "검색어를 입력해보세요"}
                children={
                    <Button
                        addClass="btn-icon"
                        children={
                            <>
                                <span className="blind">검색</span>
                                <i className="icon icon-search"></i>
                            </>
                        }
                    />
                }
            />
        </div>
    )
}

export default Search;