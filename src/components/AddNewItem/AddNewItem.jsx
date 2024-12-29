import React, { useState } from "react";
import api from "../../axios"; // axios instance configured to point to your backend
import "./newitem.css";
const AddNewItem = () => {
  const [itemCode, setItemCode] = useState(""); // State to hold item code
  const [itemName, setItemName] = useState(""); // State to hold item name
  const [purchasePrice, setPurchasePrice] = useState(""); // State to hold purchase price
  const [salePrice, setSalePrice] = useState(""); // State to hold sale price
  const [quantity, setQuantity] = useState(""); // State to hold quantity
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemCode || !itemName || !purchasePrice || !salePrice || !quantity) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(""); // Reset previous error
    setSuccess(""); // Reset previous success

    try {
      // Perform the POST request to add the new item
      await api.post("/api/items", {
        code: itemCode,
        name: itemName,
        purchasePrice: parseFloat(purchasePrice),
        salePrice: parseFloat(salePrice),
        quantity: parseInt(quantity),
      });

      setLoading(false);
      setSuccess("Item added successfully!");

      // Optionally, reset the form fields
      setItemCode("");
      setItemName("");
      setPurchasePrice("");
      setSalePrice("");
      setQuantity("");
    } catch (err) {
      setLoading(false);
      setError("Error adding item. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="add-new-item">
      <h2>Add New Item</h2>
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
          <label>Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
          />
        </div>
        <div>
          <label>Purchase Price (PKR)</label>
          <input
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            placeholder="Enter purchase price"
          />
        </div>
        <div>
          <label>Sale Price (PKR)</label>
          <input
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            placeholder="Enter sale price"
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Item"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default AddNewItem;
