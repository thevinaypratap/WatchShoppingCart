import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center">
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">
              {" "}
              <a
                href="https://www.linkedin.com/in/vinaypratap03/"
                className="text-decoration-underline text-dark fs-5 font-weight-bold"
                target="_blank"
                rel="noreferrer"
              >
                Vinay Pratap
              </a>
            </p>
            <a
              className="text-primary fs-4"
              href="https://www.linkedin.com/in/vinaypratap03/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
