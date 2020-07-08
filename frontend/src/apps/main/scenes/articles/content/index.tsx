import React, { useEffect } from "react";
import { Article } from "t9/types/fullstack";
import Markdown from "react-markdown";
import "./style";

import programer from "../../landing/header/icons/programmer.png";
import contact from "../../landing/header/icons/contact.png";
import support from "../../landing/header/icons/support.png";
import github from "../../landing/header/icons/github.png";

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

export const Content = (props: ContentInterface) => {
  useEffect(() => {
    props.fetchCurrentArticle();
    setTimeout(() => {
      window.FB && window.FB.XFBML.parse();
    }, 3000);
  }, []);
  const { currentArticle } = props;
  return (
    <div className="content">
      {currentArticle ? (
        <div>
          {/* Image */}
          {currentArticle.image && (
            <img
              className="hero-image"
              src={currentArticle.image}
              alt={currentArticle.title}
            />
          )}
          {/* Title */}
          <h2 className="title">{currentArticle.title}</h2>
          {/* Description */}
          <small className="description">{currentArticle.description}</small>
          <hr className="break" />
          {/* Content */}
          <Markdown className="content" source={currentArticle.content} />
          <hr className="break" />
          {/* Contact + Edit*/}
          <div className="actions">
            {socialMedia.map((item) => {
              return (
                <div key={item.id} className="item">
                  <img src={item.icon} alt={item.name} className="icon" />
                  <a href={item.href}>{item.name}</a>
                </div>
              );
            })}
          </div>
          {/* Comments */}
          <div
            className="fb-comments"
            data-href={location.origin + location.pathname}
            data-width="100%"
            data-numposts="5"
          />
        </div>
      ) : (
        "Loading Article..."
      )}
    </div>
  );
};

export interface ContentInterface {
  fetchCurrentArticle: () => void;
  currentArticle: Article | null;
}
