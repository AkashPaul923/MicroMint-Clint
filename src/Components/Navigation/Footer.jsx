import logo from "../../assets/image/logo1.png"


const Footer = () => {
    return (
        <footer className=" py-14 bg-base-200">
            <div className="max-w-screen-2xl mx-auto px-5">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div>
                        {/* <h2 className="text-2xl font-bold mb-4">MicroMint</h2> */}
                        <img src={logo} alt="MicroMint" className="w-[200px] mb-5" />
                        <p className="">
                            Your ultimate platform for completing tasks and
                            earning rewards. Empowering buyers and workers
                            worldwide.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="">About Us</a></li>
                            <li><a href="#" className="">How It Works</a></li>
                            <li><a href="#" className="">FAQs</a></li>
                            <li><a href="#" className=""> Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="">Privacy Policy</a></li>
                            <li><a href="#" className="">Terms of Service</a></li>
                            <li><a href="#" className="">Help Center</a></li>
                            <li><a href="#"  className="">Report a Problem</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Follow Us
                        </h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com/akash.paul.664216/?viewas=100000686899395"
                                target="_blank"
                                className="w-12"
                            >
                                <img src="https://img.icons8.com/?size=100&id=z657ovoGgS2o&format=png&color=000000" alt="" />
                            </a>
                            <a
                                href="https://github.com/AkashPaul923"
                                target="_blank"
                                className="w-12"
                            >
                                <img src="https://img.icons8.com/?size=100&id=efFfwotdkiU5&format=png&color=000000" alt="" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/akash-paul-y2002/"
                                target="_blank"
                                className="w-12"
                            >
                                <img src="https://img.icons8.com/?size=100&id=kBCrQMzpQDLQ&format=png&color=000000" alt="" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-neutral pt-6 text-center">
                    <p className="">
                        &copy; {new Date().getFullYear()} MicroMint. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
