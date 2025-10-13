import React, { useState } from 'react';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  const handleLogin = () => {
    alert('Login button clicked!');
    setIsOpen(false);
  };

  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f8f9fa;
    }

    .navbar {
      background: white;
      padding: 0;
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-logo a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #333;
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
      transition: opacity 0.3s ease;
      cursor: pointer;
    }

    .navbar-logo a:hover {
      opacity: 0.8;
    }

    .logo-icon {
      font-size: 2rem;
    }

    .navbar-menu {
      display: flex;
      list-style: none;
      gap: 2rem;
      align-items: center;
    }

    .navbar-item {
      margin: 0;
    }

    .navbar-link {
      color: #333;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
      cursor: pointer;
      background: none;
      border: none;
      padding: 0;
      font-family: inherit;
    }

    .navbar-link:hover {
      color: #667eea;
    }

    .navbar-link::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background-color: #ffd700;
      transition: width 0.3s ease;
    }

    .navbar-link:hover::after {
      width: 100%;
    }

    .btn-login {
      padding: 0.6rem 1.5rem;
      background-color: #ffd700;
      color: #333;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .btn-login:hover {
      background-color: #ffed4e;
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }

    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 6px;
      background: none;
      border: none;
      padding: 0;
    }

    .hamburger span {
      width: 25px;
      height: 3px;
      background-color: #333;
      border-radius: 3px;
      transition: all 0.3s ease;
      display: block;
    }

    .hamburger span:nth-child(1).active {
      transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger span:nth-child(2).active {
      opacity: 0;
    }

    .hamburger span:nth-child(3).active {
      transform: rotate(-45deg) translate(7px, -7px);
    }

    @media (max-width: 768px) {
      .navbar-container {
        padding: 1rem 1.5rem;
      }

      .hamburger {
        display: flex;
      }

      .navbar-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        gap: 0;
        align-items: stretch;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }

      .navbar-menu.active {
        max-height: 300px;
        padding: 1rem 0;
      }

      .navbar-item {
        padding: 0.75rem 1.5rem;
        margin: 0;
      }

      .navbar-link {
        display: block;
        width: 100%;
        padding: 0.5rem 0;
      }

      .btn-login {
        width: 90%;
        margin: 0.5rem auto;
      }

      .navbar-logo a {
        font-size: 1.2rem;
      }

      .logo-icon {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .navbar-container {
        padding: 0.75rem 1rem;
      }

      .navbar-logo a {
        font-size: 1rem;
      }

      .logo-icon {
        font-size: 1.2rem;
      }

      .navbar-link {
        font-size: 0.9rem;
      }

      .btn-login {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      }
    }

    .page {
      display: none;
    }

    .page.active {
      display: block;
    }

    /* HOME PAGE */
    .home-hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 5rem 2rem;
      text-align: center;
    }

    .home-hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      animation: slideDown 0.8s ease;
    }

    .home-hero p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .cta-button {
      display: inline-block;
      padding: 0.8rem 2rem;
      background-color: #ffd700;
      color: #333;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      transition: all 0.3s ease;
      cursor: pointer;
      border: none;
      font-size: 1rem;
    }

    .cta-button:hover {
      background-color: #ffed4e;
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
    }

    .features {
      max-width: 1200px;
      margin: 4rem auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .feature-card p {
      color: #666;
      line-height: 1.6;
    }

    /* ABOUT PAGE */
    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .about-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .about-header h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .about-header p {
      font-size: 1.1rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }

    .about-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      margin-bottom: 3rem;
    }

    .about-text h2 {
      color: #667eea;
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .about-text p {
      color: #666;
      line-height: 1.8;
      margin-bottom: 1rem;
    }

    .about-image {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      height: 300px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 5rem;
    }

    .team-section {
      background: #f8f9fa;
      padding: 3rem 2rem;
      border-radius: 10px;
    }

    .team-section h2 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .team-member {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .team-member:hover {
      transform: translateY(-5px);
    }

    .team-avatar {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .team-member h3 {
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .team-member p {
      color: #999;
      font-size: 0.9rem;
    }

    /* CONTACT PAGE */
    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    .contact-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .contact-header h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
    }

    .contact-header p {
      font-size: 1.1rem;
      color: #666;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .info-box {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #667eea;
    }

    .info-box h3 {
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .info-box p {
      color: #666;
    }

    .contact-form {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .contact-form h3 {
      color: #333;
      margin-bottom: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      color: #333;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-family: inherit;
      font-size: 1rem;
      transition: border 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
    }

    .form-group textarea {
      resize: vertical;
      min-height: 120px;
    }

    .submit-btn {
      width: 100%;
      padding: 0.8rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.3s ease;
      font-size: 1rem;
    }

    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .social-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: #667eea;
      color: white;
      border-radius: 50%;
      text-decoration: none;
      transition: all 0.3s ease;
      font-size: 1.2rem;
    }

    .social-icon:hover {
      background-color: #764ba2;
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      .home-hero h1 {
        font-size: 2rem;
      }

      .features {
        grid-template-columns: 1fr;
      }

      .about-content {
        grid-template-columns: 1fr;
      }

      .contact-content {
        grid-template-columns: 1fr;
      }

      .about-header h1,
      .contact-header h1 {
        font-size: 2rem;
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a onClick={() => handleNavClick('home')}>
              <span className="logo-icon">🚀</span>
              <span>MyBrand</span>
            </a>
          </div>

          <button 
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <span className={isOpen ? 'active' : ''}></span>
            <span className={isOpen ? 'active' : ''}></span>
            <span className={isOpen ? 'active' : ''}></span>
          </button>

          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li className="navbar-item">
              <button 
                className="navbar-link"
                onClick={() => handleNavClick('home')}
              >
                Home
              </button>
            </li>
            <li className="navbar-item">
              <button 
                className="navbar-link"
                onClick={() => handleNavClick('about')}
              >
                About Us
              </button>
            </li>
            <li className="navbar-item">
              <button 
                className="navbar-link"
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </button>
            </li>
            <li className="navbar-item">
              <button className="btn-login" onClick={handleLogin}>
                Login
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* HOME PAGE */}
      <div className={`page ${currentPage === 'home' ? 'active' : ''}`}>
        <div className="home-hero">
          <h1>Welcome to MyBrand</h1>
          <p>Delivering excellence through innovation and creativity</p>
          <button className="cta-button" onClick={() => handleNavClick('contact')}>
            Get Started
          </button>
        </div>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Performance</h3>
            <p>Experience lightning-fast loading times and smooth interactions optimized for all devices.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Stunning visual design that captivates users and provides an exceptional user experience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive</h3>
            <p>Perfectly responsive design that looks great on smartphones, tablets, and desktops.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Built with security in mind to protect your data and privacy with industry-best practices.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Scalable</h3>
            <p>Easily scalable architecture that grows with your business needs and demands.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Support</h3>
            <p>24/7 customer support team ready to help you with any questions or issues.</p>
          </div>
        </div>
      </div>

      {/* ABOUT PAGE */}
      <div className={`page ${currentPage === 'about' ? 'active' : ''}`}>
        <div className="about-container">
          <div className="about-header">
            <h1>About MyBrand</h1>
            <p>Learn more about our company, mission, and the amazing team behind our success</p>
          </div>

          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>Founded in 2020, MyBrand started with a simple mission: to create innovative digital solutions that transform businesses and improve people's lives.</p>
              <p>Over the years, we've grown into a team of passionate professionals dedicated to delivering excellence in every project we undertake.</p>
              <p>Our commitment to quality, innovation, and customer satisfaction has made us a trusted partner for businesses worldwide.</p>
            </div>
            <div className="about-image">
              🌟
            </div>
          </div>

          <div className="team-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="team-avatar">👨‍💼</div>
                <h3>John Smith</h3>
                <p>CEO & Founder</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">👩‍💼</div>
                <h3>Sarah Johnson</h3>
                <p>CTO & Co-Founder</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">👨‍🎨</div>
                <h3>Mike Chen</h3>
                <p>Design Lead</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">👩‍💻</div>
                <h3>Emma Davis</h3>
                <p>Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT PAGE */}
      <div className={`page ${currentPage === 'contact' ? 'active' : ''}`}>
        <div className="contact-container">
          <div className="contact-header">
            <h1>Get In Touch</h1>
            <p>We'd love to hear from you. Send us a message!</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="info-box">
                <h3>📍 Address</h3>
                <p>123 Innovation Street<br />Tech City, TC 12345<br />United States</p>
              </div>
              <div className="info-box">
                <h3>📞 Phone</h3>
                <p>+1 (555) 123-4567<br />+1 (555) 987-6543</p>
              </div>
              <div className="info-box">
                <h3>✉️ Email</h3>
                <p>info@mybrand.com<br />support@mybrand.com</p>
              </div>
              <div className="info-box">
                <h3>🕒 Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
              </div>
            </div>

            <form className="contact-form">
              <h3>Send us a Message</h3>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Your message here..." required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
              
              <div className="social-links">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">𝕏</a>
                <a href="#" className="social-icon">📷</a>
                <a href="#" className="social-icon">in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;