import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Footer, Navbar } from "../components"
import { createURL } from './constant';
import {  useNavigate, useParams } from 'react-router-dom';
import './productview.css';
import AuthGuard from './AuthGuard';
import CheckUser from './CheckUser';

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
}



const Productview = () => {
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const token = sessionStorage['token'];



    const getProductById = () => {
        const url = createURL(`api/Products/${id}`);
        axios.get(url)
            .then((res) => {
                console.log(res);
                setProduct(res.data);
            })
    }

    
    if(token != undefined) {
        
        var role = CheckUser(token);
    }



    const addItemToCart = () => {
        if(token === undefined)
        {
            navigate("/login");
            return;
        }
        else if (role == "CustomerUser") {
            setAuthToken(sessionStorage.getItem("token"));
            const url = createURL(`api/Carts/AddItemToCart?productId=${product.productId}`);
            axios.post(url).then((res) => {
                alert("item added to cart");
                navigate('/cart');
            })
        }
        else {
            navigate("/PageNotFound");
            return;
        }


    }

    useEffect(() => {
        getProductById();
    }, []);

    return (
        <>
            <Navbar />
            <section className="product-details container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <img className="product-image img-fluid" src={product.imageURL} alt={product.productName} />
                    </div>
                    <div className="col-md-6">
                        <div className="details">
                            <h2 className="product-brand text-primary">{product.productName}</h2>
                            <p className="product-short-des">{product.productDescription}</p>
                            <span className="product-price fs-4 fw-bold mb-4 d-block">Rs. {product.price}</span>
                            <div className="btn-align mt-4">
                                <button className="btn btn-primary rounded-pill px-4 py-2" onClick={addItemToCart}>
                                    <i className="fas fa-shopping-cart me-2"></i>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          
            
        </>
    )
}

export default Productview