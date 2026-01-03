import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Favorites from "../pages/Favorites";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
};

export default AppRoutes;
