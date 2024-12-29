import React, { useState } from "react";
import api from "../../axios"; // axios instance configured to point to your backend
import "./UpdateStock.css";

const UpdateStock = () => {
  const [itemCode, setItemCode] = useState(""); // State to hold item code
  const [quantityPurchased, setQuantityPurchased] = useState(""); // State to hold quantity purchased
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemCode || !quantityPurchased) {
      setError("Please enter both item code and quantity.");
      return;
    }

    setLoading(true);
    setError(""); // Reset previous error
    setSuccess(""); // Reset previous success

    try {
      // Perform the PUT request without storing the response
      await api.put("api/items/updateQuantity", {
        itemCode,
        quantityPurchased,
      });

      setLoading(false);
      setSuccess("Stock updated successfully!");
    } catch (err) {
      setLoading(false);
      setError("Error updating stock. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="update-stock">
      <h2>Update Stock</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item Code</label>
          <input
            type="text"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
            placeholder="Enter item code"
          />
        </div>
        <div>
          <label>Quantity Purchased</label>
          <input
            type="number"
            value={quantityPurchased}
            onChange={(e) => setQuantityPurchased(e.target.value)}
            placeholder="Enter quantity"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Stock"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default UpdateStock;
