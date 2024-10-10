import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "styles/component/swiper.scss";

interface optionProps {
    navigation?: boolean;
    pagination?: {};
    scrollbar?: {};
}
interface itemProps {
    tit: string;
    desc: string;
    date: string;
    img: string;
}
interface bannerProps {
    addClass?: string;
    option?: optionProps;
    itemList: Array<itemProps>;
}

function SwiperBanner({addClass, option, itemList} : bannerProps) {
    const pagination = option?.pagination ? option?.pagination : {};
    const navigation = option?.navigation ? option?.navigation : false;
    
    return (
        <Swiper
            modules={[Pagination, Navigation]}
            pagination={pagination}
            navigation={navigation}
            className={addClass ? addClass : ''}
        >
            {itemList.map(({img, tit, desc, date}, idx) => (
                <SwiperSlide key={idx}>
                    <div className="txt-wrap">
                        <span className="desc">{desc}</span>
                        <strong className="tit">{tit}</strong>
                        <span className="date">{date}</span>
                    </div>
                    <div className="img-wrap">
                        <img src={`${process.env.PUBLIC_URL}/resource/images/main/banner/${img}`} alt=""/>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperBanner;