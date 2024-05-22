import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Header from "./AdminHeader";
import { createURL } from "./constant";
import "./modal.css";
import AuthGuard from "./AuthGuard";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "./Productview";
import CheckUser from "./CheckUser";
import { convertTimestampToReadable } from "./DateTimeFormate";

export default function AdminOrders() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    if (!token) {
      navigate("/PageNotFound");
      return;
    }
    const role = CheckUser(token);
    if (role !== "Admin") {
      navigate("/Home"); // Redirect non-admin users to the Home page
      return;
    }
    const url = createURL(`api/Orders/AllOrders`);
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          // If the token is invalid, redirect the user to the login page
          navigate("/Login");
        }
      });
  };

  const handleItemDetail = (id) => {
    if (!token) {
      navigate("/Login");
      alert("Please login");
      return;
    }
    const url = createURL(`api/Orders/${id}`);
    setAuthToken(token);
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          // Display the order details
          console.log(data.order);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          // If the token is invalid, redirect the user to the login page
          navigate("/Login");
        }
      });
  };

  return (
    <Fragment>
      <Header />
      <br />
      <div className="form-group col-md-12">
        <h3 style={{ textAlign: "center" }}>All Orders</h3>
      </div>
      {data.length > 0 ? (
        <table
          className="table stripped table-hover mt-4"
          style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}
        >
          <thead className="thead-light">
            <tr>
              <th scope="col">S.N.</th>
              <th scope="col">Customer Id</th>
              <th scope="col">Order No</th>
              <th scope="col">Total</th>
              <th scope="col">Product Name</th>
              <th scope="col">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{val.userId}</td>
                  <td onClick={() => handleItemDetail(val.id)}>
                    {val.orderId}
                  </td>
                  <td>{val.totalAmount}</td>
                  <td>{val.productName}</td>
                  <td>{convertTimestampToReadable(val.dateTime)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        "No data found"
      )}
      <AuthGuard />
    </Fragment>
  );
}
