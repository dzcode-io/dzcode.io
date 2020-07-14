import React from "react";
import "./style.scss";
import { LinkV2 } from "src/components/link-v2";

interface ButtonProps {
  link: string;
  text: string;
  className: "primary" | "secondary";
}

export const Button: React.SFC<ButtonProps> = ({ className, link, text }) => {
  return (
    <LinkV2 to={link} className={`btn-btn ${className}`}>
      {text}
    </LinkV2>
  );
};
