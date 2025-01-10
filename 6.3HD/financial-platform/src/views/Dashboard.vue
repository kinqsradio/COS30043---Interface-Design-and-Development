<template>
  <div class="container py-4">
    <h1 class="text-center mb-4">Market Overview</h1>

    <!-- Category Selection Buttons -->
    <div class="d-flex justify-content-center flex-wrap mb-4">
      <button
        v-for="category in categories"
        :key="category.key"
        @click="selectCategory(category.key)"
        :class="['btn', 'btn-lg', 'me-2', 'mb-2', selectedCategory === category.key ? 'btn-primary' : 'btn-outline-primary']"
      >
        {{ category.label }}
      </button>
    </div>

    <!-- Data Table -->
    <div class="table-responsive">
      <dashboard-stats
        v-if="selectedData.length"
        :data="selectedData"
        :defaultSortKey="getDefaultSortKey"
        :defaultSortDir="'desc'"
      />

      <p v-else class="text-center text-muted">Loading data...</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import DashboardStats from "@/components/DashboardStats.vue";

export default {
  name: "DashboardPage",
  components: {
    DashboardStats,
  },
  data() {
    return {
      categories: [
        { key: "gainers", label: "Top Gainers" },
        { key: "losers", label: "Top Losers" },
        { key: "active", label: "Most Active" },
      ],
    };
  },
  computed: {
    ...mapState("dashboard", ["selectedCategory"]),
    ...mapGetters("dashboard", ["selectedData"]),
    getDefaultSortKey() {
      if (this.selectedCategory === "gainers" || this.selectedCategory === "losers") {
        return "changePercentage";
      } else if (this.selectedCategory === "active") {
        return "volume";
      }
      return "ticker";
    },
  },
  methods: {
    ...mapActions("dashboard", ["fetchTopGainersLosers"]),
    selectCategory(category) {
      this.$store.commit("dashboard/setSelectedCategory", category);
    },
  },
  async created() {
    await this.fetchTopGainersLosers();
  },
};
</script>


<style src="../styles/dashboard.css"></style>
