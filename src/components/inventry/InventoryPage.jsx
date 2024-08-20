import React, { useState } from "react";
import data from "../../data";
import "./inventry.css";

const InventoryPage = () => {
  const { items } = data;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.code.toLowerCase().includes(searchTerm)
  );

  const totalStockValue = filteredItems.reduce(
    (acc, item) => acc + item.quantity * item.purchasePrice,
    0
  );

  return (
    <div className="inventory-page">
      <h1>Inventory</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by item name or code..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Table View for Larger Screens */}
      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Purchase Price (PKR)</th>
              <th>Total Price (PKR)</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.purchasePrice.toLocaleString()}</td>
                  <td>
                    {(item.quantity * item.purchasePrice).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card View for Mobile Screens */}
      <div className="inventory-cards">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div className="inventory-card" key={item.code}>
              <h2>{item.name}</h2>
              <p>
                <span className="card-header">Item Code:</span> {item.code}
              </p>
              <p>
                <span className="card-header">Quantity:</span> {item.quantity}
              </p>
              <p>
                <span className="card-header">Purchase Price (PKR):</span>{" "}
                {item.purchasePrice.toLocaleString()}
              </p>
              <p>
                <span className="card-header">Total Price (PKR):</span>{" "}
                {(item.quantity * item.purchasePrice).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No items found</p>
        )}
      </div>

      <div className="inventory-summary">
        <h2>Total Stock Value (PKR): {totalStockValue.toLocaleString()}</h2>
      </div>
    </div>
  );
};

export default InventoryPage;
