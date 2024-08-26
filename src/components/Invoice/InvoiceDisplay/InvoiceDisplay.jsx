import React from "react";

const InvoiceDisplay = ({ selectedItems, handleRemoveItem }) => (
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
            <td>{item.salePrice}</td>
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
);

export default InvoiceDisplay;
