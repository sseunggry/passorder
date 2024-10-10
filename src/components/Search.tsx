import Input from "components/Input";

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
            <button type="button" className="btn-icon search">
                <span className="blind">검색</span>
            </button>
        </div>
    )
}

export default Search;