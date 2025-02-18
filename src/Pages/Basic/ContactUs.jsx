import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-base-200 p-6 text-center  flex justify-center items-center">
            <div className="max-w-screen-2xl mx-auto">
                <h1 className="text-4xl font-bold  mb-4">Contact Us</h1>
                <p className="text-lg mb-6">
                    Have any questions or need support? Feel free to reach out
                    to us.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="shadow-lg p-6 rounded-lg bg-base-100">
                        <div className="flex flex-col items-center">
                            <FaEnvelope className="text-5xl text-primary mb-3" />
                            <h2 className="text-xl font-semibold">Email Us</h2>
                            <p className="">support@micromint.com</p>
                        </div>
                    </div>
                    <div className="shadow-lg p-6 rounded-lg bg-base-100">
                        <div className="flex flex-col items-center">
                            <FaPhone className="text-5xl text-primary mb-3" />
                            <h2 className="text-xl font-semibold">Call Us</h2>
                            <p className="">+123 456 7890</p>
                        </div>
                    </div>
                    <div className="shadow-lg p-6 rounded-lg bg-base-100">
                        <div className="flex flex-col items-center">
                            <FaMapMarkerAlt className="text-5xl text-primary mb-3" />
                            <h2 className="text-xl font-semibold">Visit Us</h2>
                            <p className="">123 MicroMint Street, Tech City</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
