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









import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Pages.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, message } = formData;

    if (!fullName || !email || !message) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/contact/save", formData);

      if (res.status === 200 || res.status === 201) {
        toast.success("Message sent successfully");
        setFormData({ fullName: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="page-heading text-center mb-4">Contact Us</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="p-4 shadow rounded bg-light" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                rows="4"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-custom w-100">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

