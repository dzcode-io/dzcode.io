import "./style.scss";
import { ContactForm } from "./form";
import React from "react";
import { connect } from "react-redux";

const Contact = () => {
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
    </section>
  );
};

export default connect()(Contact);
