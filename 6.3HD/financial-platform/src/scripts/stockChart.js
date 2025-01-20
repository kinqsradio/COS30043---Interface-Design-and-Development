import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "StockChart",
  props: {
    /**
     * The time series data array from TimeSeriesDailyModel.timeSeries
     * Each entry: { date, open, high, low, close, volume }
     */
    chartData: {
      type: Array,
      required: false,
      default: null,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;

    // Watch for changes in props.chartData
    watch(
      () => props.chartData,
      (newValue) => {
        if (newValue) {
          console.log("[StockChart] watch -> newValue:", newValue);
          renderChart(newValue);
        }
      }
    );

    onMounted(() => {
      if (props.chartData) {
        console.log("[StockChart] onMounted -> chartData:", props.chartData);
        renderChart(props.chartData);
      }
    });

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    function renderChart(data) {
      if (!chartCanvas.value) {
        console.log("[StockChart] No canvas ref found!");
        return;
      }

      if (chartInstance) {
        chartInstance.destroy();
      }

      // Debug logs
      console.log("[StockChart] renderChart -> data:", data);
      if (!Array.isArray(data) || data.length === 0) {
        console.warn("[StockChart] data is empty or not an array.");
      }

      // If "date" is not a valid string, Chart.js might not plot
      const labels = data.map((entry) => entry.date).reverse();
      const closePrices = data.map((entry) => entry.close).reverse();

      console.log("[StockChart] labels:", labels);
      console.log("[StockChart] closePrices:", closePrices);

      chartInstance = new Chart(chartCanvas.value, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: `Daily Close - ${props.symbol}`,
              data: closePrices,
              borderColor: "blue",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: { display: true, text: "Date" },
              ticks: { maxRotation: 90, minRotation: 45 },
            },
            y: {
              title: { display: true, text: "Price" },
            },
          },
        },
      });
    }

    return {
      chartCanvas,
    };
  },
};