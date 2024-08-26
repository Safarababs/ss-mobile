// src/components/Invoice/ItemSelection/ItemSelection.jsx
import React from "react";

const ItemSelection = ({
  searchQuery,
  setSearchQuery,
  filteredItems,
  handleSelectItem,
  itemCode,
  itemName,
  itemQuantity,
  setItemQuantity,
  handleAddItem,
}) => (
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
            {item.name} - {item.salePrice} ({item.quantity})
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
);

export default ItemSelection;
