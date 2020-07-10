import React from "react";
import "./style.scss";

// Temp Data
const Data = [
  {
    title: "Category",
    links: [
      {
        href: "http://www.google.com",

        text: "click me",
      },
      {
        href: "http://www.google.com",

        text: "click me",
      },
      {
        href: "http://www.google.com",

        text: "click me",
      },
      {
        href: "http://www.google.com",

        text: "click me",
      },
    ],
  },
  {
    title: "Category",

    links: [
      {
        href: "http://www.google.com",

        text: "click me",
      },
      {
        href: "http://www.google.com",

        text: "click me",
      },
      {
        href: "http://www.google.com",

        text: "click me",
      },
      {
        href: "http://www.google.com",

        text: "click me",
      },
    ],
  },
  {
    title: "Category",

    links: [
      {
        href: "http://www.google.com",

        text: "click me",
      },
      {
        href: "http://www.google.com",

        text: "click me",
      },
      {
        href: "http://www.google.com",

        text: "click me",
      },
      {
        href: "http://www.google.com",
        text: "click me",
      },
    ],
  },
];

interface Props {}

export const Footer: React.FC<Props> = ({}) => {
  return (
    <footer className="footer-grid ">
      {Data.map((gridElemnt, i) => {
        return (
          <div className="footer-grid-item" key={i}>
            <h2>{gridElemnt.title}</h2>
            {gridElemnt.links.map((link, i) => {
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
  );
};
