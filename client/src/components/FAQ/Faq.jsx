import { useState } from "react";
import "./Faq.css"; // Import CSS

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We provide real estate services including buying, renting, and property listing on our platform.",
  },
  {
    question: "How can I list my property on AashrayRealty?",
    answer: "You can list your property by signing up and filling out the 'Post Property' form with all required details and images.",
  },
  {
    question: "What is the booking process for a property?",
    answer: "To book a property, pay a token fee via Razorpay. The final transaction is completed offline.",
  },
  {
    question: "Can I cancel my property booking?",
    answer: "Yes. Cancellations within 10 days are eligible for a 50% refund. After 10 days, no refund is provided.",
  },
  {
    question: "Will I receive a confirmation after booking?",
    answer: "Yes. After completing the booking, you will receive a confirmation email and an in-website notification.",
  },
  {
    question: "How do I contact the admin for property inquiries?",
    answer: "You can email us at aashish.yadav@aashrayrealty.com or call us at +91 97235 16494.",
  },
  {
    question: "Are there any hidden fees?",
    answer: "No. All fees are mentioned upfront. We maintain complete transparency in pricing.",
  },
  {
    question: "How does the map feature work?",
    answer: "We use Leaflet maps to show property locations accurately. You can explore listings live on the map.",
  },
  {
    question: "Can I save properties I like?",
    answer: "Yes. You can add properties to your favorites and view them later from your profile.",
  },
  {
    question: "What happens if a booked property is canceled?",
    answer: "If canceled within 10 days, the property becomes available for booking again.",
  },
  {
    question: "How will I receive notifications for my property activities?",
    answer: "You will get real-time notifications on the website and via email for bookings, payments, and approvals.",
  },
  {
    question: "How can I edit or update my property details?",
    answer: "You can update your property details from your profile under the property listing section.",
  },
  {
    question: "How do I receive notifications about my property?",
    answer: "You will receive notifications via email and website for inquiries, bookings, rent reminders, and updates.",
  },
  // ✅ New Suggested Questions
  {
    question: "How do I know if my property is approved?",
    answer: "You will receive an approval email and a website notification once an admin approves your property.",
  },
  {
    question: "Can I delete my listed property?",
    answer: "Yes. You can remove your property from the platform anytime from your dashboard.",
  },
  {
    question: "What if I forget my password?",
    answer: "Click on 'Forgot Password' on the login page to reset your password via email.",
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
