export const filterSalesByDateRange = (sales, startDate, endDate) => {
  return sales.filter((sale) => {
    const saleDate = new Date(sale.date);
    return saleDate >= startDate && saleDate <= endDate;
  });
};

export const aggregateSalesByPeriod = (sales, period) => {
  const aggregatedData = sales.reduce((acc, sale) => {
    const date = new Date(sale.date);
    let key;
    if (period === "day") {
      key = date.toISOString().split("T")[0]; // YYYY-MM-DD
    } else if (period === "month") {
      key = `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-MM
    } else if (period === "year") {
      key = `${date.getFullYear()}`; // YYYY
    }

    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += sale.totalPrice;
    return acc;
  }, {});

  return aggregatedData;
};
