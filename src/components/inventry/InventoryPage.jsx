// InventoryPage.js
import React, { useState, useEffect } from "react";
import "./Inventory.css";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://abdmobiles-backend.onrender.com/api/items"
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.code.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="inventory-page">
      <h1>Inventory</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or code"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="inventory-table-container">
        {filteredItems.length > 0 ? (
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Purchase Price</th>
                <th>Sale Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.purchasePrice}</td>
                  <td>{item.salePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
