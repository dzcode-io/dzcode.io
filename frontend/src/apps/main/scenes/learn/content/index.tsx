import "./style";
import React, { useEffect } from "react";
import { Document } from "t9/types/fullstack";
import Markdown from "react-markdown";
import contact from "t9/apps/main/assets/png/contact.png";
import github from "t9/apps/main/assets/png/github.png";
import programer from "t9/apps/main/assets/png/programmer.png";
import support from "t9/apps/main/assets/png/support.png";

const socialMedia = [
  {
    id: 1,
    name: "dzcode",
    href: "https://github.com/dzcode-io/dzcode.io",
    icon: github,
  },
  { id: 2, name: "Learn", href: "/learn", icon: programer },
  { id: 3, name: "Contact", href: "/Contact-Us", icon: contact },
  { id: 4, name: "Support", href: "/support", icon: support },
];

export const Content = (props: ContentInterface) => {
  useEffect(() => {
    props.fetchCurrentDocument();
    setTimeout(() => {
      window.FB && window.FB.XFBML.parse();
    }, 3000);
  }, []);
  const { currentDocument } = props;
  return (
    <div className="content">
      {currentDocument ? (
        <div>
          {/* Image */}
          {currentDocument.image && (
            <img
              className="hero-image"
              src={currentDocument.image}
              alt={currentDocument.title}
            />
          )}
          {/* Title */}
          <h2 className="title">{currentDocument.title}</h2>
          {/* Description */}
          <small className="description">{currentDocument.description}</small>
          <hr className="break" />
          {/* Content */}
          <Markdown className="content" source={currentDocument.content} />
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
        "Loading Document..."
      )}
    </div>
  );
};

export interface ContentInterface {
  fetchCurrentDocument: () => void;
  currentDocument: Document | null;
}
