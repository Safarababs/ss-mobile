import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data";
import { addSale } from "../Sales/salesData";
import "./InvoicePage.css";
import Header from "./Header/Header";
import ItemSelection from "./ItemSelection/ItemSelection";
import InvoiceDisplay from "./InvoiceDisplay/InvoiceDisplay";
import InvoiceFooter from "./InvoiceFooter/InvoiceFooter";

const InvoicePage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0); // Discount in PKR
  const [searchQuery, setSearchQuery] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const navigate = useNavigate();

  const filteredItems = data.items.filter((item) =>
    searchQuery.trim() === ""
      ? true
      : item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.includes(searchQuery)
  );

  const handleSelectItem = (item) => {
    setItemCode(item.code);
    setItemName(item.name);
    setSearchQuery("");
  };

  const handleAddItem = () => {
    const item = data.items.find((i) => i.code === itemCode);
    if (item && item.quantity >= itemQuantity) {
      // Calculate total price before discount
      const totalPriceBeforeDiscount = item.salePrice * itemQuantity;

      const newItem = {
        ...item,
        quantity: itemQuantity,
        originalPrice: totalPriceBeforeDiscount, // Save original total price
        total: totalPriceBeforeDiscount, // Total before discount
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

  const calculateTotalBeforeDiscount = () => {
    return selectedItems.reduce((sum, item) => sum + item.originalPrice, 0);
  };

  const handlePrintAndAddSale = () => {
    const printInvoice = window.confirm("Do you want to print the invoice?");
    if (printInvoice) {
      window.print();
    }

    // Record sale with customer details and discount applied
    selectedItems.forEach((item) => {
      const totalPriceBeforeDiscount = item.originalPrice; // Total price before discount
      const finalPrice =
        item.originalPrice - (item.originalPrice * discount) / 100; // Apply discount percentage

      const sale = {
        code: item.code,
        name: item.name,
        quantity: item.quantity,
        totalPrice: finalPrice,
        originalPrice: totalPriceBeforeDiscount,
        purchasePrice: item.purchasePrice * item.quantity, // Actual purchase price
        customerName: customerName,
        customerPhone: customerPhone,
        date: new Date().toISOString(),
      };
      addSale(sale); // Ensure this function is imported and used correctly
    });
    navigate("/sales-summary"); // Redirect to sales summary after adding the sale
  };

  return (
    <div className="invoice">
      <Header
        customerName={customerName}
        setCustomerName={setCustomerName}
        customerPhone={customerPhone}
        setCustomerPhone={setCustomerPhone}
      />
      <ItemSelection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredItems={filteredItems}
        handleSelectItem={handleSelectItem}
        itemCode={itemCode}
        itemName={itemName}
        itemQuantity={itemQuantity}
        setItemQuantity={setItemQuantity}
        handleAddItem={handleAddItem}
      />
      <InvoiceDisplay
        selectedItems={selectedItems}
        handleRemoveItem={handleRemoveItem}
      />
      <InvoiceFooter
        selectedItems={selectedItems}
        discount={discount}
        setDiscount={setDiscount}
        calculateTotal={calculateTotalBeforeDiscount}
        handlePrint={handlePrintAndAddSale}
      />
    </div>
  );
};

export default InvoicePage;
