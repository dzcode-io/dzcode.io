import "./style";
import { Button } from "src/components/button";
import { LinkV2 } from "src/components/link-v2";
import React from "react";
import contact from "t9/apps/main/assets/png/contact.png";
import github from "t9/apps/main/assets/png/github.png";
import programer from "t9/apps/main/assets/png/programmer.png";
import { Typography } from "@material-ui/core";

const socialMedia = [
  {
    name: "dzCode.io",
    to: "https://github.com/dzcode-io",
    icon: github,
  },
  { name: "Learn", to: "/Learn/Getting_Started", icon: programer },
  { name: "Contact", to: "/Contact-Us", icon: contact },
];

export const Header = () => (
  <div className="header">
    <div className="shade" />
    <div className="text">
      <Typography variant="h1" className="title">
        Algerian Open Source Community
      </Typography>
      <Typography variant="subtitle1" className="description">
        We make it easier to build better apps in Algeria for Algeria.
      </Typography>
    </div>

    <div className="actions">
      <Button text="Contribute" link="/Contribute" className="primary" />
      <Button text="Learn More" link="/About" className="secondary" />
    </div>
    <div className="socialMedia">
      {socialMedia.map((item, index) => {
        return (
          <div key={`header-link-${index}`} className="item">
            <img src={item.icon} alt={item.name} className="icon" />
            <LinkV2 href={item.to}>{item.name}</LinkV2>
          </div>
        );
      })}
    </div>
  </div>
);
