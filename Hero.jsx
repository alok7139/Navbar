import React from 'react';
import './Hero.css'; // Import CSS file

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h2 className="hero-title">
          Unlock Your Potential with a <br /> Standard Chartered Credit Card
        </h2>
        <p className="hero-text">
          Discover a world of rewards, benefits, and financial flexibility.
        </p>
        <button className="hero-btn">Apply Online Today</button>
      </div>
    </section>
  );
};

export default HeroSection;
