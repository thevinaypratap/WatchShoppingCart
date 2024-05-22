import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useNavigate } from "react-router-dom";
import { createURL } from "./constant";
import axios from "axios";
import { setAuthToken } from "./Productview";
import "./Cart.css";
import CheckUser from "./CheckUser";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/PageNotFound");
      return;
    }

    getCartItems();
  }, []);

  const getCartItems = () => {
    const role = CheckUser(token);
    if (role === "CustomerUser") {
      setAuthToken(token);
      const url = createURL(`api/Carts/GetCartItems`);
      axios
        .get(url)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setCartItems(res.data);
            calculateTotalPrice(res.data);
          } else {
            if (res.status === 204) {
              setCartItems([]);
            }
          }
        })
        .catch((error) => {
          alert("Error occurred during fetching the data!");
        });
    } else {
      navigate("/PageNotFound");
      return;
    }
  };

  const calculateTotalPrice = (items) => {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.unitPrice * item.quantity;
    });
    setTotalPrice(subtotal);
  };

  const deleteItem = (product) => {
    if (product.productId) {
      const url = createURL(
        `api/Carts/RemoveItem?productId=${product.productId}`
      );
      axios.delete(url).then((res) => {
        const updatedCartItems = cartItems.filter(
          (item) => item.productId !== product.productId
        );
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems);
        getCartItems();
      });
    }
  };

  const reduceItem = (productId) => {
    if (productId) {
      const url = createURL(`api/Carts/decrement?productId=${productId}`);
      axios
        .put(url)
        .then((result) => {
          if (result.status === 200) {
            getCartItems();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const increaseItem = (productId) => {
    if (productId) {
      const url = createURL(`api/Carts/Increment?productId=${productId}`);
      axios
        .put(url)
        .then((result) => {
          getCartItems();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addOrder = () => {
    setAuthToken(token);
    const url = createURL(`api/Orders/AddOrder`);
    axios.post(url).then((res) => {
      setOrderId(res.data);
      const updatedCartItems = cartItems.filter(
        (item) =>
          !cartItems.some((orderItem) => orderItem.productId === item.productId)
      );
      calculateTotalPrice(updatedCartItems);
      alert("Order is processing. Your order ID is: " + res.data);
      getCartItems();
    });
  };

  return (
    <div>
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Cart Items</h3>
              {cartItems.length > 0 && (
                <button className="btn btn-primary" onClick={addOrder}>
                  Place Order
                </button>
              )}
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.productName}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-primary mr-2"
                            onClick={() => reduceItem(product.productId)}
                          >
                            -
                          </button>
                          <span>{product.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-primary ml-2"
                            onClick={() => increaseItem(product.productId)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>Rs. {product.unitPrice}</td>
                      <td>Rs. {product.quantity * product.unitPrice}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteItem(product)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="row">
            <div className="col-md-12 text-right">
              <h4 className="text-success">
                Total Price: Rs. {Math.round(totalPrice)}
              </h4>
            </div>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
};

export default Cart;
