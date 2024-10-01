import Header from "components/Header";
import BottomMenu from "components/BottomMenu";
import Search from "components/Search";
import SwiperBanner from "../../components/SwiperBanner";

function Home() {
    return (
        <div className="wrap bg-gray">
            <Header select alarm cart />
    
            <div className="container">
                <Search />
                <SwiperBanner
                    addClass="main-swiper"
                    option={{ pagination: {type: 'fraction'}, navigation: true }}
                    itemList={[
                        {desc: "누구나 참여할 수 있는", tit: "매일 2000원 커피 공짜로 먹는 꿀팁!", date: "06.14 - 06.30", img: "img_banner_01.jpg"},
                        {desc: "누구나", tit: "커피 공짜로 먹는 꿀팁!", date: "07.20 - 12.30", img: "img_banner_01.jpg"},
                    ]}
                />
            </div>
            
            <BottomMenu />
        </div>
    )
}

export default Home;