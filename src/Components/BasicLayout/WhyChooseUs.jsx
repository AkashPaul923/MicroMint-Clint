// import { Award, ShieldCheck, Clock, Globe } from "lucide-react";

import { FaAward, FaClock, FaGlobe } from "react-icons/fa";

const WhyChooseUs = () => {
    const features = [
        {
            id: 1,
            icon: "https://img.icons8.com/?size=100&id=104236&format=png&color=000000",
            title: "Trusted Platform",
            subtitle:
                "Thousands of users trust MicroMint for secure and reliable earnings.",
        },
        {
            id: 2,
            icon: "https://img.icons8.com/?size=100&id=9BO8KPzyjld9&format=png&color=000000",
            title: "Secure Payments",
            subtitle:
                "Your payments are safe and processed instantly upon approval.",
        },
        {
            id: 3,
            icon: "https://img.icons8.com/?size=100&id=rKEYSosGdrkP&format=png&color=000000",
            title: "Flexible Tasks",
            subtitle:
                "Work on your schedule with tasks tailored to your preferences.",
        },
        {
            id: 4,
            icon: "https://img.icons8.com/?size=100&id=lp0NRHvUpHjn&format=png&color=000000",
            title: "Global Access",
            subtitle:
                "Join from anywhere in the world and start earning today.",
        },
    ];

    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-screen-2xl mx-auto text-center px-5">
                <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
                <p className=" mb-14">
                    Discover why MicroMint is the go-to platform for task buyers
                    and workers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="bg-base-100 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
                        >
                            <img src={feature.icon} alt="" />
                            <h3 className="text-xl font-semibold mt-4">
                                {feature.title}
                            </h3>
                            <p className=" mt-2">
                                {feature.subtitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
