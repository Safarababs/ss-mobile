import React, { useState } from "react";
import {
  getDailySales,
  getWeeklySales,
  getMonthlySales,
  getYearlySales,
} from "../Sales/salesData";
import "./salesSummary.css";

const SalesSummary = () => {
  const [period, setPeriod] = useState("daily");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [salesData, setSalesData] = useState([]);

  const fetchSalesData = () => {
    let sales;
    switch (period) {
      case "daily":
        sales = getDailySales(date);
        break;
      case "weekly":
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(date);
        endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
        sales = getWeeklySales(
          startOfWeek.toISOString(),
          endOfWeek.toISOString()
        );
        break;
      case "monthly":
        const [year, month] = date.split("-").map(Number);
        sales = getMonthlySales(year, month);
        break;
      case "yearly":
        const [yearly] = date.split("-");
        sales = getYearlySales(yearly);
        break;
      default:
        sales = [];
    }
    console.log("Fetched Sales Data:", sales); // Debugging
    setSalesData(sales);
  };

  return (
    <div className="sales-summary">
      <h1>Sales Summary</h1>
      <div>
        <label>Select Period:</label>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={period === "weekly"}
        />
        <button onClick={fetchSalesData}>Fetch Sales</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Quantity Sold</th>
            <th>Original Price</th>
            <th>Price After Discount</th>
            <th>Customer Name</th>
            <th>Customer Phone</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={index}>
              <td data-label="Item Code">{sale.code}</td>
              <td data-label="Item Name">{sale.name}</td>
              <td data-label="Quantity Sold">{sale.quantity}</td>
              <td data-label="Original Price">
                {sale.originalPrice.toFixed(2)}
              </td>
              <td data-label="Price After Discount">
                {sale.totalPrice.toFixed(2)}
              </td>
              <td data-label="Customer Name">{sale.customerName}</td>
              <td data-label="Customer Phone">{sale.customerPhone}</td>
              <td data-label="Date">
                {new Date(sale.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesSummary;
