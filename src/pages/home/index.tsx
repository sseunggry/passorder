import { MouseEvent } from "react";
import {useEventListData, useStoreListData} from "hooks/queries/useStoreQuery";
import SwiperBanner from "templates/SwiperBanner";
import CardList from "templates/CardList";
import Search from "components/Search";
import Button from "components/Button";
import Loading from "components/Loading";
import Layout from "templates/Layout";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const {data: storeData, isLoading: storeDataIsLoading, isError: storeDataIsError} = useStoreListData();
    const {data: eventData, isLoading: eventDataIsLoading, isError: eventDataIsError} = useEventListData();
    const recentStoreList = storeData?.filter(el => el.recent);
    const nearbyStoreList = storeData?.filter(el => el.nearby);
    
    const searchOnClick = (e:MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate('/search');
    }
    
    return (
        <Layout addClass="bg-gray main" headerCon={{select:true, alarm:true, cart:true}}>
            {(storeDataIsLoading || eventDataIsLoading) ? <Loading /> : ''}
            <section>
                <Search addClass="bg-white" onClick={searchOnClick}/>
                <SwiperBanner
                    addClass="main-swiper"
                    option={{ pagination: {type: 'fraction'}, navigation: true }}
                    itemList={[
                        {desc: "누구나 참여할 수 있는", tit: "매일 2000원 커피 공짜로 먹는 꿀팁!", date: "06.14 - 06.30", img: "img_banner_01.jpg", link: "/event/1"},
                        {desc: "누구나", tit: "커피 공짜로 먹는 꿀팁!", date: "07.20 - 12.30", img: "img_banner_01.jpg", link: "/event/2"},
                    ]}
                />
            </section>

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
                    addClass="card-row"
                    itemList={recentStoreList}
                />
                {/*{storeDataIsLoading ? <Loading /> : (*/}
                {/*)}*/}
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
    
                <CardList
                    addClass="card-column"
                    itemList={nearbyStoreList}
                />
                {/*{storeDataIsLoading ? <Loading /> : (*/}
                {/*)}*/}
            </section>

            <section>
                <h2 className="sec-tit">
                    <p>마음을 선물해요</p>
                    <Button
                        tag="a"
                        url="/event"
                        text="전체보기"
                        addClass="small text"
                        children={<i className="icon icon-arrow right"></i>}
                    />
                </h2>
    
                <CardList
                    addClass="card-event"
                    eventList={eventData}
                />
                {/*{eventDataIsLoading ? <Loading /> : (*/}
                {/*)}*/}
            </section>
        </Layout>
    )
}

export default Home;