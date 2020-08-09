import "./style.scss";
import { Link, NavLink } from "react-router-dom";
import React, { useState } from "react";

interface NavigationLink {
  id: number;
  name: string;
  to: string;
}

interface Props {
  navItems: NavigationLink[];
}

export const Navbar = ({ navItems }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
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
