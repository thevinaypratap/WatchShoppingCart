import React, { Fragment, useState } from "react";
import { Footer, Navbar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { createURL } from "../constant";
import { validateEmail } from "./EmailValidate";
import axios from "axios";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSave = (e) => {
    if (firstName === "") {
      alert("First Name can not be blank");
      return;
    }
    if (lastname === "") {
      alert("Last Name can not be blank");
      return;
    }
    if (email === "") {
      alert("Email should not be blank");
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter email in correct format!");
      return;
    }

    if (password === "") {
      alert("Password should not be blank");
      return;
    }

    if (password !== confirmpassword) {
      alert("Confirm password should be same as the password");
      return;
    }

    const url = createURL("user");
    const data = {
      FirstName: firstName,
      LastName: lastname,
      Email: email,
      Password: password,
      ConfirmPassword: confirmpassword,
      Address: address,
    };

    axios
      .post(url, data)
      .then((response) => {
        const result = response.data;

        if (result) {
          alert("Register successfully");
          navigate("/Login");
        } else {
          alert("User already exists, Please login");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert("This email is already in use, Please login!");
        } else {
          alert("Error occurred while registering");
        }
      });
  };

  return (
    <Fragment>
      <Navbar />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundImage: `url("https://wallpaperaccess.com/full/7293984.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="container"
        style={{
          marginTop: 150,
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: 30,
          width: "40%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
          },
        }}
      >
        <div className="text-center mb-4">
          <h2 className="title">Sign Up</h2>
          <hr />
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="form-group w-100">
            <label htmlFor="firstName" className="form-label fw-bold">
              First Name:
            </label>
            <input
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-group w-100 mt-3">
            <label htmlFor="lastName" className="form-label fw-bold">
              Last Name:
            </label>
            <input
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="form-group w-100 mt-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email:
            </label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group w-100 mt-3">
            <label htmlFor="password" className="form-label fw-bold">
              Password:
            </label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group w-100 mt-3">
            <label htmlFor="confirmPassword" className="form-label fw-bold">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="form-group w-100 mt-3">
            <label htmlFor="address" className="form-label fw-bold">
              Address:
            </label>
            <input
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              onClick={handleSave}
              className="btn btn-primary rounded-pill px-4 py-2"
              style={{ backgroundColor: "#007bff", color: "#fff" }}
            >
              Sign Up
            </button>
            <Link
              to="/login"
              className="btn btn-success rounded-pill px-4 py-2 ms-3"
              style={{ backgroundColor: "#28a745", color: "#fff" }}
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
