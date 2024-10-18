import Header from "templates/Header";
import BottomMenu from "templates/BottomMenu";
import Search from "components/Search";
import SwiperBanner from "templates/SwiperBanner";
import Button from "components/Button";
import CardList from "templates/CardList";

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
                
                <section>
                    <h2 className="sec-tit">
                        <p>최근 주문한 매장이에요</p>
                        <Button
                            tag="a"
                            url="/"
                            text="전체보기"
                            addClass="small text"
                            children={<i className="icon icon-arrow right"></i>}
                        />
                    </h2>
                    
                    <CardList
                        addClass="row"
                        itemList={
                            [
                                { img: "logo_paris", tit: "파리바게트 수원역점", infoList: [{rating: 4.25, review: 87, distance: "50m"}] },
                                { img: "logo_tencent", tit: "텐센트 커피", infoList: [{rating: 3.25, review: 50, distance: "82m"}] },
                                { img: "logo_yogurt", tit: "요거트 아이스크림", infoList: [{rating: 4.5, review: 150, distance: "120m"}] },
                            ]
                        }
                    />
                </section>
            </div>
            
            <BottomMenu />
        </div>
    )
}

export default Home;