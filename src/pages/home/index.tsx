import Header from "components/Header";
import BottomMenu from "components/BottomMenu";
import Search from "components/Search";

function Home() {
    return (
        <div className="wrap bg-gray">
            <Header select alarm cart />
    
            <div className="container">
                <Search />
            </div>
            
            <BottomMenu />
        </div>
    )
}

export default Home;