import './aboutus.scss';
const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>[Your System Name]</strong>
        </p>
      </div>
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To empower property managers, landlords, and tenants with cutting-edge
          technology that simplifies real estate operations, improves
          communication, and ensures transparency.
        </p>
      </section>
      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          To become the most trusted and user-friendly platform for real estate
          management worldwide, making property management stress-free for
          everyone.
        </p>
      </section>
      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li><strong>Efficiency:</strong> Automate repetitive tasks and manage properties in one place.</li>
          <li><strong>Transparency:</strong> Clear communication between stakeholders ensures smooth operations.</li>
          <li><strong>Innovation:</strong> Regular updates and features to keep up with the dynamic real estate industry.</li>
          <li><strong>Support:</strong> Dedicated customer support to help you every step of the way.</li>
        </ul>
      </section>
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded in [Year] by a team of real estate enthusiasts and tech
          experts, <strong>[AashrayRealty]</strong> was created to address
          the everyday challenges faced in property management.
        </p>
      </section>
      <section className="about-section">
        <h2>Who We Serve</h2>
        <ul>
          <li>Property Managers</li>
          <li>Landlords</li>
          <li>Tenants</li>
          <li>Real Estate Professionals</li>
        </ul>
      </section>
      <div className="about-cta">
        <h2>Get Started Today</h2>
        <p>
          Discover how <strong>[AashrayRealty]</strong> can simplify your
          real estate management. Join us in building a more efficient and
          connected future in real estate.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
