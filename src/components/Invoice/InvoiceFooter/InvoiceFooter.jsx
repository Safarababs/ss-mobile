import React from "react";

const InvoiceFooter = ({
  selectedItems,
  discount,
  setDiscount,
  calculateTotal,
  handlePrint,
}) => {
  // Calculate subtotal based on original prices
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.originalPrice,
    0
  );

  // Calculate discount amount
  const discountAmount = (subtotal * discount) / 100;

  // Calculate final total after discount
  const finalTotal = subtotal - discountAmount;

  return (
    <section className="invoice-footer">
      <div className="discount">
        <label>Discount (%):</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} // Handle invalid input
        />
      </div>
      <div className="totals">
        <div className="subtotal-row">
          <p>Subtotal:</p>
          <span>{subtotal.toFixed(2)}</span>
        </div>
        <div className="discount-row">
          <p>Discount:</p>
          <span>{discountAmount.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <p>Total After Discount:</p>
          <span>{finalTotal.toFixed(2)}</span>
        </div>
      </div>
      <button onClick={handlePrint}>Sale Submit</button>
      <p className="goodbye-message">
        Returnable? ________________ Warranty? ________________
      </p>
      <p className="goodbye-message">
        Thank you for your purchase! We appreciate your trust and wish you all
        the best!
      </p>
    </section>
  );
};

export default InvoiceFooter;
