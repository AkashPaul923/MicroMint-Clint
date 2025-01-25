import Banner from "../../Components/BasicLayout/Banner";
import FAQSection from "../../Components/BasicLayout/FAQSection";
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
            <Footer></Footer>
        </div>
    );
};

export default Home;