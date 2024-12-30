import React, { useState } from "react";
import api from "../../axios"; // axios instance configured to point to your backend

const DeleteItem = () => {
  const [itemCode, setItemCode] = useState(""); // State to hold item code
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemCode) {
      setError("Please enter an item code.");
      return;
    }

    setLoading(true);
    setError(""); // Reset previous error
    setSuccess(""); // Reset previous success

    try {
      // Perform the DELETE request to remove the item
      await api.delete(`/items/${itemCode}`); // No need to store the response

      setLoading(false);
      setSuccess("Item deleted successfully!");
      setItemCode(""); // Optionally clear the input field after successful deletion
    } catch (err) {
      setLoading(false);
      setError("Error deleting item. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="delete-item">
      <h2>Delete Item</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? "Deleting..." : "Delete Item"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default DeleteItem;
