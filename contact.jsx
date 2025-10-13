import React from "react";
import "./Pages.css";

const Contact = () => {
  return (
    <div className="container py-5">
      <h2 className="page-heading text-center mb-4">Contact Us</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="p-4 shadow rounded bg-light">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="Enter your name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="4" placeholder="Write your message"></textarea>
            </div>
            <button type="submit" className="btn btn-custom w-100">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
