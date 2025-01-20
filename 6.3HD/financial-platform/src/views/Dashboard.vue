<template>
  <div>
    <!-- Navbar Component -->
    <Navbar />
  </div>

  <div class="container py-4">
    <!-- Header Component -->
    <Header title="Market Overview" subtitle="Explore market categories and statistics"></Header>

    <!-- Top Row: Category Selection Buttons -->
    <div class="dashboard-top-row">
      <button
        v-for="category in categories"
        :key="category.key"
        @click="selectCategory(category.key)"
        :class="['btn', selectedCategory === category.key ? 'btn-primary' : 'btn-outline-primary']"
      >
        {{ category.label }}
      </button>
    </div>

    <!-- Data Table -->
    <div>
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
  </div>
</template>


<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";
import DashboardStats from "@/components/DashboardStats.vue";

export default {
  name: "DashboardPage",
  components: {
    Navbar,
    Header,
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
<style src="@/styles/dashboard.css"></style>
