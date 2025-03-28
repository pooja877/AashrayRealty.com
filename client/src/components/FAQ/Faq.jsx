import { useState } from "react";
import "./Faq.css"; // Import CSS

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We provide real estate services including buying, and renting properties.",
  },
  // {   selling
  //   question: "How can I list my property on AashrayRealty?",
  //   answer: "You can list your property by signing up and filling out the 'Add Property' form with details and images.",
  // },
  {
    question: "What is the booking process for a property?",
    answer: "To book a property, you need to pay a token fee via Razorpay. The final transaction will be completed offline.",
  },
  {
    question: "Can I cancel my property booking?",
    answer: "Yes, cancellations are allowed within 10 days, but the token fee is non-refundable.",
  },
  {
    question: "Will I receive a confirmation after booking?",
    answer: "Yes, after completing the booking, you will receive a confirmation email with all the details.",
  },
  {
    question: "How do I contact the admin for property inquiries?",
    answer: "You can reach the admin via email at aashish.yadav@aashrayrealty.com or call us at +91 97235 16494.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, we maintain complete transparency in pricing. All fees are clearly mentioned upfront.",
  },
  {
    question: "How does the map feature work?",
    answer: "We use Leaflet maps to display property locations accurately. You can explore properties in real-time on our platform.",
  },
  {
    question: "Can I save properties I like?",
    answer: "Yes, you can add properties to your favorites list and view them later from your profile.",
  },
  {
    question: "What happens if a booked property is canceled?",
    answer: "If a booking is canceled within 10 days, the property becomes available for booking again.",
  },
  {
    question: "Will I receive a confirmation after booking?",
    answer: "Yes, after completing the booking, you will receive a confirmation email with all the details.",
  },
  {
    question: "How will I receive notifications for my property activities?",
    answer: "You will receive real-time notifications on the website and via email for property bookings, payments, and confirmations.",
  },
  // {
  //   question: "How can I edit or update my property details?",
  //   answer: "You can update property details from your account dashboard, except for images, which need to be uploaded separately.",
  // },
  // {
  //   question: "How do I receive notifications about my property?",
  //   answer: "You will receive notifications via email for inquiries, bookings, and important updates about your property.",
  // },
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
          <div key={index} className={`faq-item ${openIndex === index ? "active" : ""}`}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <i>{openIndex === index ? "▲" : "▼"}</i>
            </div>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
