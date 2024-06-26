import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import OurStory from "../components/OurStory";
import OurService from "../components/OurService";
import Blog from "../components/Blog";
import Contacts from "../components/Contacts";
import Shop from "../components/Shop";
import Footer from "../components/Footer";
import { CartProvider } from '../components/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/ourservice" element={<OurService />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;