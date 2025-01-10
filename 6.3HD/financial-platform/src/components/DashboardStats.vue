<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.key" @click="sortBy(header.key)">
            <span>{{ header.label }}</span>
            <i
              v-if="currentSort === header.key"
              :class="currentSortDir === 'asc' ? 'icon-up' : 'icon-down'"
            ></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in sortedData" :key="row.ticker">
          <td>{{ row.ticker }}</td>
          <td>${{ row.price.toFixed(2) }}</td>
          <td :class="{ positive: row.changeAmount > 0, negative: row.changeAmount < 0 }">
            {{ row.changeAmount.toFixed(2) }}
          </td>
          <td :class="{ positive: parseFloat(row.changePercentage) > 0, negative: parseFloat(row.changePercentage) < 0 }">
            {{ row.changePercentage }}
          </td>
          <td>{{ row.volume.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { sortData } from "@/scripts/tableSorting";

export default {
  name: "DashboardStats",
  props: {
    data: {
      type: Array,
      required: true,
    },
    defaultSortKey: {
      type: String,
      default: "changePercentage", // Default key to sort by
    },
    defaultSortDir: {
      type: String,
      default: "desc", // Default sorting direction
    },
  },
  data() {
    return {
      currentSort: this.defaultSortKey, // Set initial sort key dynamically
      currentSortDir: this.defaultSortDir, // Set initial sort direction dynamically
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
  },
};
</script>


<style scoped src="@/styles/tables.css"></style> <!-- Use shared table styles -->
