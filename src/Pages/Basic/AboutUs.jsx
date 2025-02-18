import { FaUsers, FaTasks, FaDollarSign } from "react-icons/fa";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-base-200 p-6 text-center flex justify-center items-center">
            <div className="max-w-screen-2xl mx-auto">
                <h1 className="text-4xl font-bold">About MicroMint</h1>
                <p className="text-lg  my-8">
                    MicroMint is a leading micro-tasking platform where users
                    can earn money by completing simple tasks. We connect
                    businesses with skilled workers who can complete tasks
                    efficiently, ensuring a win-win scenario for all.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="shadow-lg p-6 rounded-lg bg-base-100">
                        <div className="flex flex-col items-center">
                            <FaUsers className="text-5xl text-primary mb-3" />
                            <h2 className="text-xl font-semibold">
                                Community Driven
                            </h2>
                            <p className="">
                                We empower a global community of taskers and
                                businesses.
                            </p>
                        </div>
                    </div>
                    <div className="shadow-lg p-6 rounded-lg bg-base-100">
                        <div className="flex flex-col items-center">
                            <FaTasks className="text-5xl text-primary mb-3" />
                            <h2 className="text-xl font-semibold">
                                Task Variety
                            </h2>
                            <p className="">
                                Choose from a wide range of micro-tasks that
                                suit your skills.
                            </p>
                        </div>
                    </div>
                    <div className="shadow-lg p-6 rounded-lg bg-base-100">
                        <div className="flex flex-col items-center">
                            <FaDollarSign className="text-5xl text-primary mb-3" />
                            <h2 className="text-xl font-semibold">
                                Earn Money
                            </h2>
                            <p className="">
                                Complete tasks and get rewarded instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
