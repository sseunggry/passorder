import {useEventData} from "hooks/queries/useStoreQuery";
import Layout from "templates/Layout";
import Loading from "components/Loading";
import React from "react";
import {useNavigate} from "react-router-dom";

interface DetailEventProps {
    id: string;
}

function DetailEvent({id}: DetailEventProps) {
    const {data: eventData, isLoading: eventDataIsLoading, isError: eventDataIsError} = useEventData(id);
    const navigate = useNavigate();
    const onPageBtnClick = () => {
        navigate('/event');
    };
    
    if(eventDataIsLoading) {
        return <Loading />
    }

    return (
        <Layout headerCon={{back: true}} addClass="event detail" pageBtn={{text: '목록', onClick: onPageBtnClick}}>
            <section>
                <div className="tit-wrap">
                    <h3 className="tit">{eventData?.txt}</h3>
                    <p className="period">{eventData?.period}</p>
                </div>
                <div className="img-wrap">
                    <img src={`${process.env.PUBLIC_URL}/resource/images/event/${eventData?.detailImg}`} alt=""/>
                </div>
            </section>
        </Layout>
    )
}

export default DetailEvent;