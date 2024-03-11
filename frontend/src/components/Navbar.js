import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(true); // Change the initial state as per your requirement
  const history = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    localStorage.removeItem("token");
    // Update the state to reflect that the user is logged out
    setLoggedIn(false);
    // Redirect the user to the login page
    history("/login");
  };

  // Function to toggle dark/light mode
  const handleModeToggle = () => {
    const body = document.querySelector("body");
    const modeToggle = document.querySelector(".dark-light");

    modeToggle.classList.toggle("active");
    body.classList.toggle("dark");

    // js code to keep user selected mode even page refresh or file reopen
    if (!body.classList.contains("dark")) {
      localStorage.setItem("mode", "light-mode");
    } else {
      localStorage.setItem("mode", "dark-mode");
    }
  };

  // Function to toggle search box
  const handleSearchToggle = () => {
    const searchToggle = document.querySelector(".searchToggle");
    searchToggle.classList.toggle("active");
  };

  // Function to toggle sidebar
  const handleSidebarToggle = () => {
    const nav = document.querySelector("nav");
    nav.classList.add("active");
  };

  const handleBodyClick = (e) => {
    let clickedElm = e.target;

    const nav = document.querySelector("nav");
    if (
      !clickedElm.classList.contains("sidebarOpen") &&
      !clickedElm.classList.contains("menu")
    ) {
      nav.classList.remove("active");
    }
  };

  return (
    <>
      <nav>
        <div className="nav-bar">
          <i
            className="bx bx-menu sidebarOpen"
            onClick={handleSidebarToggle}
          ></i>
          <span className="logo navLogo">
            <a href="#">CodingLab</a>
          </span>

          <div className="menu">
            <div className="logo-toggle">
              <span className="logo">
                <a href="#">CodingLab</a>
              </span>
              <i className="bx bx-x siderbarClose"></i>
            </div>

            <ul className="nav-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a className=" " style={{display:"flex",cursor:"pointer"}}onClick={handleLogout}>
                  <li>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </li>
                  Logout
                </a>
              </li>
            </ul>
          </div>

          <div className="darkLight-searchBox">
            <div className="dark-light" onClick={handleModeToggle}>
              <i className="fa-regular fa-sun"></i>
            </div>

            <div className="searchBox">
              <div className="searchToggle" onClick={handleSearchToggle}>
                <i className="bx bx-x cancel"></i>
                <i className="bx bx-search search"></i>
              </div>

              <div className="search-field fa-brands fa-searchengin">
                <input type="text" placeholder="Search..." />
                <i class="fa-brands fa-searchengin"></i>
              </div>
              <ul className="nav-links"></ul>
            </div>
          </div>
        </div>
      </nav>
      <script>document.body.addEventListener("click", handleBodyClick);</script>
    </>
  );
};

export default Navbar;
