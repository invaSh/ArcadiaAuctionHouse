"use client";
import React, { useState, useEffect } from "react";
import { getWeeklyBids } from "@/app/actions/bidActions";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function weeklyBids() {
      try {
        const bids = await getWeeklyBids();
        setChartData({
          labels: bids.map((bid) => bid.date),
          datasets: [
            {
                label: "No. of Bids",
                data: bids.map((n) => n.count),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)", 
                fill: true, 
                tension: 0.5, 
                pointBackgroundColor: "rgba(255, 99, 132, 1)", 
                pointBorderColor: "#fff", 
                pointHoverBackgroundColor: "#fff", 
                pointHoverBorderColor: "rgba(255, 99, 132, 1)", 
            },
            
          ],
        });
      } catch (e) {
        console.error("Failed to load bids: ", e);
      }
    }

    weeklyBids();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      title: {
        display: true,
        text: "Weekly Bid Activity", 
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Bids",
        },
      },
    },
  };

  return <Line options={options} data={chartData} />;
}

export default LineChart;
