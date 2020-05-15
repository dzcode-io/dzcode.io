import React from "react";
import "./style";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <div className="navbar">
    <div className="menu">
      <div className="item">
        <Link to="/">Logo</Link>
      </div>
      <div className="item">
        <Link to="/Learn">Learn</Link>
      </div>
      <div className="item">
        <Link to="/Learn/Getting_Started">Get Started</Link>
      </div>
      <div className="item">
        <Link to="/Learn/Git_Basics/Git_and_Github">Git and Github</Link>
      </div>
      <div className="item">
        <Link to="/Articles">Articles</Link>
      </div>
    </div>
  </div>
);
