import React from "react";
import "./style";

import articlePlaceholder from "t9/apps/main/assets/jpeg/project-placeholder.jpeg";
import { LinkV2 } from "src/components/link-v2";

const articles = [
  {
    image: articlePlaceholder,
    title: "Welcome to dzCode",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    slug: "Welcome_to_dzCode",
  },
  {
    image: articlePlaceholder,
    title: "Test Article",
    description:
      "Perspiciatis nisi molestias adipisci corporis ducimus, cupiditate officiis quod delectus aut.",
    slug: "Test_Article",
  },
  {
    image: articlePlaceholder,
    title: "Test Article",
    description:
      "Nesciunt at repellendus iste quasi magni quidem, non maiores accusantium voluptatibus.",
    slug: "Test_Article",
  },
];

export const TopArticles = () => (
  <section className="top-articles">
    <header>
      <h1 className="title">Read Community Articles</h1>
      <p className="sub-title">
        Read awesome articles, written by <strong>Algerian Developers</strong>
      </p>
    </header>
    <div className="articles">
      {articles.map((article, index) => (
        <div className="article" key={`article-${index}`}>
          <div
            className="image"
            style={{ backgroundImage: `url(${article.image})` }}
          />
          <div className="info">
            <div className="title">{article.title}</div>
            <div className="description">{article.description}</div>
          </div>
          <LinkV2
            className="btn btn__primary"
            id="buttons__1"
            to={`/Articles/${article.slug}`}
          >
            Read Article
          </LinkV2>
        </div>
      ))}
    </div>
    <LinkV2 className=" btn btn__secondary" id="buttons__2" to="/Articles">
      Explore More Articles
    </LinkV2>
  </section>
);
