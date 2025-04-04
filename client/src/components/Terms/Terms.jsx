import Footercompo from "../Footer/Footercompo";
import "./Terms.css"; // Importing the CSS file

const Terms = () => {
  return (
    <div className="mainterm">
      <div className="terms-container">
        <h2 className="terms-heading">TERMS OF SERVICE</h2>
        <p className="terms-text">
          Any person logging onto or using the site (<b>The Visitor</b>) has unconditionally accepted
          the terms and conditions of use. These constitute a binding and enforceable agreement
          between the visitor and <b>AashrayRealty</b>.
        </p>

        <ol className="terms-list">
          <li>
            The information on this website is presented as general information.
            <b> AashrayRealty</b> makes no representation or warranty regarding its accuracy, completeness,
            or correctness.
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
            Property details, including images, prices, floor plans, amenities,
            and descriptions, are for reference only and may be subject to change without prior notice.
          </li>

          <li>
  By using the booking feature, visitors acknowledge that property bookings require a
  <b> token fee</b>. If the booking is cancelled within <b>10 days</b>, a <b>50% refund</b> will be issued.
  After 10 days, no refund will be provided. Bookings expire automatically after <b>15 days</b> if
  the property is not visited, and the property will be made available for others.
</li>


          <li>
            Payments on this website are securely processed via <b>Razorpay</b>. AashrayRealty does not
            store any payment information. Any disputes or chargebacks must be taken up directly with
            the payment provider.
          </li>

          <li>
            AashrayRealty reserves the right to modify these Terms & Conditions at any time. Continued
            use of the website implies acceptance of the updated terms.
          </li>

          <li>
            <b>Privacy:</b> AashrayRealty values your privacy. All data collected via the website is
            used only for internal purposes and is not sold or shared with third parties except as
            required by law.
          </li>

          <li>
            <b>User Obligations:</b> Users agree not to misuse the site, attempt to gain unauthorized access,
            or engage in any activity that may harm the site’s functionality or reputation.
          </li>

          <li>
            <b>Third-party Links:</b> The site may include links to third-party websites. AashrayRealty is
            not responsible for the content or practices of those sites.
          </li>

          <li>
            <b>Intellectual Property:</b> All logos, content, images, and material on this site are
            property of AashrayRealty. Reproduction or use without permission is prohibited.
          </li>
        </ol>
      </div>

      <Footercompo />
    </div>
  );
};

export default Terms;
