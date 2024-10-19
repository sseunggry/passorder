import {useEventData, useStoreData} from "hooks/queries/useStoreQuery";
import Header from "templates/Header";
import BottomMenu from "templates/BottomMenu";
import SwiperBanner from "templates/SwiperBanner";
import CardList from "templates/CardList";
import Search from "components/Search";
import Button from "components/Button";
import Loading from "components/Loading";

function Home() {
    const {data: storeData, isLoading: storeDataIsLoading, isError: storeDataIsError} = useStoreData();
    const {data: eventData, isLoading: eventDataIsLoading, isError: eventDataIsError} = useEventData();
    const recentStoreList = storeData?.filter(el => el.recent);
    const nearbyStoreList = storeData?.filter(el => el.nearby);
    console.log(eventData);
    
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
    
                    {storeDataIsLoading ? <Loading /> : (
                        <CardList
                            addClass="card-row"
                            itemList={recentStoreList}
                        />
                    )}
                </section>
                
                <section>
                    <h2 className="sec-tit">
                        <p>현재 가까운 매장이에요</p>
                        <Button
                            tag="a"
                            url="/"
                            text="전체보기"
                            addClass="small text"
                            children={<i className="icon icon-arrow right"></i>}
                        />
                    </h2>
    
                    {storeDataIsLoading ? <Loading /> : (
                        <CardList
                            addClass="card-column"
                            itemList={nearbyStoreList}
                        />
                    )}
                </section>
                
                <section>
                    <h2 className="sec-tit">
                        <p>마음을 선물해요</p>
                        <Button
                            tag="a"
                            url="/"
                            text="전체보기"
                            addClass="small text"
                            children={<i className="icon icon-arrow right"></i>}
                        />
                    </h2>
    
                    {eventDataIsLoading ? <Loading /> : (
                        <CardList
                            addClass="card-event"
                            eventList={eventData}
                        />
                    )}
                </section>
            </div>
            
            <BottomMenu />
        </div>
    )
}

export default Home;