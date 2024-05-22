import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createURL } from "./constant";
import axios from "axios";
import { setAuthToken } from "./Productview";
import { Navbar } from "../components";
import CheckUser from "./CheckUser";
import { convertTimestampToReadable } from "./DateTimeFormate";

const DisplayOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token == undefined) {
      navigate("/PageNotFound");
      return;
    } else {
      var role = CheckUser(token);
      if (role != "CustomerUser") {
        navigate("/PageNotFound");
        return;
      }
      getOrders();
    }
  }, [navigate]);

  const getOrders = () => {
    setAuthToken(sessionStorage.getItem("token"));
    const url = createURL(`api/Orders/MyOrders`);
    axios.get(url).then((res) => {
      setOrders(res.data);
    });
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-5">
        <h3 className="text-center mb-4">My Orders</h3>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Order Date</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.orderId}</td>
                  <td>{order.productName}</td>
                  <td>{convertTimestampToReadable(order.dateTime)}</td>
                  <td>Rs. {order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DisplayOrder;
