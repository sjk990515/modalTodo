import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStytles";
import Home from "./pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
