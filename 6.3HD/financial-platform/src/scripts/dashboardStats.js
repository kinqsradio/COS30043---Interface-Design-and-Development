import { sortData } from "@/scripts/tableSorting.js";
import StockChart from "@/components/StockChart.vue";
import StockService from "@/services/StockService"; // or your actual path

export default {
  name: "DashboardStats",
  components: {
    StockChart,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    defaultSortKey: {
      type: String,
      default: "changePercentage",
    },
    defaultSortDir: {
      type: String,
      default: "desc",
    },
  },
  data() {
    return {
      currentSort: this.defaultSortKey,
      currentSortDir: this.defaultSortDir,
      // Holds chart data for each ticker, e.g. { "AAPL": [{date, close,...}], ... }
      chartDataMap: {},
    };
  },
  computed: {
    headers() {
      return [
        { key: "ticker", label: "Ticker" },
        { key: "price", label: "Price" },
        { key: "changeAmount", label: "Change Amount" },
        { key: "changePercentage", label: "Change Percentage" },
        { key: "volume", label: "Volume" },
      ];
    },
    sortedData() {
      // Use your existing tableSorting logic
      return sortData(this.data, this.currentSort, this.currentSortDir);
    },
  },
  methods: {
    sortBy(key) {
      if (this.currentSort === key) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      } else {
        this.currentSort = key;
        this.currentSortDir = "asc";
      }
    },

    /**
     * Toggle the chart row for the given ticker.
     * If there's already data in chartDataMap[ticker], remove it (hide the chart).
     * Otherwise, fetch daily data from the service and store in chartDataMap.
     */
    async toggleChart(ticker) {
      if (this.chartDataMap[ticker]) {
        // Hide chart by removing its data
        delete this.chartDataMap[ticker];
      } else {
        try {
          // Example: fetch time series daily from your backend or Alpha Vantage
          const data = await StockService.getDailyData(ticker);
          // Assign so Vue's reactivity sees the new property
          this.chartDataMap[ticker] = data.timeSeries;
        } catch (error) {
          console.error("Error fetching time series for", ticker, error);
          alert(`Could not fetch time series for ${ticker}`);
        }
      }
    },
  },
};