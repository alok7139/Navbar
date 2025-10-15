import React from 'react';
import './KeyBenefits.css'; // Import CSS file

const benefits = [
  {
    icon: '/icons/rewards.png',
    title: 'Exclusive Rewards',
    desc: 'Earn reward points on every transaction and redeem easily.',
    link: '/rewards',
  },
  {
    icon: '/icons/security.png',
    title: 'Enhanced Security',
    desc: 'Enjoy secure transactions with advanced fraud protection.',
    link: '/security',
  },
  {
    icon: '/icons/global.png',
    title: 'Global Acceptance',
    desc: 'Use your card worldwide across millions of merchants.',
    link: '/global',
  },
  {
    icon: '/icons/approval.png',
    title: 'Instant Approval',
    desc: 'Get instant approval with our seamless online process.',
    link: '/apply',
  },
];

const KeyBenefits = () => {
  return (
    <section className="keybenefits-section">
      <div className="container">
        <h3 className="section-title">Key Benefits / Value Proposition</h3>

        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <div className="benefit-card" key={index}>
              <img src={item.icon} alt={item.title} className="benefit-icon" />
              <h5 className="benefit-title">{item.title}</h5>
              <p className="benefit-desc">{item.desc}</p>
              <a href={item.link} className="benefit-btn">
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
