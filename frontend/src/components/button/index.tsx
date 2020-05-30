import React from "react";
import "./style.scss";

export interface ButtonProps {
  link: string;
  text: string;
  className: string;
}

export const Button: React.SFC<ButtonProps> = ({ className, link, text }) => {
  return (
    <a href={link} className={`btn-btn ${className}`}>
      {text}
    </a>
  );
};
