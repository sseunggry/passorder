import {useEventData} from "hooks/queries/useStoreQuery";
import Layout from "templates/Layout";
import Loading from "components/Loading";

interface DetailEventProps {
    id: string;
}

function DetailEvent({id}: DetailEventProps) {
    const {data: eventData, isLoading: eventDataIsLoading, isError: eventDataIsError} = useEventData(id);
    
    if(eventDataIsLoading) {
        return <Loading />
    }

    return (
        <Layout headerCon={{back: true, cart: true}} addClass="detail-event">
            {eventData?.txt}
        </Layout>
    )
}

export default DetailEvent;