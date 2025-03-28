import Footercompo from "../../components/Footer/Footercompo";
import Testimonials from "../../components/testimonialsData/Testimonials";
import "./aboutus.css"; // Importing the CSS file

const AboutUs = () => {
  return (
   <div className="mianaboutcontainerr">
      <div className="aboutus-container">
      {/* Hero Section */}
      <div className="aboutus-hero">
        <h1>ABOUT US</h1>
      </div>

      {/* Text Section */}
      <div className="aboutus-content">
        <div className="aboutus-text">
          <h2>Welcome to Aashray Realty</h2>
          <p>
            AashrayRealty, founded in September 2017, is one of the leading
            real estate companies in Ahmedabad. We cater to all real estate
            needs, providing professionalized services to help customers choose
            properties without compromising on their criteria.
          </p>
          <p>
            Our goal is to make home buying & renting a **transparent, smooth,
            and stress-free** experience. Whether you are searching for a dream
            home or looking for the best real estate investment.
          </p>
          <p>
            At AashrayRealty, we are committed to **trust, integrity, and
            excellence.** Our team ensures that every client receives
            personalized service and data-driven insights to make the best
            property decisions.
          </p>
        </div>
      </div>

      {/* Responsibilities Section */}
      <div className="aboutus-responsibilities">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Years of experience in the real estate industry.</li>
          <li>Personalized consultation based on your needs.</li>
          <li>Access to verified properties with complete transparency.</li>
          <li>End-to-end assistance, from property selection to legal help.</li>
          <li>Customer satisfaction is our top priority.</li>
        </ul>
      </div>
      <Testimonials/>
    </div>
    <Footercompo/>
   </div>
  );
};

export default AboutUs;
