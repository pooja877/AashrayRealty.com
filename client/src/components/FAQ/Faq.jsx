import { useState } from "react";
import "./Faq.css"; // Import CSS

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We provide real estate services including  selling, and renting properties.",
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us via email at aashish.yadav@aashrayrealty.com or call us at +91 97235 16494",
  },
  {
    question: "Do you offer property tours?",
    answer: "Yes, we offer virtual and in-person property tours. Contact us to schedule a tour.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, we maintain complete transparency in pricing. All fees are clearly mentioned upfront.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqpage">
        <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "active" : ""}`}
        >
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <i>{openIndex === index ? "▲" : "▼"}</i>
          </div>
          <div className="faq-answer">{faq.answer}</div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Faq;
