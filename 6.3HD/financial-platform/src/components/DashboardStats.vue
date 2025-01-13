<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            @click="sortBy(header.key)"
          >
            <span>{{ header.label }}</span>
            <!-- Show an up/down arrow for the current sort -->
            <i
              v-if="currentSort === header.key"
              :class="currentSortDir === 'asc' ? 'icon-up' : 'icon-down'"
            ></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Single template v-for to keep ESLint happy -->
        <template v-for="row in sortedData" :key="row.ticker">
          <!-- Main row for each ticker -->
          <!-- Clicking the row toggles chart -->
          <tr @click="toggleChart(row.ticker)" class="clickable-row">
            <td>{{ row.ticker }}</td>
            <td>${{ row.price.toFixed(2) }}</td>
            <td
              :class="{
                positive: row.changeAmount > 0,
                negative: row.changeAmount < 0,
              }"
            >
              {{ row.changeAmount.toFixed(2) }}
            </td>
            <td
              :class="{
                positive: parseFloat(row.changePercentage) > 0,
                negative: parseFloat(row.changePercentage) < 0,
              }"
            >
              {{ row.changePercentage }}
            </td>
            <td>{{ row.volume.toLocaleString() }}</td>
          </tr>

          <!-- Conditional chart row -->
          <tr v-if="chartDataMap[row.ticker]">
            <td colspan="5">
              <!-- StockChart component, using the data from chartDataMap -->
              <StockChart
                :symbol="row.ticker"
                :chartData="chartDataMap[row.ticker]"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script src="@/scripts/dashboardStats"></script>

<style scoped src="@/styles/tables.css"></style>
