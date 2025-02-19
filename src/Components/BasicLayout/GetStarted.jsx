import React from "react";
import { FaUserPlus, FaTasks, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus className="text-5xl text-primary" />,
      title: "Create an Account",
      description: "Sign up as a Buyer or Worker to start using MicroMint.",
    },
    {
      id: 2,
      icon: <FaTasks className="text-5xl text-secondary" />,
      title: "Choose Your Role",
      description:
        "Buyers can post tasks, and workers can browse and complete them.",
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-5xl text-accent" />,
      title: "Start Earning or Hiring",
      description: "Workers complete tasks and get paid, while buyers get work done.",
    },
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-screen-2xl mx-auto text-center px-5">
        <h2 className="text-3xl font-bold  mb-6">Get Started in 3 Easy Steps</h2>
        <p className=" mb-14">
          Whether you're looking to earn or hire, getting started is quick and simple.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Call to Action Button */}
        <div className="mt-10">
          <Link to="/login" className="btn btn-accent text-lg px-8 py-3">
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
