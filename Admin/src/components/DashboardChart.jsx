import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const DashboardChart = ({
  products,
  users,
  orders,
  categories,
}) => {
  const data = {
    labels: [
      "Products",
      "Users",
      "Orders",
      "Categories",
    ],

    datasets: [
      {
        label: "Store Statistics",

        data: [
          products,
          users,
          orders,
          categories,
        ],

        backgroundColor: [
          "rgba(22, 101, 52, 0.75)",
          "rgba(15, 118, 110, 0.75)",
          "rgba(34, 197, 94, 0.75)",
          "rgba(74, 222, 128, 0.75)",
        ],

        borderRadius: 8,

        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#17291e",
        padding: 12,
        displayColors: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          precision: 0,
        },

        grid: {
          color: "#edf1ee",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="dashboard-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DashboardChart;