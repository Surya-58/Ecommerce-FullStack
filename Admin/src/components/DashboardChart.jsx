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

const DashboardChart = () => {
  const data = {
    labels: ["Products", "Users", "Orders", "Categories"],
    datasets: [
      {
        label: "Dashboard Stats",
        data: [12, 19, 8, 5],
      },
    ],
  };
  return <Bar data={data} />;
};

export default DashboardChart;
