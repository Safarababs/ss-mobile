const salesData = {
  daily: [],
  weekly: [],
  monthly: [],
  yearly: [],
};

// Function to add a sale to the appropriate categories
export const addSale = (sale) => {
  const now = new Date();
  const day = now.toISOString().split("T")[0]; // YYYY-MM-DD format
  const week = `${now.getFullYear()}-W${Math.ceil(now.getDate() / 7)}`; // Year-Week number
  const month = `${now.getFullYear()}-${now.getMonth() + 1}`; // YYYY-MM format
  const year = now.getFullYear(); // YYYY

  salesData.daily.push({ ...sale, date: day });
  salesData.weekly.push({ ...sale, date: week });
  salesData.monthly.push({ ...sale, date: month });
  salesData.yearly.push({ ...sale, date: year });
};

// Function to get sales records by category
export const getSalesByCategory = (category) => {
  return salesData[category] || [];
};

export default salesData;
