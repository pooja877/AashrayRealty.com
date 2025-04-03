import './Footercompo.css'
export default function Footercompo() {
  const whatsappNumber = "9054450605"; 
  return (
   <>
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="col-span-2">
            <div className="logo-container">
              <div className="logo-bg">
                <img src="/logo.jpeg" className='footlogo' alt="" />
              </div>
              <span className="site-name">AashrayRealty.COM</span>
            </div>
            <p className="description">
              Online real estate website to buy and rent residential and
              commercial properties. Trusted by millions of users every month.
            </p>
            <div className="social-icons">
              <a href={`https://wa.me/${whatsappNumber}`} className="social-icon">
              <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.facebook.com/iamsrk" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/iamsrk" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/iamsrk/" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/in/sundarpichai/" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">Company</h3>
            <ul className="footer-list">
              <li><a href="/About">About Us</a></li>
              <li><a href="/contactus">Contact Us</a></li>
              <li><a href="/news">News</a></li>
              <li><a href="/Terms">Terms & Conditions</a></li>
              <li><a href="/FAQ">FAQ</a></li>
              <li><a href="/Feedback">Feedback</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Our Services</h3>
            <ul className="footer-list">
              <li><a href="/properties?transactionType=Buy" >Buy Property</a></li>
              <li><a href="/properties?transactionType=Rent">Rent Property</a></li>
              <li><a href="/properties?propertyType=Residential">Residential Property</a></li>
              <li><a href="/properties?propertyType=Apartment/Flat">Apartment/Flats</a></li>
              <li><a href="/properties?propertyType=Commercial">Commercial Property</a></li>
              <li><a href="/CalculateEmi">EMI Calculator</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Popular Locations</h3>
            <ul className="footer-list">
              <li><a href="/properties?city=Ahmedabad">Ahmedabad</a></li>
              <li><a href="/properties?city=Gandhinagar">Gandhinagar</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 AashrayRealty.com. All rights reserved.</p>
        </div>
      </div>
    </footer>

</>
  )
}
