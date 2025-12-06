import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // 12 months

const data = {
  labels,
  datasets: [{
    borderWidth: 1,
    label: "Annual Calculation",
    data: [65, 59, 80, 81, 56, 55, 40, 56, 78, 41, 23, 85],
    backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
    borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
  }],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: { y: { beginAtZero: true } },
  // plugins: { legend: { display: true }, title: { display: true, text: "Dashboard Bar Chart" } },
};

const Dashboard_Bar_Chart = () => {
  return (
    <div style={{ height: 320 }}>
      <Bar data={data} options={options} />
    </div>
  )
}

export default Dashboard_Bar_Chart