// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryPage from "./components/inventry/InventoryPage";
import SalePage from "./components/sale/SalePAge";
import SalesSummary from "./components/salesummery/SalesSummary";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="app" style={{ marginTop: "70px" }}>
        <Routes>
          <Route path="/" exact element={<InventoryPage />} />{" "}
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/sales-summary" element={<SalesSummary />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
