import Footercompo from "../Footer/Footercompo";
import "./Terms.css"; // Importing the CSS file

const Terms = () => {
  return (
    <div className="mainterm">
    <div className="terms-container">
      <h2 className="terms-heading">TERMS OF SERVICE</h2>
      <p className="terms-text">
        Any person logging onto or using the site <b>The Visitor</b> has unconditionally accepted the 
        terms and conditions of use. These constitute a binding and enforceable agreement between 
        the visitor and AashrayRealty.
      </p>

      <ol className="terms-list">
        <li>
          The information on this website is presented as general information. AashrayRealty makes 
          no representation or warranty regarding its accuracy, completeness, or correctness.
        </li>
        <li>
          Visitors are presumed to have read and understood these terms. Any relationship arising 
          from this website is governed by the laws and jurisdiction of Ahmedabad, India.
        </li>
        <li>
          AashrayRealty strives to provide accurate and up-to-date information but does not guarantee 
          error-free content. The website, its server, and third-party integrations may contain 
          technical issues, bugs, or viruses. AashrayRealty disclaims liability for any such occurrences.
        </li>
        <li>
          Property details, including images, prices, taxes, site plans, floor plans, amenities, 
          and descriptions, are for reference only and may be subject to change.
        </li>
        <li>
          By using the booking feature, visitors acknowledge that property bookings require a token 
          fee, which is non-refundable. Cancellations within 10 days will release the property for 
          booking again, but the token fee will not be returned.
        </li>
        <li>
          Payments on this website are securely processed via Razorpay. AashrayRealty does not store 
          any payment details. Any disputes must be taken up with the payment provider.
        </li>
        <li>
          AashrayRealty reserves the right to modify these Terms & Conditions at any time. Continued 
          use of the website implies acceptance of any changes.
        </li>
      </ol>
    </div>
    <Footercompo/>
    </div>
  );
};

export default Terms;
