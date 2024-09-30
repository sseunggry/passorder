import "styles/component/search.scss";

type SearchProps = {
    bgColor?: string;
    placeholder?: string;
}

function Search({bgColor = '', placeholder} : SearchProps) {
    return (
        <form>
            <div className={`search-wrap ${bgColor}`}>
                <input type="text" placeholder={placeholder ? placeholder : "검색어를 입력해보세요."} />
                <button className="btn-icon delete">
                    <span className="blind">삭제</span>
                </button>
                <button type="submit" className="btn-icon search">
                    <span className="blind">검색</span>
                </button>
            </div>
        </form>
    )
}

export default Search;