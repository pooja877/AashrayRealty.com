import { FaWhatsapp, FaFacebook, FaCalculator, FaInstagram } from "react-icons/fa";
import "./SliderTab.css"; // CSS file ke liye

const SliderTab = () => {
  const whatsappNumber = "9054450605"; 
  return (
    <div className="taghomeslider sidebar">
       <a href={`https://wa.me/${whatsappNumber}`} className="tab" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp className="icon" />
        <span>WhatsApp</span>
      </a>
      <a href="https://www.facebook.com/iamsrk" className="tab" target="_blank" rel="noopener noreferrer">
        <FaFacebook className="icon" />
        <span>Facebook</span>
      </a>
      <a href="/CalculateEmi" className="tab">
        <FaCalculator className="icon" />
        <span>EMI Calculator</span>
      </a>
      <a href="https://www.instagram.com/iamsrk/" className="tab" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="icon" />
        <span>Instagram</span>
      </a>
   {/* https://www.instagram.com/aashrayrealty?igsh=eXphOTdnd3U5d3Vz */}
    </div>
  );
};

export default SliderTab;
