import React, { useState } from "react";
import { getSalesByCategory } from "../sale/salesData";
import "./salesSummary.css";

const SalesSummary = () => {
  const [category, setCategory] = useState("daily");

  const sales = getSalesByCategory(category);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="sales-summary-page">
      <h1>Sales Summary</h1>
      <div className="category-selector">
        <label>
          <input
            type="radio"
            value="daily"
            checked={category === "daily"}
            onChange={handleCategoryChange}
          />
          Daily
        </label>
        <label>
          <input
            type="radio"
            value="weekly"
            checked={category === "weekly"}
            onChange={handleCategoryChange}
          />
          Weekly
        </label>
        <label>
          <input
            type="radio"
            value="monthly"
            checked={category === "monthly"}
            onChange={handleCategoryChange}
          />
          Monthly
        </label>
        <label>
          <input
            type="radio"
            value="yearly"
            checked={category === "yearly"}
            onChange={handleCategoryChange}
          />
          Yearly
        </label>
      </div>
      <table className="sales-summary-table">
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Name</th>
            <th>Quantity Sold</th>
            <th>Total Price (PKR)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td>{sale.code}</td>
              <td>{sale.name}</td>
              <td>{sale.quantity}</td>
              <td>{sale.totalPrice.toLocaleString()}</td>
              <td>{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesSummary;
