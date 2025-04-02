import { FaWhatsapp, FaFacebook, FaCalculator, FaInstagram } from "react-icons/fa";
import "./SliderTab.css"; // CSS file ke liye

const SliderTab = () => {
  return (
    <div className="taghomeslider sidebar">
      <a href="#" className="tab">
        <FaWhatsapp className="icon" />
        <span>WhatsApp</span>
      </a>
      <a href="#" className="tab">
        <FaFacebook className="icon" />
        <span>Facebook</span>
      </a>
      <a href="/CalculateEmi" className="tab">
        <FaCalculator className="icon" />
        <span>EMI Calculator</span>
      </a>
      <a href="#" className="tab">
        <FaInstagram className="icon" />
        <span>Instagram</span>
      </a>
    </div>
  );
};

export default SliderTab;
