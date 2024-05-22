import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { createURL } from "./constant";
import CheckUser from "./CheckUser";
import { Navbar } from "../components"; // Assuming Navbar is a component from the '../components' file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = () => {
    if (email.length === 0) {
      alert("Please enter email");
    } else if (password.length === 0) {
      alert("Please enter password");
    } else {
      const url = createURL(`api/User/login/${email}/${password}`);

      axios
        .post(url)
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            const role = CheckUser(response.data);
            if (role === "Admin") {
              sessionStorage.setItem("token", response.data);
              sessionStorage.setItem("userName", "Vinay Pratap"); // Replace with the actual user name
              alert("Login Successful");
              navigate("/Additem");
            } else {
              sessionStorage.setItem("token", response.data);
              sessionStorage.setItem("userName", "Customer"); // Replace with the actual user name
              alert("Login Successful");
              navigate("/Product");
            }
          } else {
            alert("Please enter correct email and password");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  };

  const onRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <Navbar userName={sessionStorage.getItem("userName")} />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundImage: `url("https://wallpaperaccess.com/full/3710795.jpg")`,
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
          <h2 className="title">Log In</h2>
          <hr />
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="form-group w-100">
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
          <div className="d-flex justify-content-center mt-4">
            <button
              onClick={onLogin}
              className="btn btn-success rounded-pill px-4 py-2 me-3"
              style={{ backgroundColor: "#28a745", color: "#fff" }}
            >
              Log In
            </button>
            <button
              onClick={onRegister}
              className="btn btn-primary rounded-pill px-4 py-2"
              style={{ backgroundColor: "#007bff", color: "#fff" }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
