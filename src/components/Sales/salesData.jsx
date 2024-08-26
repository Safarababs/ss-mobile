// src/Sales/salesData.js

// Initialize sales from localStorage
let sales = JSON.parse(localStorage.getItem("salesData")) || [];

// Function to add a sale to the sales array
export const addSale = (sale) => {
  sales.push(sale);
  localStorage.setItem("salesData", JSON.stringify(sales));
};

// Function to retrieve sales data based on a date range
export const getSalesByDateRange = (startDate, endDate) => {
  return sales.filter((sale) => {
    const saleDate = new Date(sale.date);
    return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
  });
};

// Function to get sales for a specific day
// Function to get sales for a specific day
export const getDailySales = (date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0); // Set to start of the day
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999); // Set to end of the day

  return getSalesByDateRange(startOfDay.toISOString(), endOfDay.toISOString());
};

// Function to get sales for a specific week
export const getWeeklySales = (startDate, endDate) =>
  getSalesByDateRange(startDate, endDate);

// Function to get sales for a specific month
export const getMonthlySales = (year, month) => {
  // Construct the start and end dates for the month
  const startDate = new Date(year, month - 1, 1).toISOString();
  const endDate = new Date(year, month, 0).toISOString(); // Last day of the month
  return getSalesByDateRange(startDate, endDate);
};

// Function to get sales for a specific year
export const getYearlySales = (year) => {
  // Construct the start and end dates for the year
  const startDate = new Date(year, 0, 1).toISOString();
  const endDate = new Date(year, 12, 0).toISOString(); // Last day of the year
  return getSalesByDateRange(startDate, endDate);
};
