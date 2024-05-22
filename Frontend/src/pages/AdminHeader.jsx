import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components";
import AuthGuard from "./AuthGuard";
import CheckUser from "./CheckUser";
import { NavLink } from "react-router-dom";

export default function AdminHeader() {
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/PageNotFound");
    } else {
      const role = CheckUser(token);
      if (role !== "Admin") {
        navigate("/PageNotFound");
      }
    }
  }, [token, navigate]);

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    window.location.href = "/Home";
  };

  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top"
        style={{ position: "fixed", top: 0, right: 0, left: 0 }}
      >
        <div className="container">
          <NavLink to="/" className="navbar-brand d-flex align-items-center">
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

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/Additem" className="nav-link text-light">
                  Product Management
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ListCustomers" className="nav-link text-light">
                  Customer Management
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AdminOrders" className="nav-link text-light">
                  Order Management
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/AdminCategory" className="nav-link text-light">
                  Category Management
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <Link
                to="/Additem"
                className="btn btn-outline-light mx-2"
                style={{ borderRadius: "20px" }}
              >
                Admin Dashboard
              </Link>
              <button
                className="btn btn-outline-danger mx-2"
                style={{ borderRadius: "20px" }}
                type="submit"
                onClick={(e) => logout(e)}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: "100px" }}>
        <AuthGuard />
      </div>
    </Fragment>
  );
}
