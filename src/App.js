import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryPage from "./components/inventry/InventoryPage";
import SalesSummary from "./components/salesummery/SalesSummary";
import InvoicePage from "./components/Invoice/Invoice";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="app" style={{ marginTop: "70px" }}>
        <Routes>
          <Route path="/" element={<InventoryPage />} />
          <Route path="/inventory" element={<InventoryPage />} />

          <Route path="/sales-summary" element={<SalesSummary />} />
          <Route path="/invoice" element={<InvoicePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
