import React, { useState, Fragment, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CheckUser from "../pages/CheckUser";
import "./Navbar.css"; // Import the CSS file
import UserLogoIcon from "./UserLogoIcon";

const Navbar = ({ userName }) => {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    window.location.href = "/Home";
  };

  const token = sessionStorage["token"];
  let role;
  if (token !== undefined) {
    role = CheckUser(token);
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top"
      style={{ position: "fixed", top: 0, right: 0, left: 0 }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center"
            activeClassName="font-weight-bold"
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#f0f0f0",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                marginRight: "1rem",
              }}
            >
              <img
                src="https://i.pinimg.com/originals/ee/e2/a3/eee2a3cd2784a139b0ddb9ecb4dbef63.png"
                alt="logo"
                height={50}
                width={50}
              />
            </div>
            <span className="font-weight-bold fs-4 text-light">VinTimes</span>
          </NavLink>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          style={{ display: "flex", justifyContent: "center", flex: 1 }}
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink
                to="/Home"
                className="nav-link text-light px-4 py-2"
                activeClassName="font-weight-bold"
                style={{ borderRadius: "20px" }}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/product"
                className="nav-link text-light px-4 py-2"
                activeClassName="font-weight-bold"
                style={{ borderRadius: "20px" }}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link text-light px-4 py-2"
                activeClassName="font-weight-bold"
                style={{ borderRadius: "20px" }}
              >
                About
              </NavLink>
            </li>
            {token && (
              <li className="nav-item">
                <NavLink
                  to="/displayorder"
                  className="nav-link text-light px-4 py-2"
                  activeClassName="font-weight-bold"
                  style={{ borderRadius: "20px" }}
                >
                  Your Orders
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {token ? (
            <>
              <NavLink
                to="/cart"
                className="btn btn-outline-light mx-2"
                style={{ borderRadius: "20px", padding: "0.5rem 1rem" }}
              >
                <i className="fa fa-cart-shopping mr-1"></i> Cart
              </NavLink>
              <button
                className="btn btn-outline-danger mx-2"
                style={{ borderRadius: "20px", padding: "0.5rem 1rem" }}
                type="submit"
                onClick={(e) => logout(e)}
              >
                Log Out
              </button>
              {userName && <UserLogoIcon userName={userName} />}
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn btn-outline-light mx-2"
                style={{ borderRadius: "20px", padding: "0.5rem 1rem" }}
              >
                <i className="fa fa-sign-in-alt mr-1"></i> Log In
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-outline-light mx-2"
                style={{ borderRadius: "20px", padding: "0.5rem 1rem" }}
              >
                <i className="fa fa-user-plus mr-1"></i> Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
