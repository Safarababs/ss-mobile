import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryPage from "./components/inventry/InventoryPage";
// import SalesSummary from "./components/salesummery/SalesSummary";
import Invoice from "./components/Invoice/Invoice";
import Header from "./components/Header/Header";
import SalesRecord from "./components/Sales Record/SalesRecord";
import UpdateStock from "./components/UpdateStock/UpdateStock";
import AddNewItem from "./components/AddNewItem/AddNewItem";
import DeleteItem from "./components/DeleteItem/DeleteItem";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="app" style={{ marginTop: "10px" }}>
        <Routes>
          <Route path="/" element={<SalesRecord />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/updatestock" element={<UpdateStock />} />
          <Route path="/addnewitem" element={<AddNewItem />} />
          <Route path="/deleteitem" element={<DeleteItem />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
