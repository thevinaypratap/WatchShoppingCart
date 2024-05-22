import React from 'react';

import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DisplayOrder from './pages/DisplayOrder';

import { Home, Products, AboutPage, ContactPage, Cart, Login, Register, PageNotFound, AdminHeader, AdminDashboard, Item, AdminOrders, ListCustomers } from "./pages"
import Productview from './pages/Productview';
import AdminCategory from './pages/Category';

function App() {


  return (
    <div>
      <BrowserRouter>

        <Routes>

          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/*" element={<PageNotFound />} />
          <Route path='/AdminCategory' element={<AdminCategory />} />
          <Route path="/AdminHeader" element={<AdminHeader />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/ListCustomers" element={<ListCustomers />} />
          <Route path="/AdminOrders" element={<AdminOrders />} />
          <Route path="/addItem" element={<Item />} />
          <Route path="/productview/:id" element={<Productview />} />
          <Route path="/displayorder" element={<DisplayOrder />} />


        </Routes>

      </BrowserRouter>
    </div>
  );
}
export default App;