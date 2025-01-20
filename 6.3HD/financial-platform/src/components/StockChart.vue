<template>
  <div v-if="chartData" class="stock-chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script src="@/scripts/stockChart.js"></script>

<style scoped>
.stock-chart {
  width: 100%;
  height: 300px;
  margin-top: 1rem;
}
</style>
