import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { FaCoins } from "react-icons/fa";

const TopWorker = () => {
    const axiosPublic = useAxiosPublic();
    const { data: topWorkers = [], isPending } = useQuery({
        queryKey: ["top worker"],
        queryFn: async () => {
            const res = await axiosPublic.get("/top-worker");
            return res.data;
        },
    });
    return (
        <div className="max-w-screen-2xl mx-auto px-5 my-20">
            <h2 className="text-center text-3xl font-bold mb-14">Top Worker</h2>
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
                        {topWorkers.map((worker) => (
                            <SwiperSlide key={worker._id}>
                                <div className="border bg-base-300">
                                    <div>
                                        <img className="aspect-square object-cover w-full" src={worker.photo} alt="" />
                                    </div>
                                    <div className="p-3">
                                        <p className="text-center text-xl font-bold">{worker.name}</p>
                                        <p className="text-center font-bold flex justify-center items-center gap-2"><FaCoins size={20} className="text-yellow-400" /> {worker.coin}</p>
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

export default TopWorker;
