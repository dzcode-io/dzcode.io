import React from "react";

import "./style";
import programer from "./icons/programmer.png";
import contact from "./icons/contact.png";
import support from "./icons/support.png";
import github from "./icons/github.png";

import { Button } from "../../../../../components/button";

const socialMedia = [
  {
    id: 1,
    name: "dzcode",
    href: "https://github.com/dzcode-io/dzcode.io",
    icon: github,
  },
  { id: 2, name: "Learn", href: "/learn", icon: programer },
  { id: 3, name: "Contact", href: "/contact", icon: contact },
  { id: 4, name: "Support", href: "/support", icon: support },
];

export const Header = () => (
  <div className="header">
    <div className="shade" />
    <div className="text">
      <div className="title">Algerian Open Source Community</div>
      <div className="description">
        We make it easier to build better apps in Algeria for Algeria.
      </div>
    </div>

    <div className="actions">
      <Button text="Contribute" link="#" className="primary" />
      <Button text="Learn More" link="#" className="secondary" />
    </div>
    <div className="socialMedia">
      {socialMedia.map((item) => {
        return (
          <div key={item.id} className="item">
            <img src={item.icon} alt={item.name} className="icon" />
            <a href={item.href}>{item.name}</a>
          </div>
        );
      })}
    </div>
  </div>
);
