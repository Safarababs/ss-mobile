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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editItem, setEditItem] = useState(null);

  const fetchSalesData = async () => {
    setLoading(true);
    setError(null);

    try {
      let sales;
      switch (period) {
        case "daily":
          sales = await getDailySales(date);
          break;
        case "weekly":
          const startOfWeek = new Date(date);
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
          const endOfWeek = new Date(date);
          endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
          sales = await getWeeklySales(
            startOfWeek.toISOString(),
            endOfWeek.toISOString()
          );
          break;
        case "monthly":
          const [year, month] = date.split("-").map(Number);
          sales = await getMonthlySales(year, month);
          break;
        case "yearly":
          const [yearly] = date.split("-");
          sales = await getYearlySales(yearly);
          break;
        default:
          sales = [];
      }

      setSalesData(sales);
    } catch (err) {
      console.error("Error fetching sales data:", err);
      setError("Failed to fetch sales data.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSalesData = salesData.filter((sale) =>
    [sale.code, sale.name, sale.customerName, sale.customerPhone].some(
      (field) => field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const calculateTotalSales = () => {
    return filteredSalesData
      .reduce((total, sale) => total + sale.totalPrice, 0)
      .toFixed(2);
  };

  const handleDelete = (itemCode) => {
    const updatedData = salesData.filter((sale) => sale.code !== itemCode);
    setSalesData(updatedData);
  };

  const handleUpdate = (updatedSale) => {
    const updatedData = salesData.map((sale) =>
      sale.code === updatedSale.code ? updatedSale : sale
    );
    setSalesData(updatedData);
    setEditItem(null); // Close edit mode after updating
  };

  return (
    <>
      <div className="sales-summary">
        <h1>Sales Summary</h1>
        <div>
          <label htmlFor="period-select">Select Period:</label>
          <select
            id="period-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
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
          <button onClick={fetchSalesData} disabled={loading}>
            {loading ? "Loading..." : "Fetch Sales"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Item Code, Item Name, Customer Name, or Customer Phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Display Total Sales */}
        {filteredSalesData.length > 0 && (
          <div className="total-sales">
            <h2>Total Sales Value: {calculateTotalSales()}</h2>
          </div>
        )}
      </div>
      <div style={{ overflowX: "auto" }}>
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
              <th>Actions</th> {/* New Column for Actions */}
            </tr>
          </thead>
          <tbody>
            {filteredSalesData.length > 0 ? (
              filteredSalesData.map((sale, index) => (
                <tr key={index}>
                  <td>{sale.code}</td>
                  <td>{sale.name}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.originalPrice.toFixed(2)}</td>
                  <td>{sale.totalPrice.toFixed(2)}</td>
                  <td>{sale.customerName}</td>
                  <td>{sale.customerPhone}</td>
                  <td>{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="actions-column">
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(sale.code)}
                    >
                      Delete
                    </button>
                    <button
                      className="update-button"
                      onClick={() => setEditItem(sale)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No sales data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Update Form */}
      {editItem && (
        <div className="update-form">
          <h2>Update Sale Item</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editItem);
            }}
          >
            <label>
              Item Code:
              <input
                type="text"
                value={editItem.code}
                onChange={(e) =>
                  setEditItem({ ...editItem, code: e.target.value })
                }
                required
              />
            </label>
            <label>
              Item Name:
              <input
                type="text"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
                required
              />
            </label>
            <label>
              Quantity Sold:
              <input
                type="number"
                value={editItem.quantity}
                onChange={(e) =>
                  setEditItem({ ...editItem, quantity: Number(e.target.value) })
                }
                required
              />
            </label>
            <label>
              Original Price:
              <input
                type="number"
                step="0.01"
                value={editItem.originalPrice}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    originalPrice: Number(e.target.value),
                  })
                }
                required
              />
            </label>
            <label>
              Price After Discount:
              <input
                type="number"
                step="0.01"
                value={editItem.totalPrice}
                onChange={(e) =>
                  setEditItem({
                    ...editItem,
                    totalPrice: Number(e.target.value),
                  })
                }
                required
              />
            </label>
            <label>
              Customer Name:
              <input
                type="text"
                value={editItem.customerName}
                onChange={(e) =>
                  setEditItem({ ...editItem, customerName: e.target.value })
                }
                required
              />
            </label>
            <label>
              Customer Phone:
              <input
                type="text"
                value={editItem.customerPhone}
                onChange={(e) =>
                  setEditItem({ ...editItem, customerPhone: e.target.value })
                }
                required
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                value={editItem.date.split("T")[0]}
                onChange={(e) =>
                  setEditItem({ ...editItem, date: e.target.value })
                }
                required
              />
            </label>
            <button type="submit">Update Item</button>
            <button type="button" onClick={() => setEditItem(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SalesSummary;
