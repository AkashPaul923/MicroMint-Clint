import Banner from "../../Components/BasicLayout/Banner";
import FAQSection from "../../Components/BasicLayout/FAQSection";
import OurPartners from "../../Components/BasicLayout/OurPartners";
import Testimonial from "../../Components/BasicLayout/Testimonial";
import TopWorker from "../../Components/BasicLayout/TopWorker";
import WhyChooseUs from "../../Components/BasicLayout/WhyChooseUs";
import Footer from "../../Components/Navigation/Footer";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
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