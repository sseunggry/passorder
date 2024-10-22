import Layout from "templates/Layout";
import Button from "components/Button";
import {useLocation} from "react-router-dom";
import {EventListDataPros, storeListDataPros, useEventData, useStoreData} from "../../hooks/queries/useStoreQuery";
import {useEffect, useState} from "react";

function StoreDetail() {
    const {pathname} = useLocation();
    const location = pathname.split('/').filter(el => el !== '');
    const category = location[0];
    const params = location[1];
    
    const {data: storeData, isLoading: storeDataIsLoading, isError: storeDataIsError} = useStoreData();
    const {data: eventData, isLoading: eventDataIsLoading, isError: eventDataIsError} = useEventData();
    
    const [data, setData] = useState<EventListDataPros[] | storeListDataPros[] | undefined>(storeData);
    
    useEffect(() => {
        if(category === 'event') setData(eventData);
        const dataIdx = data?.findIndex((item) => item.id === params);
        // console.log(data[dataIdx]);
        
    }, [params]);
    
    // console.log(storeData, eventData);
    return (
        <Layout headerCon={{back: true, cart: true}}>
            name
        </Layout>
    )
}

export default StoreDetail;