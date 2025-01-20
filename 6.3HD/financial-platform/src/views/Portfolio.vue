<template>
  <div>
    <!-- Navbar Component -->
    <Navbar />
  </div>

  <div class="portfolio">
    <!-- Header Component -->
    <Header title="Portfolio Management" subtitle="Manage your investments with ease"></Header>


    <!-- Top row: Portfolio management & Search bar -->
    <div class="portfolio-top-row">
      <div class="portfolio-management">
        <div class="portfolio-select-group">
          <label for="portfolio-select">Select Portfolio:</label>
          <select
            id="portfolio-select"
            :value="selectedPortfolio"
            @change="onPortfolioChange"
          >
            <option v-for="name in portfolioNames" :key="name" :value="name">
              {{ name }}
            </option>
          </select>
        </div>
        <div class="portfolio-buttons">
          <button @click="createPortfolioPrompt">New Portfolio</button>
          <button @click="deleteCurrentPortfolio" v-if="portfolioNames.length > 0">
            Delete Portfolio
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="search-bar-container">
        <SearchBar @search="handleSearch" />
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchResults.length" class="search-results">
      <h3>Search Results</h3>
      <ul class="search-results-list">
        <li
          v-for="result in searchResults"
          :key="result.symbol"
          class="search-result-item"
        >
          <div class="search-details">
            <span class="search-symbol">{{ result.symbol }}</span>
            <span class="search-company">{{ result.name }}</span>
          </div>
          <button @click="addToPortfolio(result)">Add to Portfolio</button>
        </li>
      </ul>
    </div>

    <!-- Bottom row: Portfolio Table & Overview side by side -->
    <div class="portfolio-bottom-row" v-if="portfolio.length">
      <!-- Portfolio Table Component -->
      <div class="portfolio-table-container">
        <PortfolioTable
          :portfolio="portfolio"
          @sell="sellShares"
        />
      </div>

      <!-- Portfolio Overview -->
      <div class="portfolio-overview">
        <h3>Portfolio Summary</h3>
        <div class="portfolio-metrics">
          <div class="metric">
            <span class="metric-label">Total Portfolio Value:</span>
            <span class="metric-value">
              ${{ totalPortfolioValue.toFixed(2) }}
            </span>
          </div>
          <div class="metric">
            <span class="metric-label">Realized Profit:</span>
            <span class="metric-value">
              ${{ realizedProfit.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import SearchBar from "@/components/SearchBar.vue";
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";
import PortfolioTable from "@/components/PortfolioTable.vue";

export default {
  name: "PortfolioPage",
  components: {
    Navbar,
    Header,
    SearchBar,
    PortfolioTable,
  },
  computed: {
    ...mapState("portfolio", [
      "portfolioNames",
      "selectedPortfolio",
      "portfolio",
      "searchResults",
      "realizedProfit",
    ]),
    ...mapGetters("portfolio", ["totalPortfolioValue"]),
  },
  created() {
    this.loadPortfolioNames().then(() => {
      if (this.portfolioNames.length > 0 && !this.selectedPortfolio) {
        this.setSelectedPortfolio(this.portfolioNames[0]);
        this.loadPortfolio();
      }
    });
  },
  methods: {
    ...mapActions("portfolio", [
      "loadPortfolioNames",
      "loadPortfolio",
      "createPortfolio",
      "deleteCurrentPortfolio",
      "handleSearch",
      "addToPortfolio",
      "sellShares",
      "setSelectedPortfolio",
    ]),

    onPortfolioChange(event) {
      const portfolioName = event.target.value;
      this.setSelectedPortfolio(portfolioName);
      this.loadPortfolio();
    },

    createPortfolioPrompt() {
      const name = prompt("Enter a name for the new portfolio:");
      this.createPortfolio(name);
    },
  },
};
</script>

<style src="@/styles/portfolio.css"></style>
