import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../axios"; // Replace with your axios configuration
import "./Invoice.css";

const Invoice = () => {
  const navigate = useNavigate(); // Hook to navigate to the home page
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedItems, setSelectedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/items");
        const itemsWithQuantity = response.data.map((item) => ({
          ...item,
          quantity: item.quantity.$numberInt
            ? parseInt(item.quantity.$numberInt)
            : item.quantity,
        }));
        setItems(itemsWithQuantity);
      } catch (error) {
        console.error("Error fetching items:", error);
        alert("Failed to fetch items from the server. Please try again later.");
      }
    };

    fetchItems();
  }, []);

  // Filter items based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems([]);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const results = items.filter(
        (item) =>
          item.code.toLowerCase().includes(lowercasedSearch) ||
          item.name.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredItems(results);
    }
  }, [searchTerm, items]);

  // Add item to selected items
  const handleAddItem = (item) => {
    // Check if the item has stock available
    if (item.quantity === 0) {
      alert(`The item "${item.name}" is out of stock.`);
      return; // Prevent adding the item if no stock is available
    }

    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };

      if (updatedItems[item._id]) {
        if (updatedItems[item._id].quantity < item.quantity) {
          updatedItems[item._id].quantity += 1;
        } else {
          alert(`Only ${item.quantity} items available in stock.`);
        }
      } else {
        updatedItems[item._id] = { ...item, quantity: 1 };
      }
      return updatedItems;
    });
  };

  // Update sale price for an item
  const handlePriceChange = (id, newPrice) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      updatedItems[id].salePrice = newPrice;
      return updatedItems;
    });
  };

  // Remove item from selected items
  const handleRemoveItem = (id) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[id];
      return updatedItems;
    });
  };

  // Calculate total price of selected items
  const calculateTotal = () => {
    return Object.values(selectedItems).reduce(
      (total, item) => total + item.salePrice * item.quantity,
      0
    );
  };

  // Calculate total profit from selected items
  const calculateProfit = () => {
    return Object.values(selectedItems).reduce(
      (profit, item) =>
        profit + (item.salePrice - item.purchasePrice) * item.quantity,
      0
    );
  };

  // Handle submission of sale
  const handleSubmit = async () => {
    if (Object.keys(selectedItems).length === 0) {
      alert("Please select at least one item before submitting the sale.");
      return; // Prevent submission if no items are selected
    }

    setLoading(true); // Set loading to true when submitting

    const saleData = {
      customerName,
      customerPhone,
      itemsSold: Object.values(selectedItems).map((item) => {
        const profitOrLoss =
          (item.salePrice - item.purchasePrice) * item.quantity;
        return {
          _id: item._id,
          name: item.name,
          code: item.code,
          salePrice: item.salePrice,
          purchasePrice: item.purchasePrice,
          quantity: item.quantity,
          profit: profitOrLoss > 0 ? profitOrLoss : undefined,
          loss: profitOrLoss < 0 ? Math.abs(profitOrLoss) : undefined,
        };
      }),
      total: calculateTotal(),
    };

    try {
      const response = await api.post("/sales", saleData);
      setInvoiceNumber(response.data.invoiceNumber); // Update invoice number
      console.log(invoiceNumber);

      alert(
        `Sale submitted successfully! Invoice Number: ${response.data.invoiceNumber}`
      );

      // Clear the form after successful submission
      setCustomerName("");
      setCustomerPhone("");
      setSelectedItems({});
      setSearchTerm("");
      setFilteredItems([]);

      // Redirect to home page
      navigate("/"); // Redirects to the home page (change this if you have a different route)
    } catch (error) {
      console.error("Error submitting sale:", error);
      alert("Failed to submit sale. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after the request finishes
    }
  };

  return (
    <div className="invoice-page">
      <h2>ABD Mobiles & Accessories</h2>

      {/* Customer Name and Phone input fields */}
      <div className="invoice-section">
        <label>Customer Name: </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="invoice-section">
        <label>Customer Phone: </label>
        <input
          type="text"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />
      </div>

      {/* Item Search Section */}
      <div className="search-section">
        <label>Select Items: </label>
        <input
          type="text"
          placeholder="Search items by code or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredItems.length > 0 && (
          <ul className="item-list">
            {filteredItems.map((item) => (
              <li key={item._id} onClick={() => handleAddItem(item)}>
                {item.name} (Code: {item.code}) - PKR {item.salePrice} | Stock:{" "}
                {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Items Table */}
      <div className="selected-items">
        <h3>Selected Items</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Profit</th>
              <th>Loss</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(selectedItems).map((item) => {
              const profitOrLoss =
                (item.salePrice - item.purchasePrice) * item.quantity;
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      value={item.salePrice}
                      onChange={(e) =>
                        handlePriceChange(item._id, e.target.value)
                      }
                    />
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.salePrice * item.quantity}</td>
                  <td>{profitOrLoss > 0 ? profitOrLoss : "-"}</td>
                  <td>{profitOrLoss < 0 ? Math.abs(profitOrLoss) : "-"}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Total and Profit */}
        <div>
          <p>
            Total: PKR {calculateTotal()} & Total Profit: PKR{" "}
            {calculateProfit()}
          </p>
        </div>
      </div>

      {/* Show spinner when loading */}
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Warning message if no items are selected */}
      <div
        className="warning-message"
        style={{
          display: Object.keys(selectedItems).length === 0 ? "block" : "none",
        }}
      >
        <p>Please select at least one item before submitting the sale.</p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || Object.keys(selectedItems).length === 0}
        className="submit-button"
      >
        {loading ? "Submitting..." : "Submit Sale"}
      </button>
    </div>
  );
};

export default Invoice;
