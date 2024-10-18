import Input from "components/Input";
import Button from "components/Button";

type SearchProps = {
    addClass?: string;
    placeholder?: string;
}

function Search({addClass = '', placeholder} : SearchProps) {
    return (
        <div className={`input-wrap search ${addClass}`}>
            <Input
                id="search"
                title="검색어 입력"
                placeholder={placeholder ? placeholder : "검색어를 입력해보세요"}
            />
            <Button
                addClass="btn-icon"
                children={
                    <>
                        <span className="blind">검색</span>
                        <i className="icon icon-search"></i>
                    </>
                }
            />
        </div>
    )
}

export default Search;