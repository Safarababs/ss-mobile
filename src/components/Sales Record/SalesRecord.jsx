import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./SalesRecord.css";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SalesRecord = () => {
  const [sales, setSales] = useState([]);
  const [period, setPeriod] = useState("daily");
  const [chartType, setChartType] = useState("line");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("date-newest");

  // Sort sales data based on the selected option
  const sortSales = (salesData, option) => {
    switch (option) {
      case "date-newest":
        return salesData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
      case "date-oldest":
        return salesData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });
      case "profit-highest":
        return salesData.sort((a, b) => b.profit - a.profit);
      case "profit-lowest":
        return salesData.sort((a, b) => a.profit - b.profit);
      default:
        return salesData;
    }
  };

  // Wrap generateChartData in useCallback to ensure it doesn't change on each render
  const generateChartData = useCallback(
    (salesData) => {
      if (!salesData || salesData.length === 0) return {};
      const labels = salesData.map((sale) =>
        new Date(sale.date).toLocaleDateString()
      );
      const salesTotal = salesData.map((sale) => sale.total);

      return {
        labels,
        datasets: [
          {
            label: "Sales Over Time",
            data: salesTotal,
            borderColor: "#36A2EB",
            backgroundColor:
              chartType === "line"
                ? "rgba(54, 162, 235, 0.2)"
                : "rgba(255, 99, 132, 0.2)",
            fill: true,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "#FF6384",
          },
        ],
      };
    },
    [chartType]
  );

  const fetchSales = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://abdmobiles-backend.onrender.com/api/sales?period=${period}`
      );
      const sortedSales = sortSales(response.data, sortOption);
      setSales(sortedSales);
      setChartData(generateChartData(sortedSales));
    } catch (error) {
      console.error("Error fetching sales:", error);
    } finally {
      setLoading(false);
    }
  }, [period, sortOption, generateChartData]);

  useEffect(() => {
    fetchSales();
  }, [period, sortOption, fetchSales]);

  const handleChartTypeChange = (type) => {
    setChartType(type);
    setChartData(generateChartData(sales));
  };

  const calculateTotalSales = () => {
    return sales.reduce((total, sale) => total + (sale.total || 0), 0);
  };

  const calculateTotalProfit = () => {
    return sales.reduce((total, sale) => total + (sale.profit || 0), 0);
  };

  const calculateTotalLoss = () => {
    return sales.reduce((total, sale) => total + (sale.loss || 0), 0);
  };

  return (
    <div className="sales-record-container">
      <h2>Sales Record</h2>

      <div className="period-select">
        <label htmlFor="period">Select Period:</label>
        <select
          id="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="sort-select">
        <label htmlFor="sortOption">Sort By:</label>
        <select
          id="sortOption"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date-newest">Date (Newest)</option>
          <option value="date-oldest">Date (Oldest)</option>
          <option value="profit-highest">Profit (Highest)</option>
          <option value="profit-lowest">Profit (Lowest)</option>
        </select>
      </div>

      <div className="chart-controls">
        <button onClick={() => handleChartTypeChange("line")}>
          Line Chart
        </button>
        <button onClick={() => handleChartTypeChange("bar")}>Bar Chart</button>
      </div>

      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div className="chart-container">
          <h3>Sales for {period}</h3>
          {chartData.labels && chartData.labels.length > 0 ? (
            chartType === "line" ? (
              <Line data={chartData} />
            ) : (
              <Bar data={chartData} />
            )
          ) : (
            <p>No sales data available for the selected period.</p>
          )}
        </div>
      )}

      <div className="sales-table-container">
        <h3>Sales Data for {period}</h3>
        {sales.length > 0 ? (
          <table className="sales-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Item Name</th>
                <th>Total Sales</th>
                <th>Profit</th>
                <th>Loss</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id}>
                  <td>{new Date(sale.date).toLocaleDateString()}</td>
                  {sale.itemsSold.map((item, index) => (
                    <React.Fragment key={index}>
                      <td>{item.name}</td>
                      <td>{item.salePrice}</td>
                      <td>{item.profit}</td>
                      <td>{item.loss}</td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sales data available for the selected period.</p>
        )}
      </div>

      <div className="total-sales">
        <p>Total Sales: PKR {calculateTotalSales()}</p>
        <p>Total Profit: PKR {calculateTotalProfit()}</p>
        <p>Total Loss: PKR {calculateTotalLoss()}</p>
      </div>
    </div>
  );
};

export default SalesRecord;
