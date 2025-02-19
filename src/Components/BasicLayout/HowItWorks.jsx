
import { FaUserPlus, FaTasks, FaCheckCircle, FaWallet } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-5xl text-primary" />,
      title: "Sign Up",
      description: "Create an account as a Buyer or a Worker to get started.",
    },
    {
      id: 2,
      icon: <FaTasks className="text-5xl text-secondary" />,
      title: "Post or Accept Tasks",
      description:
        "Buyers post tasks with details, and workers pick tasks to complete.",
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-5xl text-accent" />,
      title: "Complete & Submit",
      description:
        "Workers complete tasks and submit their work for buyer approval.",
    },
    {
      id: 4,
      icon: <FaWallet className="text-5xl text-success" />,
      title: "Get Paid",
      description:
        "Upon approval, workers receive payments securely in their wallets.",
    },
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-screen-2xl mx-auto text-center px-5">
        <h2 className="text-3xl font-bold  mb-6">How It Works</h2>
        <p className="  mb-14">
          Follow these simple steps to earn or get tasks done efficiently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="p-6 bg-base-100 shadow-lg rounded-xl flex flex-col items-center text-center transition-transform transform hover:scale-105"
            >
              {step.icon}
              <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
              <p className=" mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
