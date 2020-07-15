import React from "react";
import "./style.scss";
import ContactForm from "./Form";

const Contact = (props) => {
  return (
    <section className="contact">
      <div className="left">
        <h1>Contact Us</h1>
        <p>
          Ask a question, suggest new features in dzCode, send a sponsorship
          proposal or a simple thank you message, we love thous. We will get
          back to you as soon as possible. Usually we respond within the hour.
        </p>
        <ContactForm />
      </div>

      <header className="contact-info">
        <h1>Dzcode.io</h1>
        <h2>Dzcode, Algeria</h2>
        <a href="tel:+21367-626-1157">+213 06-76-26-11-57</a>
        <a href="mailto:contact@dzcode.io">contact@dzcode.io</a>
      </header>

      <div className="right"></div>
    </section>
  );
};

export default Contact;
