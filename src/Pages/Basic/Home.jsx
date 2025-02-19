import Banner from "../../Components/BasicLayout/Banner";
import FAQSection from "../../Components/BasicLayout/FAQSection";
import HowItWorks from "../../Components/BasicLayout/HowItWorks";
import OurPartners from "../../Components/BasicLayout/OurPartners";
import Testimonial from "../../Components/BasicLayout/Testimonial";
import TopWorker from "../../Components/BasicLayout/TopWorker";
import WhyChooseUs from "../../Components/BasicLayout/WhyChooseUs";
import Footer from "../../Components/Navigation/Footer";


const Home = () => {
    return (
        <div>
            <div className="h-[70px]"></div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <TopWorker></TopWorker>
            <WhyChooseUs></WhyChooseUs>
            <FAQSection></FAQSection>
            <OurPartners></OurPartners>
            <Testimonial></Testimonial>
            <Footer></Footer>
        </div>
    );
};

export default Home;