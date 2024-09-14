"use client";
import React, { useState, useEffect } from "react";
import { getRevenues } from "@/app/actions/dashboardActions";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RevenueBarChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchRevenues() {
      try {
        const revenues = await getRevenues();
        setChartData({
          labels: Object.keys(revenues), 
          datasets: [
            {
              label: "Revenue for Each Week",
              data: Object.values(revenues), 
              backgroundColor: Object.values(revenues).map((_, index) =>
                getRandomColor(index)
              ), 
              borderColor: Object.values(revenues).map((_, index) =>
                getRandomColor(index)
              ),
              borderWidth: 1, 
            },
          ],
        });
      } catch (e) {
        console.error("Failed to load revenues: ", e);
      }
    }

    fetchRevenues();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", 
      },
      title: {
        display: true,
        text: "Weekly Revenue Overview", 
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Week",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue (in $)",
        },
        beginAtZero: true, 
      },
    },
  };

  function getRandomColor(index) {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#E7E9ED",
    ];
    return colors[index % colors.length]; 
  }

  return <Bar options={options} data={chartData} />;
}

export default RevenueBarChart;
