import React, { useState } from "react";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";

interface NavigationLink {
  id: number;
  name: string;
  to: string;
}

interface Props {
  navItems: NavigationLink[];
}

export const Navbar: React.FC<Props> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="Navbar">
      <Link className="brand" to="/">
        dzCode.io
      </Link>
      <div className="Navbar__burger" onClick={navToggle}>
        <div className="burger__button" />
      </div>
      <div className={`Navbar__list ${isOpen && "open"}`}>
        {navItems.map((navItem: NavigationLink) => {
          return (
            <NavLink
              className="navLink"
              activeClassName="Navbar__link--active"
              key={navItem.id}
              to={navItem.to}
            >
              {navItem.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
