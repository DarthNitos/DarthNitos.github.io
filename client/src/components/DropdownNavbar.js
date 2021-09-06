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
  );
};
