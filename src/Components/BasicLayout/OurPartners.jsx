const OurPartners = () => {
    const partners = [
        {
            id: 1,
            name: "Bkash",
            logo: "https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg",
        },
        {
            id: 2,
            name: "PayPals",
            logo: "https://www.logo.wine/a/logo/PayPal/PayPal-Logo.wine.svg",
        },
        {
            id: 3,
            name: "Netflix",
            logo: "https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg",
        },
        {
            id: 4,
            name: "Reebook",
            logo: "https://www.logo.wine/a/logo/Reebok/Reebok-Logo.wine.svg",
        },
        {
            id: 5,
            name: "Suzuki",
            logo: "https://www.logo.wine/a/logo/Suzuki/Suzuki-Logo.wine.svg",
        },
        {
            id: 6,
            name: "Reddit",
            logo: "https://www.logo.wine/a/logo/Reddit/Reddit-Logo.wine.svg",
        },
        {
            id: 7,
            name: "Nagad",
            logo: "https://www.logo.wine/a/logo/Nagad/Nagad-Horizontal-Logo.wine.svg",
        },
        {
            id: 8,
            name: "reserve",
            logo: "https://www.logo.wine/a/logo/ReServe_Interactive/ReServe_Interactive-Logo.wine.svg",
        },
    ];

    return (
        <div className="bg-base-200">
            <div className="max-w-screen-2xl mx-auto px-5 py-20">
                <h2 className="text-center text-3xl font-bold mb-14">
                    Our Partners
                </h2>
                <div className="flex justify-center xl:justify-between items-center flex-wrap  gap-4">
                    {partners.map((partner) => (
                        <div className="bg-base-100 p-2 rounded-md gap-4 shadow-xl transition-transform transform hover:scale-105" key={partner.id}>
                            <img className="w-[80px] md:w-[120px]" src={partner.logo} alt={partner.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurPartners;
