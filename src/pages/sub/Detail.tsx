import {useLocation} from "react-router-dom";
import DetailStore from "./DetailStore";
import DetailEvent from "./DetailEvent";

function DetailPage() {
    const {pathname} = useLocation();
    const location = pathname.split('/').filter(el => el !== '');
    const category = location[0];
    const params = location[1];
    
    if(category === 'event'){
        return <DetailEvent id={params} />
    } else{
        return <DetailStore id={params} />
    }
}

export default DetailPage;