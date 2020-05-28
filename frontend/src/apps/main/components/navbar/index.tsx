import React, { useState } from "react";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";

interface NavigationLink {
  id: number;
  name: string;
  to: string;
}

interface Props {
  navitems: NavigationLink[];
}

export const Navbar: React.FC<Props> = ({ navitems }) => {
  const [isOpen, setOpen] = useState("open");
  const navToggle = () => {
    isOpen === "" ? setOpen("open") : setOpen("");
  };

  return (
    <nav className="Navbar">
      <Link className="brand" to="/">
        Dzcode.io
      </Link>
      <div className="Navbar__burger" onClick={navToggle}>
        <div className="burger__button" />
      </div>
      <div className={`Navbar__list ${isOpen}`}>
        {navitems.map((navitem: NavigationLink) => {
          return (
            <NavLink
              className="navLink"
              activeClassName="Navbar__link--active"
              key={navitem.id}
              to={navitem.to}
            >
              {navitem.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
