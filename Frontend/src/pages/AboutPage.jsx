import React from "react";
import { Footer, Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              className="img-fluid"
              src="https://storage.photojoiner.com/api/attachments/file/2024-04-09/upload_4e7617be48a37f036fe0d2922baabda3.jpg"
              alt="About Us"
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center mb-4">About Us</h1>
            <p className="lead text-center">
              VinTimes is a watches shopping cart project that allows users to
              browse and purchase a variety of watches. The project includes a
              Home page, a Products page where users can search and filter
              watches, and a Cart page where users can manage their cart items
              and complete the checkout process.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
