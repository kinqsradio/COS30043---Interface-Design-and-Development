<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <!-- Clickable headers to trigger sorting -->
          <th @click="onHeaderClick('symbol')">
            Symbol
            <span :class="headerArrowClass('symbol')"></span>
          </th>
          <th @click="onHeaderClick('price')">
            Average Purchase Price
            <span :class="headerArrowClass('price')"></span>
          </th>
          <th @click="onHeaderClick('shares')">
            Total Shares
            <span :class="headerArrowClass('shares')"></span>
          </th>
          <th @click="onHeaderClick('currentPrice')">
            Current Price
            <span :class="headerArrowClass('currentPrice')"></span>
          </th>
          <th>Unrealized Gain/Loss</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Single template v-for to avoid ESLint issues -->
        <template v-for="(entry, index) in portfolio" :key="entry.symbol">
          <!-- Main row for the stock -->
          <!-- Clicking anywhere on the row toggles the chart -->
          <tr @click="toggleChart(entry.symbol)" class="clickable-row">
            <td>{{ entry.symbol }}</td>
            <td>{{ entry.price.toFixed(2) }}</td>
            <td>{{ entry.shares }}</td>
            <td>{{ entry.currentPrice || "Loading..." }}</td>
            <td :class="getGainLossClass(entry)">
              {{ calculateGainLoss(entry) }}
            </td>
            <td>
              <!-- Stop row click when user clicks Sell -->
              <button @click.stop="sellShares(index)">Sell</button>
            </td>
          </tr>

          <!-- Conditionally show the chart row if we have data for this symbol -->
          <tr v-if="chartDataMap[entry.symbol]">
            <td colspan="6">
              <!-- StockChart component, fed from chartDataMap -->
              <StockChart
                :symbol="entry.symbol"
                :chartData="chartDataMap[entry.symbol]"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script src="@/scripts/portfolioTable"></script>
<style scoped src="@/styles/tables.css"></style>