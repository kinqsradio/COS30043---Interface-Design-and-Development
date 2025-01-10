<template>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Average Purchase Price</th>
            <th>Total Shares</th>
            <th>Current Price</th>
            <th>Unrealized Gain/Loss</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in portfolio" :key="entry.symbol">
            <td>{{ entry.symbol }}</td>
            <td>{{ entry.price.toFixed(2) }}</td>
            <td>{{ entry.shares }}</td>
            <td>{{ entry.currentPrice || "Loading..." }}</td>
            <td :class="getGainLossClass(entry)">
              {{ calculateGainLoss(entry) }}
            </td>
            <td>
              <button @click="sellShares(index)">Sell</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "PortfolioTable",
    props: {
      portfolio: {
        type: Array,
        required: true,
      },
    },
    emits: ["sell"],
    methods: {
      /**
       * Emit the sell action to the parent component.
       */
      sellShares(index) {
        this.$emit("sell", index);
      },
      /**
       * Calculate unrealized gain or loss for a stock.
       */
      calculateGainLoss(entry) {
        if (!entry.currentPrice) return "Loading...";
        const gainLoss = (entry.currentPrice - entry.price) * entry.shares;
        return `$${gainLoss.toFixed(2)}`;
      },
      /**
       * Get the class for positive or negative gain/loss.
       */
      getGainLossClass(entry) {
        const gainLoss = (entry.currentPrice - entry.price) * entry.shares;
        return gainLoss >= 0 ? "positive" : "negative";
      },
    },
  };
  </script>
  
  <style scoped src="../styles/tables.css"></style>
  