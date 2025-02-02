import { sortData } from "@/scripts/tableSorting.js";
import StockChart from "@/components/StockChart.vue";
import StockService from "@/services/StockService";

export default {
  name: "PortfolioTable",
  components: {
    StockChart,
  },
  props: {
    portfolio: {
      type: Array,
      required: true,
    },
  },
  emits: ["sell", "updatePortfolio"],
  data() {
    return {
      sortedColumn: null,
      sortDirection: "asc",
      /**
       * chartDataMap is an object keyed by symbol
       * { "Ticker": [ { date, open, high, low, close, volume }, ... ] }
       */
      chartDataMap: {},
    };
  },
  methods: {
    /**
     * Sort the portfolio when a header is clicked.
     * Then emit the new sorted data to the parent.
     */
    onHeaderClick(columnKey) {
      if (this.sortedColumn === columnKey) {
        // Toggle asc <-> desc
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortedColumn = columnKey;
        this.sortDirection = "asc";
      }

      // Sort a copy of the portfolio
      const sorted = sortData([...this.portfolio], this.sortedColumn, this.sortDirection);

      // Emit the sorted array back to the parent
      this.$emit("updatePortfolio", sorted);
    },

    /**
     * Return the arrow icon classes for a sorted column.
     */
    headerArrowClass(columnKey) {
      if (this.sortedColumn !== columnKey) return "";
      return this.sortDirection === "asc" ? "icon-up" : "icon-down";
    },

    /**
     * Notify the parent to sell shares for this index.
     */
    sellShares(index) {
      this.$emit("sell", index);
    },

    /**
     * Calculate a unrealized gain/loss.
     */
    calculateGainLoss(entry) {
      if (!entry.currentPrice) return "Loading...";
      const gainLoss = (entry.currentPrice - entry.price) * entry.shares;
      return `$${gainLoss.toFixed(2)}`;
    },

    /**
     * Return positive or negative CSS class to color the gain/loss.
     */
    getGainLossClass(entry) {
      const gainLoss = (entry.currentPrice - entry.price) * entry.shares;
      return gainLoss >= 0 ? "positive" : "negative";
    },

    /**
     * Show/hide the chart row for a given symbol.
     * If have no data, fetch from StockService, parse with TimeSeriesDailyModel.
     */
    async toggleChart(symbol) {
      if (this.chartDataMap[symbol]) {
        // Hide it
        delete this.chartDataMap[symbol];
      } else {
        try {
          const data = await StockService.getDailyData(symbol);
          console.log(`Received time series data for: ${symbol}`, data);
          this.chartDataMap[symbol] = data.timeSeries;
        } catch (error) {
          console.error("Error fetching time series for", symbol, error);
          alert(`Could not fetch time series for ${symbol}`);
        }
      }
    },
  },
};