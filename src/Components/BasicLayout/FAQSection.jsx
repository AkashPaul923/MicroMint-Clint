const FAQSection = () => {
    const faqs = [
        {
            id: 1,
            question: "How can I start working on tasks at MicroMint?",
            answer: "Sign up as a worker, complete your profile, and browse tasks posted by buyers. Choose tasks that match your skills and start earning once you complete them successfully.",
        },
        {
            id: 2,
            question: "What kind of tasks can I expect to complete?",
            answer: "Tasks include a wide variety of options such as surveys, data entry, app testing, content moderation, social media engagement, and more.",
        },
        {
            id: 3,
            question: "How do I get paid for the tasks I complete?",
            answer: "After successfully completing a task and getting approval from the buyer, the payment will be credited to your account. You can withdraw your earnings through supported payment methods like PayPal, bank transfer, or digital wallets.",
        },
        {
            id: 4,
            question: "Can I work on multiple tasks at the same time?",
            answer: "Yes, you can work on multiple tasks simultaneously, as long as you can meet the deadlines and maintain quality standards for each task.",
        },
        {
            id: 5,
            question: "How do I post a task on MicroMint?",
            answer: "To post a task, sign up as a buyer, create a task with clear instructions, set a budget, and publish it. Workers will then complete your task, and you can approve their work to release payment.",
        },
        {
            id: 6,
            question: "What types of tasks can I post on MicroMint?",
            answer: "You can post tasks such as completing surveys, testing apps or websites, data entry, reviewing content, or engaging with your social media pages. Ensure the tasks comply with MicroMint's guidelines.",
        },
        {
            id: 7,
            question: "How is payment handled for tasks I post?",
            answer: "When you post a task, the payment is pre-authorized and held securely by MicroMint. Once you approve a worker’s submission, the payment is released to them. If there are issues, you can request revisions before approval.",
        },
    ];

    return (
        <div className="max-w-screen-2xl mx-auto px-5 my-20" id="FAQ">
            <h2 className="text-3xl text-center font-bold mb-14">FAQ</h2>
            <div className="space-y-3">
                {faqs.map((faq) => (
                    <div
                        key={faq.id}
                        className="collapse collapse-plus bg-base-200"
                    >
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            {faq.question}
                        </div>
                        <div className="collapse-content">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
