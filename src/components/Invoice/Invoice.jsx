import React, { useState } from "react";
import data from "../../data";
import "./InvoicePage.css";

const InvoicePage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Filter items based on search query
  const filteredItems = data.items.filter((item) =>
    searchQuery.trim() === ""
      ? true
      : item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.includes(searchQuery)
  );

  const handleSelectItem = (item) => {
    setItemCode(item.code);
    setItemName(item.name);
    setSearchQuery(""); // Clear search query to hide search results
  };

  const handleAddItem = () => {
    const item = data.items.find((i) => i.code === itemCode);
    if (item && item.quantity >= itemQuantity) {
      const doubledPrice = item.purchasePrice * 2;
      const newItem = {
        ...item,
        quantity: itemQuantity,
        total: doubledPrice * itemQuantity,
      };
      setSelectedItems([...selectedItems, newItem]);
      setItemCode("");
      setItemName("");
      setSearchQuery("");
      setItemQuantity(1);
    } else {
      alert("Item not available or insufficient stock");
    }
  };

  const handleRemoveItem = (code) => {
    setSelectedItems(selectedItems.filter((item) => item.code !== code));
  };

  const calculateTotal = () => {
    const subtotal = selectedItems.reduce((sum, item) => sum + item.total, 0);
    const total = subtotal - discount;
    return total > 0 ? total : 0;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice">
      <header>
        <h1>SS Mobiles</h1>
        <p className="tagline">Your trusted mobile accessories shop</p>
        <div className="customer-info">
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </div>
      </header>

      <section className="item-selection">
        <input
          type="text"
          placeholder="Search items by name or code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <div className="search-results">
            {filteredItems.map((item) => (
              <div
                key={item.code}
                className="search-result"
                onClick={() => handleSelectItem(item)}
              >
                {item.name} - {item.purchasePrice * 2} ({item.quantity})
              </div>
            ))}
          </div>
        )}
        {itemCode && (
          <div className="selected-item">
            <p>Selected Item: {itemName}</p>
            <input
              type="number"
              placeholder="Quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
            <button onClick={handleAddItem}>Add Item</button>
          </div>
        )}
      </section>

      <section className="invoice-display">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr key={item.code}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{(item.purchasePrice * 2).toFixed(2)}</td>
                <td>{item.total.toFixed(2)}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(item.code)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="invoice-footer">
        <div className="discount">
          <label>Discount:</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value))}
          />
        </div>
        <div className="totals">
          <div className="subtotal-row">
            <p>Subtotal:</p>
            <span>
              {selectedItems
                .reduce((sum, item) => sum + item.total, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="discount-row">
            <p>Discount:</p>
            <span>{(-discount).toFixed(2)}</span>
          </div>
          <div className="total-row">
            <p>Total After Discount:</p>
            <span>{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        <button onClick={handlePrint}>Print Invoice</button>
        <p className="goodbye-message">
          Thank you for your purchase! We appreciate your trust and wish you all
          the best!
        </p>
      </section>
    </div>
  );
};

export default InvoicePage;
