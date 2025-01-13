import React, { useState, useEffect } from "react";
import "./Inventory.css";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading
  const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order

  useEffect(() => {
    const fetchItems = async () => {
      const url = "https://abdmobiles-backend.onrender.com/api/items";

      setLoading(true); // Start loading
      try {
        const response = await fetch(url);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchItems();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = () => {
    // Toggle the sort order between ascending and descending
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort items by item code
  const sortedItems = [...items].sort((a, b) => {
    const codeA = a.code.toLowerCase();
    const codeB = b.code.toLowerCase();
    if (sortOrder === "asc") {
      return codeA > codeB ? 1 : -1; // Ascending order
    } else {
      return codeA < codeB ? 1 : -1; // Descending order
    }
  });

  const filteredItems = sortedItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.code.toLowerCase().includes(searchQuery)
  );

  // Calculate total investment money (purchasePrice * quantity) only if quantity > 0
  const totalInvestment = filteredItems.reduce((total, item) => {
    const purchasePrice = item.purchasePrice || 0; // Ensure purchasePrice exists
    const quantity = item.quantity || 0; // Ensure quantity exists
    if (quantity > 0) {
      return total + purchasePrice * quantity;
    }
    return total; // Don't add if quantity is 0
  }, 0);

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
        {loading ? ( // Show loading spinner if loading
          <div className="loading-spinner">
            <p>Please wait, loading...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div>
            <button onClick={handleSort} className="sort">
              Sort by Code ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Sale Price</th>
                  <th>Purchase Price</th>{" "}
                  {/* Add Purchase Price to the table */}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.salePrice}</td>
                    <td>{item.purchasePrice}</td> {/* Display Purchase Price */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-investment">
              <h3>Total: PKR {totalInvestment.toFixed(2)}/..</h3>
            </div>
          </div>
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
