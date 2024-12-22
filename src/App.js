import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryPage from "./components/inventry/InventoryPage";
// import SalesSummary from "./components/salesummery/SalesSummary";
import Invoice from "./components/Invoice/Invoice";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="app" style={{ marginTop: "70px" }}>
        <Routes>
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/" exact element={<Invoice />} />

          {/* <Route path="/sales-summary" element={<SalesSummary />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
