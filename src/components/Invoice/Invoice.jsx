import React, { useState, useEffect } from "react";
import api from "../../axios"; // Replace with your axios configuration
import "./Invoice.css";

const Invoice = () => {
  const [items, setItems] = useState([]); // All items from the database
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedItems, setSelectedItems] = useState({}); // Store selected items
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items based on search term

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/items"); // Fetch items from your API
        const itemsWithQuantity = response.data.map((item) => ({
          ...item,
          quantity: item.quantity.$numberInt
            ? parseInt(item.quantity.$numberInt)
            : item.quantity,
          stock: item.stock || 0, // Ensure stock is included in the item
        }));
        setItems(itemsWithQuantity);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    // Filter items based on search term (code or name)
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

  // Handle adding item to selected items list
  const handleAddItem = (item) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };

      // Check if the item is already in the cart
      if (updatedItems[item._id]) {
        // If the item is already in the cart, check if the quantity is less than the stock
        if (updatedItems[item._id].quantity < item.stock) {
          updatedItems[item._id].quantity += 1; // Increase the quantity by 1
        } else {
          alert(
            `Stock limit reached for ${item.name}. Only ${item.stock} items available.`
          );
        }
      } else {
        // If the item is not in the cart, add it with quantity 1
        updatedItems[item._id] = { ...item, quantity: 1 };
      }
      return updatedItems;
    });
  };

  // Handle price change for an item
  const handlePriceChange = (id, newPrice) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      const item = updatedItems[id];
      item.salePrice = newPrice; // Update the sale price
      return updatedItems;
    });
  };

  // Handle removing an item from the selected items list
  const handleRemoveItem = (id) => {
    setSelectedItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[id]; // Remove the item by its id
      return updatedItems;
    });
  };

  // Calculate total amount based on updated prices
  const calculateTotal = () => {
    return Object.values(selectedItems).reduce(
      (total, item) => total + item.salePrice * item.quantity,
      0
    );
  };

  // Handle submitting the sale
  const handleSubmit = async () => {
    const saleData = {
      customerName,
      customerPhone,
      itemsSold: Object.values(selectedItems).map((item) => ({
        _id: item._id,
        name: item.name,
        salePrice: item.salePrice,
        quantity: item.quantity,
        code: item.code,
      })),
      total: calculateTotal(), // Send the total after price changes
    };

    try {
      await api.post("/sales", saleData); // Submit sale
      alert("Sale submitted successfully!");
    } catch (error) {
      console.error("Error submitting sale:", error);
    }
  };

  return (
    <div className="invoice-page">
      <h2>ABD Mobiles & Accessories</h2>
      <div className="invoice-section">
        <label>Customer Name: </label>
        <input
          type="text"
          className="invoice-input"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="invoice-section">
        <label>Customer Phone: </label>
        <input
          type="text"
          className="invoice-input"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
        />
      </div>

      <div className="search-section">
        <label>Select Items: </label>
        <input
          type="text"
          className="invoice-input"
          placeholder="Search items by code or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredItems.length > 0 && (
          <ul className="item-list">
            {filteredItems.map((item) => (
              <li
                key={item._id}
                onClick={() => handleAddItem(item)}
                className={`item-list-item ${
                  item.quantity === 0 ? "out-of-stock" : ""
                }`}
              >
                {item.name} (Code: {item.code}) - (PKR {item.salePrice}) |
                Stock: {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="selected-items">
        <h3>Selected Items</h3>
        <table className="selected-items-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(selectedItems).map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    value={item.salePrice}
                    onChange={(e) =>
                      handlePriceChange(item._id, e.target.value)
                    }
                    min="0"
                  />
                </td>
                <td>{item.quantity}</td> {/* Display quantity */}
                <td>{item.salePrice * item.quantity}</td> {/* Total price */}
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-section">
          <h3>Total:</h3>
          <p className="total-price">PKR {calculateTotal()}/-</p>
        </div>
      </div>

      <div className="submit-section">
        <button className="submit-button" onClick={handleSubmit}>
          Submit Sale
        </button>
      </div>
    </div>
  );
};

export default Invoice;
