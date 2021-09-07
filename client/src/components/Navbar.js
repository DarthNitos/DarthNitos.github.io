import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/main.css";

export const Navbar = () => {
  const [isShown, setIsShown] = useState(false);
  const menuBtnRef = useRef(null);
  const menuNav = useRef(null);
  const menuBranding = useRef(null);
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();

    auth.logout();
    history.push("/");
  };

  useEffect(() => {
    if (isShown) {
      menuBtnRef.current.classList.add("close");
      menuNav.current.classList.add("show");
      menuBranding.current.classList.add("show");

      return;
    }

    menuBtnRef.current.classList.remove("close");
    menuNav.current.classList.remove("show");
    menuBranding.current.classList.remove("show");
  }, [isShown]);

  const setDisplay = {
    display: isShown ? "block" : "none",
    visibility: isShown ? "visible" : "hidden",
  };

  return (
    <header>
      <nav className="navbar purple lighten-4">
        <div className="nav-wrapper">
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

      <div
        className="menu-btn"
        ref={menuBtnRef}
        onClick={() => setIsShown((prev) => !prev)}
      >
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </div>

      <nav className="menu" style={setDisplay}>
        <div className="menu-branding" ref={menuBranding}>
          <NavLink to="/" className="logo nav-link" />
        </div>
        <ul className="menu-nav" ref={menuNav}>
          <li className="nav-item current">
            <NavLink to="/create" className="nav-link">
              Create
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/links" className="nav-link">
              My Links
            </NavLink>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link" onClick={logoutHandler}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
