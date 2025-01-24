import banner1 from "../../assets/image/banner1.webp"
import banner2 from "../../assets/image/banner2.webp"
import banner3 from "../../assets/image/banner3.webp"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/effect-fade';

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";

const Banner = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                effect={'fade'}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                // navigation={true}
                modules={[EffectFade,Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><Slide BgImg={banner1} title="Turn Minutes Into Money" subTitle="Complete simple tasks, earn real rewards, and unlock your potential. Start your journey to extra income today!"></Slide></SwiperSlide>
                <SwiperSlide><Slide BgImg={banner2} title="Your Gateway to Effortless Earnings" subTitle="Explore a world of micro-tasks designed to fit your schedule. Join thousands earning on their terms."></Slide></SwiperSlide>
                <SwiperSlide><Slide BgImg={banner3} title="Small Tasks, Big Rewards" subTitle="Get paid for doing what you love. Work from anywhere, anytime, and start earning with ease."></Slide></SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;
