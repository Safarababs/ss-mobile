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

  const exportToCSV = () => {
    const headers = [
      "Invoice Number",
      "Customer Name",
      "Total",
      "Profit",
      "Date",
    ];
    const rows = sales.map((sale) => [
      sale.invoiceNumber,
      sale.customerName,
      sale.total,
      sale.totalProfit,
      new Date(sale.date).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sales_data.csv";
    link.click();
  };

  const printInvoice = (sale) => {
    const printContent = `...`; // Same as your print logic

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.top = "-10000px";
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(printContent);
    doc.close();

    iframe.onload = () => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    };
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

      <div className="sales-table">
        {sales.length === 0 ? (
          <p>No sales found for the selected period.</p>
        ) : (
          <>
            <button className="export-btn" onClick={exportToCSV}>
              Export Data
            </button>
            <table>
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Customer Name</th>
                  <th>Total</th>
                  <th>Total Profit</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale._id}>
                    <td>{sale.invoiceNumber}</td>
                    <td>{sale.customerName}</td>
                    <td>{sale.total}</td>
                    <td>{sale.totalProfit}</td>
                    <td>{new Date(sale.date).toLocaleString()}</td>
                    <td>
                      <button onClick={() => printInvoice(sale)}>
                        Print Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default SalesRecord;
