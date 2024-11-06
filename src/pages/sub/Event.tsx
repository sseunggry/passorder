import Layout from "templates/Layout";
import React from "react";
import {useEventListData} from "hooks/queries/useStoreQuery";
import {Link, useNavigate} from "react-router-dom";

function Event() {
    const {data: eventList, isLoading: eventListIsLoading, isError: eventListIsError} = useEventListData();
    const navigate = useNavigate();
    const onBackBtnClick = () => {
        navigate('/');
    }
    
    return (
        <Layout headerCon={{backOnClick: onBackBtnClick,back: true, title: '이벤트'}} addClass="event" bottomMenu={false}>
            <section>
                <ul className="event-list">
                    {eventList?.map((event, idx) => (
                        <li key={idx}>
                            <Link to={`${event.id}`}>
                                <div className="img-wrap">
                                    <img src={`${process.env.PUBLIC_URL}/resource/images/event/${event?.img}`} alt=""/>
                                </div>
                                <div className="txt-wrap">
                                    <h3 className="tit">{event.txt}</h3>
                                    <p className="period">{event.period}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export default Event;