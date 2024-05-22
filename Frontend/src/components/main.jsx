import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid p-0">
      <div className="hero">
        <div className="card bg-primary text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="https://cdn.dribbble.com/users/13448982/screenshots/19920350/media/c8abb1cd78382fffd042cdad450043e9.jpg?resize=1200x900&vertical=center"
            alt="Card"
            height={500}
            style={{ filter: "brightness(0.7)" }}
          />
          <div className="card-img-overlay d-flex flex-column justify-content-center align-items-center">
            <div className="container d-flex flex-column justify-content-center align-items-center text-center">
              <h1 className="display-4 fw-bold mb-4">
                Discover Vintage Treasures
              </h1>
              <p className="lead mb-5">
                Explore our curated collection of unique and timeless vintage
                items.
              </p>
              <Link
                to="/Product"
                className="btn btn-primary rounded-pill px-4 py-2"
                style={{
                  backgroundColor: "#4db2ff",
                  color: "#fff",
                  fontSize: "1.2rem",
                  padding: "12px 32px",
                }}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
