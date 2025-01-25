import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";


const Testimonial = () => {
    const axiosPublic = useAxiosPublic();
    const { data: reviews = [], isPending } = useQuery({
        queryKey: ["top-reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get("/top-reviews");
            return res.data;
        },
    });
    return (
        <div className="max-w-screen-2xl mx-auto px-5 my-20">
            <h2 className="text-center text-3xl font-bold mb-14">Testimonial</h2>
            {isPending ? (
                <div className="flex justify-center my-[200px]">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            ) : (
                <div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        // pagination={{
                        //     clickable: true,
                        // }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        breakpoints={{
                            500: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide key={review._id}>
                                <div className="border bg-base-300">
                                    <div>
                                        <div>
                                            <img src={review.photo} alt="" />
                                        </div>
                                        <div>
                                            <p>{review.name}</p>
                                            <p>{review.date}</p>
                                        </div>
                                    </div>
                                    <p>{review.comment}</p>
                                    <div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};

export default Testimonial;
