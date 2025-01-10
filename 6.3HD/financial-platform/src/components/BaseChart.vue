<template>
    <div>
      <canvas id="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart } from "chart.js";
  
  export default {
    name: "ChartComponent",
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const labels = Object.keys(this.data).reverse(); // Dates
        const prices = labels.map((key) => this.data[key]["4. close"]); // Closing prices
  
        new Chart(document.getElementById("chart"), {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "Closing Price",
                data: prices,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
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
                  text: "Price (USD)",
                },
              },
            },
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  canvas {
    width: 100%;
    height: 400px;
  }
  </style>
  