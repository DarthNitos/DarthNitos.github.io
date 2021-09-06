import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/main.css";

export const Navbar = () => {
  const [isShown, setIsShown] = useState(false);
  const menuBtnRef = useRef(null);
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();

    auth.logout();
    history.push("/");
  };

  useEffect(() => {
    if (isShown) return menuBtnRef.current.classList.add("close");

    return menuBtnRef.current.classList.remove("close");
  }, [isShown]);

  const setDisplay = {
    display: isShown ? "block" : "none",
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
