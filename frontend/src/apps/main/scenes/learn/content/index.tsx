import React, { useEffect } from "react";
import { Document } from "t9/types/fullstack";
import Markdown from "react-markdown";
import "./style";

export const Content = (props: ContentInterface) => {
  useEffect(() => {
    props.fetchCurrentDocument();
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
          {/* Contact + Edit*/}
          <div className="actions">Contact + Edit document</div>
          {/* Comments */}
          <div className="comments">Comments</div>
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
