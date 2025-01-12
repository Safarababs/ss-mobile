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
} from "chart.js"; // Import Filler
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
  Filler // Register Filler plugin
);

const SalesRecord = () => {
  const [sales, setSales] = useState([]);
  const [period, setPeriod] = useState("daily");
  const [chartType, setChartType] = useState("line");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

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
            fill: true, // The 'fill' option requires the Filler plugin
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "#FF6384",
          },
        ],
      };
    },
    [chartType]
  ); // Depend on chartType

  const fetchSales = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://abdmobiles-backend.onrender.com/api/sales?period=${period}`
      );
      console.log(response.data); // Check if data is being fetched
      setSales(response.data);
      setChartData(generateChartData(response.data)); // Make sure it's included
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  }, [period, generateChartData]); // Include generateChartData here

  useEffect(() => {
    fetchSales();
  }, [period, fetchSales]);

  const handleChartTypeChange = (type) => {
    setChartType(type);
    setChartData(generateChartData(sales));
  };

  // Calculate total sum of sales, total profit, and total loss
  const calculateTotalSales = () => {
    return sales.reduce((total, sale) => total + sale.total, 0);
  };

  const calculateTotalProfit = () => {
    return sales.reduce((total, sale) => total + sale.profit, 0);
  };

  const calculateTotalLoss = () => {
    return sales.reduce((total, sale) => total + sale.loss, 0);
  };

  return (
    <div className="sales-record-container">
      <h2>Sales Record</h2>

      <div className="period-buttons">
        <button onClick={() => setPeriod("daily")}>Daily</button>
        <button onClick={() => setPeriod("weekly")}>Weekly</button>
        <button onClick={() => setPeriod("monthly")}>Monthly</button>
        <button onClick={() => setPeriod("yearly")}>Yearly</button>
      </div>

      <div className="chart-controls">
        <button onClick={() => handleChartTypeChange("line")}>
          Line Chart
        </button>
        <button onClick={() => handleChartTypeChange("bar")}>Bar Chart</button>
      </div>

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

      {/* Display Sales in Table Format */}
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
                  {/* Render itemsSold array */}
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
        <p>Total Sales: PKR {calculateTotalSales()} </p>
        <p>Total Profit: PKR {calculateTotalProfit()}</p>
        <p>Total Loss: PKR {calculateTotalLoss()}</p>
      </div>
    </div>
  );
};

export default SalesRecord;
