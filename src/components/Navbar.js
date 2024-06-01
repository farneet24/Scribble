import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <div className="navbar-header">
          <button className="navbar-toggler" data-toggle="open-navbar1">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <a href="#">
            <h4>Awesome<span>logo</span></h4>
          </a>
        </div>

        <div className="navbar-menu" id="open-navbar1">
          <ul className="navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li className="navbar-dropdown">
              <a href="#" className="dropdown-toggler" data-dropdown="my-dropdown-id">
                Categories <i className="fa fa-angle-down"></i>
              </a>
              <ul className="dropdown" id="my-dropdown-id">
                <li><a href="#">Actions</a></li>
                <li><a href="#">Something else here</a></li>
                <li className="separator"></li>
                <li><a href="#">Seprated link</a></li>
                <li className="separator"></li>
                <li><a href="#">One more seprated link.</a></li>
              </ul>
            </li>
            <li className="navbar-dropdown">
              <a href="#" className="dropdown-toggler" data-dropdown="blog">
                Blog <i className="fa fa-angle-down"></i>
              </a>
              <ul className="dropdown" id="blog">
                <li><a href="#">Some category</a></li>
                <li><a href="#">Some another category</a></li>
                <li className="separator"></li>
                <li><a href="#">Seprated link</a></li>
                <li className="separator"></li>
                <li><a href="#">One more seprated link.</a></li>
              </ul>
            </li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Signin</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


