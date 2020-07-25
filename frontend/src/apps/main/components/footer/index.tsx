import "./style.scss";
import React from "react";

type link = {
  href: string;
  text: string;
};

type category = {
  title: string;
  links: link[];
};

interface Props {
  data: category[];
}

export const Footer = ({ data }: Props) => {
  return (
    <>
      <footer className="footer-grid ">
        {data.map((category, i) => {
          return (
            <div className="footer-grid-item" key={i}>
              <h2>{category.title}</h2>
              {category.links.map((link, i) => {
                return (
                  <a className="footer-grid-link" href={link.href} key={i}>
                    {link.text}
                  </a>
                );
              })}
            </div>
          );
        })}
      </footer>
      <div className="copyright">
        dzCode.io an Algerian Open Source Community
      </div>
    </>
  );
};
