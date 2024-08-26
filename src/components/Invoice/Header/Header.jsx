import React from "react";

const Header = ({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
}) => (
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
);

export default Header;
