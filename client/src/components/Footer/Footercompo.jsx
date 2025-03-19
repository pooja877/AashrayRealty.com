import './Footercompo.css'
export default function Footercompo() {
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
              India s online real estate website to buy and rent residential and
              commercial properties. Trusted by millions of users every month.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">Company</h3>
            <ul className="footer-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Our Services</h3>
            <ul className="footer-list">
              <li><a href="#">Buy Property</a></li>
              <li><a href="#">Rent Property</a></li>
              <li><a href="#">Residential Property</a></li>
              <li><a href="#">Apartment/Flats</a></li>
              <li><a href="#">Commercial Property</a></li>
              <li><a href="#">Home Loans</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Popular Locations</h3>
            <ul className="footer-list">
              <li><a href="#">Ahmedabad</a></li>
              <li><a href="#">Gandhinagar</a></li>
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
