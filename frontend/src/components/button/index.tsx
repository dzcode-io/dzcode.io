import "./style.scss";
import { LinkV2 } from "src/components/link-v2";
import React from "react";

interface ButtonProps {
  link: string;
  text: string;
  className: "primary" | "secondary";
}

export const Button = ({ className, link, text }: ButtonProps) => {
  return (
    <LinkV2 href={link} className={`btn-btn ${className}`}>
      {text}
    </LinkV2>
  );
};
