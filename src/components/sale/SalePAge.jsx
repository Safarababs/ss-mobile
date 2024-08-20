import React, { useState, useEffect } from "react";
import data from "../../data";
import { addSale } from "./salesData";
import ErrorModal from "../ErrorModel/ErrorModal";
import "./sale.css";

const SalePage = () => {
  const { items } = data;
  const [searchTerm, setSearchTerm] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [sales, setSales] = useState([]);
  const [error, setError] = useState("");

  // Function to filter items based on the search term
  const filteredItems = items.filter(
    (item) =>
      item.code.includes(searchTerm) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.quantity.toString().includes(searchTerm) ||
      item.salePrice.toString().includes(searchTerm)
  );

  // Update the selected item based on the search term
  useEffect(() => {
    if (searchTerm) {
      const foundItem = items.find(
        (item) =>
          item.code.includes(searchTerm) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSelectedItem(foundItem || null);
    } else {
      setSelectedItem(null);
    }
  }, [searchTerm, items]);

  const handleRecordSale = () => {
    if (selectedItem && quantitySold) {
      const quantity = parseInt(quantitySold, 10);
      if (isNaN(quantity) || quantity <= 0) {
        setError("Please enter a valid quantity.");
        return;
      }
      if (quantity > selectedItem.quantity) {
        setError("Insufficient stock available.");
        return;
      }

      const sale = {
        code: selectedItem.code,
        name: selectedItem.name,
        quantity: quantity,
        totalPrice: selectedItem.salePrice * quantity, // Sale price calculation
        date: new Date().toISOString(), // Add date to the sale record
      };

      // Add sale record to the appropriate categories
      addSale(sale);

      setSales([...sales, sale]);
      setQuantitySold("");
      setSelectedItem(null);
      setError(""); // Clear error message
    } else {
      setError("Please select an item and enter quantity.");
    }
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <div className="sale-page">
      <h1>Record Sale</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by code or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {selectedItem && (
        <div className="item-details">
          <h2>Selected Item</h2>
          <table className="item-table">
            <tbody>
              <tr>
                <td className="item-header">Item Code:</td>
                <td>{selectedItem.code}</td>
              </tr>
              <tr>
                <td className="item-header">Name:</td>
                <td>{selectedItem.name}</td>
              </tr>
              <tr>
                <td className="item-header">Quantity Available:</td>
                <td>{selectedItem.quantity}</td>
              </tr>
              <tr>
                <td className="item-header">Sale Price (PKR):</td>
                <td>{selectedItem.salePrice.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <input
            type="number"
            placeholder="Enter quantity sold"
            value={quantitySold}
            onChange={(e) => setQuantitySold(e.target.value)}
          />
          <button onClick={handleRecordSale}>Add Sale</button>
        </div>
      )}
      <div className="sales-summary">
        <h2>Sales Summary</h2>
        {sales.length > 0 ? (
          <table className="sales-table">
            <thead>
              <tr>
                <th>Item Code</th>
                <th>Name</th>
                <th>Quantity Sold</th>
                <th>Total Price (PKR)</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.code}</td>
                  <td>{sale.name}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.totalPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sales recorded</p>
        )}
      </div>
      <ErrorModal message={error} onClose={handleCloseError} />
    </div>
  );
};

export default SalePage;
