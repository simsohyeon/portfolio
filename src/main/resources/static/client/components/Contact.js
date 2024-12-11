import React from "react";
import "../styles/Contact.css";


const Contact = ({ data }) => {
  return (
    <section className="contact-section">
      <h2>Contact</h2>
      <p>{data}</p>
    </section>
  );
};

export default Contact;
