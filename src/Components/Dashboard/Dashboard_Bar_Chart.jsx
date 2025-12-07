import React, { useEffect } from "react";
import { useDashboard_Context } from "../../Context/Dashboard_Context";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";


const Dashboard_Bar_Chart = () => {
  const { dashboard, updateDashboardState, fetchDashboardData } = useDashboard_Context()
  useEffect(() => { fetchDashboardData(1) }, [dashboard.search]);
  const { annual_report_chart } = dashboard.data;

  const data_table = {
    labels: annual_report_chart?.labels,
    datasets: [{
      borderWidth: 1,
      label: `Annual Calculation ${annual_report_chart?.year} `,
      data: annual_report_chart?.data,
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
      borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
    }]
  };

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } },
    // plugins: { legend: { display: true }, title: { display: true, text: "Dashboard Bar Chart" } },
  };

  return (
    <div style={{ height: "350px" }}>
      <Bar data={data_table} options={options} />
    </div>
  )
}

export default Dashboard_Bar_Chart