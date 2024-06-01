import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import titleicon from "./titleicon.png";

export default function Navbar(props) {
  const location = useLocation();
  const [showNav, setShowNav] = useState(false);

  const toggleNavbar = () => {
    setShowNav(!showNav);
  };

  return (
    <nav
      className={`navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" title={props.title}>
          <img
            src={titleicon}
            alt="Logo"
            width="24"
            height="24"
            className="d-inline-block align-text-top mx-2"
          />
          {props.title}
        </Link>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${showNav ? "show" : ""}`}
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item space">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item space">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item space">
              <Link
                className={`nav-link ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="ms-auto">
            <li className="nav-item space">
              <div
                className={`form-check form-switch text-${
                  props.mode === "light" ? "dark" : "light"
                }`}
              >
                <input
                  className="form-check-input"
                  onClick={props.toggleMode}
                  type="checkbox"
                  id="toggleSwitch"
                  checked={props.mode === "dark"}
                />
                <label className="form-check-label" htmlFor="toggleSwitch">
                  {props.mode === "light"
                    ? "Enable Dark Mode"
                    : "Disable Dark Mode"}
                </label>
              </div>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Set title here",
  aboutText: "About",
};
