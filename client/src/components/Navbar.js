import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../index.css";

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();

    auth.logout();
    history.push("/");
  };

  return (
    <header>
      <nav className="navbar purple lighten-4">
        <div className="navbar nav-wrapper">
          <NavLink to="/">
            <span className="brand-logo">Linkio</span>
          </NavLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/create">Create</NavLink>
            </li>
            <li>
              <NavLink to="/links">My Links</NavLink>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="menu-btn">
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </div>

      <nav className="menu">
        <div className="menu-branding">
          <div className="logo">Linkio</div>
        </div>
        <ul className="menu-nav">
          <li className="nav-item">
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/links">My Links</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
