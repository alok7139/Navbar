import React from "react";
import "./Pages.css";

const About = () => {
  return (
    <div className="container py-5">
      <h2 className="page-heading text-center mb-4">About Credit Card Origination</h2>
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="/images/about-credit-card.jpg"
            alt="About Credit Card"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <p className="lead text-muted">
            Our Credit Card Origination platform simplifies and accelerates the credit card application process.
            With advanced automation and secure data verification, applicants can easily apply, get approved,
            and start using their cards faster than ever before.
          </p>
          <button className="btn btn-custom mt-3">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
