const Slide = ({ title, subTitle, BgImg }) => {
    return (
        <div
            className="hero min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] w-full object-cover py-10 xl:py-[150px] px-10"
            style={{ backgroundImage: `url(${BgImg})` }}
        >
            <div className="bg-[#00000080] p-5 md:p-12 xl:p-20 backdrop-blur-sm ">
                <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-center text-white mb-5 md:mb-10">
                    {title}
                </h1>
                <p className="text-sm md:text-base lg:text-xl text-center text-white">
                    {subTitle}
                </p>
            </div>
        </div>
    );
};

export default Slide;
